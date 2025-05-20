import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {
  IoIosArrowDropleft,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";
import ProgressBar from "../../../../components/dashboard/contribution/ProgressBar";
import { toast } from "react-toastify";

interface LocationState {
  lockedType?: number;
  tokenName?: string;
  reasonForSaving?: string;
  description?: string;
  currency?: string;
  tokenId?: string;
  contributionType?: string;
  [key: string]: any;
}

interface SourceFundsLockTypeConfig {
  dashboardTitle: string;
  pageTitle: string;
  mainDescription?: string;
  previewPath: string;
  hasTermsCheckbox?: boolean;
  termsText?: string;
  getInitialAmountPlaceholder: (tokenName?: string) => string;
  getNoteText?: (tokenName?: string, selectedSource?: string) => string | null;
}

const UNIFIED_PREVIEW_SAVINGS_PATH =
  "/dashboard/contribution/crypto/unified-preview-savings";

const sourceFundsConfigs: Record<number, SourceFundsLockTypeConfig> = {
  0: {
    // Flexible
    dashboardTitle: "Flexible Savings",
    pageTitle: "Flexible Savings",
    previewPath: UNIFIED_PREVIEW_SAVINGS_PATH,
    getInitialAmountPlaceholder: (tokenName = "Tokens") =>
      `e.g., 10 ${tokenName}`,
  },
  1: {
    // Lock
    dashboardTitle: "Lock Savings",
    pageTitle: "Lock Savings",
    previewPath: UNIFIED_PREVIEW_SAVINGS_PATH,
    getInitialAmountPlaceholder: (tokenName = "Tokens") =>
      `e.g., 10 ${tokenName}`,
  },
  2: {
    // Strict Lock
    dashboardTitle: "Strict Lock Savings",
    pageTitle: "Strict Lock Savings",
    mainDescription:
      "You can save one-time and withdrawal will be locked until saving duration is complete.",
    previewPath: UNIFIED_PREVIEW_SAVINGS_PATH,
    hasTermsCheckbox: true,
    termsText:
      "I accept that this strict lock CANNOT be broken until the end date duration is complete once created.",
    getInitialAmountPlaceholder: (tokenName = "Tokens") =>
      `e.g., 10 ${tokenName}`,
    getNoteText: (tokenName = "Token", selectedSource?: string) =>
      `Note: ${tokenName} will be added to your savings based on the current rate.`,
  },
};

const CustomSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 cursor-pointer items-center justify-between rounded-lg border-2 border-gray-100 bg-white px-4 py-2 shadow-sm"
      >
        <div className="flex items-center">
          {selectedOption && (
            <IoIosCheckmarkCircleOutline className="mr-2 h-5 w-5 text-green-500" />
          )}
          <span className="text-sm text-gray-700">{selectedOption?.label}</span>
        </div>
        <IoChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-50"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {value === option.value && (
                <IoIosCheckmarkCircleOutline className="mr-2 h-5 w-5 text-green-500" />
              )}
              <span
                className={`text-sm ${value === option.value ? "text-gray-700" : "text-gray-600"}`}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UnifiedSourceFunds: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    lockedType = 0,
    tokenName: tokenNameFromState,
    contributionType,
    ...formData
  } = (location.state || {}) as LocationState;

  const [currentConfig, setCurrentConfig] =
    useState<SourceFundsLockTypeConfig | null>(null);

  const [selectedSource, setSelectedSource] =
    useState<string>("internal-wallet");
  const [initialSaveAmount, setInitialSaveAmount] = useState<string>("");
  const [debitAmount, setDebitAmount] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string>("");

  const displayTokenName = tokenNameFromState || "selected token";
  const isOneTimeContribution = contributionType === "one-time";

  useEffect(() => {
    const config = sourceFundsConfigs[lockedType as number];
    if (config) {
      setCurrentConfig(config);
    } else {
      setCurrentConfig(sourceFundsConfigs[0]);
      console.warn(
        "Invalid or missing lockedType in location state for SourceFunds. Defaulting to Flexible Savings config.",
      );
    }
  }, [lockedType]);

  const handleNext = () => {
    if (!initialSaveAmount) {
      setError("Please enter a valid deposit amount.");
      return;
    }
    if (!isOneTimeContribution && !debitAmount) {
      setError("Please enter an amount to be debited periodically.");
      return;
    }
    if (currentConfig?.hasTermsCheckbox && !termsAccepted) {
      setError(
        currentConfig.termsText
          ? "Please accept the terms and conditions to proceed."
          : "Please accept the terms to proceed.",
      );
      return;
    }

    setError("");

    const updatedFormData: any = {
      ...formData,
      lockedType,
      tokenName: tokenNameFromState,
      contributionType,
      selectedSource,
      initialSaveAmount,
      fundSource:
        selectedSource === "external-wallet"
          ? "External Crypto Wallet"
          : selectedSource === "debit-card"
            ? "Debit Card"
            : "Internal Crypto Wallet",
      ...(currentConfig?.hasTermsCheckbox && { termsAccepted }),
    };

    if (!isOneTimeContribution) {
      updatedFormData.debitAmount = debitAmount;
    }

    if (currentConfig) {
      navigate(currentConfig.previewPath, { state: updatedFormData });
    } else {
      setError("Configuration error. Cannot proceed.");
    }
  };

  if (!currentConfig) {
    return (
      <main className="pb-[1.5em]">
        <p className="mt-10 text-center">Loading configuration...</p>
      </main>
    );
  }

  const noteText = currentConfig.getNoteText?.(
    displayTokenName,
    selectedSource,
  );

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const isChecked = e.target.checked;
  setTermsAccepted(isChecked);

  if (isChecked && currentConfig?.hasTermsCheckbox && lockedType === 2) {
    toast.info(
      "Accepting the terms means you acknowledge that you cannot withdraw your funds until the due date.",
      {
        position: "top-right",
        autoClose: 8000,
      },
    );
  }
};

  return (
    <main className="pb-[1.5em]">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        {currentConfig.dashboardTitle}
      </DashboardHeader>

      <ProgressBar step={3} />

      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-center text-2xl font-bold">
            {currentConfig.pageTitle}
          </h1>
          <p className="mt-[1em] text-center font-medium">
            You are about to save in {displayTokenName} cryptocurrency.
          </p>
          {currentConfig.mainDescription && (
            <p className="mt-[0.5em] text-center text-sm font-medium text-gray-600">
              {currentConfig.mainDescription}
            </p>
          )}
        </header>

        <section className="mt-[2.5em] flex justify-center">
          <div>
            <img
              src={cryptoSavings}
              alt="savings-img"
              className="h-auto w-[100px]"
            />
          </div>
        </section>

        <div className="mt-[2.5em]">
          <label className="mb-3 flex text-lg font-semibold text-memt1">
            Source of Funds
          </label>
          <CustomSelect
            value={selectedSource}
            onChange={(value) => setSelectedSource(value)}
            options={[
              { value: "internal-wallet", label: "Internal Crypto Wallet" },
              { value: "external-wallet", label: "External Crypto Wallet" },
              { value: "debit-card", label: "Debit Card" },
            ]}
          />
          {selectedSource === "internal-wallet" && (
            <p className="mt-2 text-sm text-red-500">
              Funds will automatically be deducted from your Chain Coop crypto
              wallet.
            </p>
          )}
          {selectedSource === "external-wallet" && (
            <p className="mt-2 text-sm text-red-500">
              You will be prompted to select the wallet you want to use.
            </p>
          )}
          {selectedSource === "debit-card" && (
            <p className="mt-2 text-sm text-red-500">
              You will be redirected to our secure payment gateway to complete
              the transaction.
            </p>
          )}
        </div>

        <div className="mt-[2.5em]">
          <label
            htmlFor={
              selectedSource === "internal-wallet"
                ? "initialSaveAmount"
                : selectedSource === "debit-card"
                  ? "debitCardAmount"
                  : "externalTokenAmount"
            }
            className="mb-3 flex text-lg font-semibold text-memt1"
          >
            Deposit Amount ({displayTokenName})
          </label>
          <input
            type="number"
            id={
              selectedSource === "internal-wallet"
                ? "initialSaveAmount"
                : selectedSource === "debit-card"
                  ? "debitCardAmount"
                  : "externalTokenAmount"
            }
            value={initialSaveAmount}
            onChange={(e) => setInitialSaveAmount(e.target.value)}
            placeholder={currentConfig.getInitialAmountPlaceholder(
              displayTokenName,
            )}
            className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
          />
          {noteText && <p className="text-sm text-gray-500">{noteText}</p>}
        </div>

        {!isOneTimeContribution && (
          <div className="mt-[2.5em]">
            <label
              htmlFor="debitAmount"
              className="mb-3 flex text-lg font-semibold text-memt1"
            >
              Periodic Amount ({displayTokenName})
            </label>
            <input
              type="number"
              id="debitAmount"
              value={debitAmount}
              onChange={(e) => setDebitAmount(e.target.value)}
              placeholder="Amount to be debited frequently"
              className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
        )}

        {currentConfig.hasTermsCheckbox && (
          <div className="mt-[2.5em]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-5 w-5 accent-text2"
                checked={termsAccepted}
                onChange={handleTermsChange} 
              />
              <span className="text-sm text-black font-black">
                {currentConfig.termsText}
              </span>
            </label>
          </div>
        )}

        {error && (
          <p className="mt-4 text-center text-sm font-semibold text-red-500">
            {error}
          </p>
        )}

        <div className="mt-[3em] flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-transform duration-300 hover:scale-110 hover:text-text2"
          >
            <IoIosArrowDropleft size={30} />
            <span className="ml-1 font-medium">Back</span>
          </button>
          <Button
            variant="text"
            onClick={handleNext}
            disabled={
              !initialSaveAmount ||
              (!isOneTimeContribution && !debitAmount) ||
              (currentConfig.hasTermsCheckbox && !termsAccepted)
            }
            className={`flex justify-center rounded-md ${
              !initialSaveAmount ||
              (!isOneTimeContribution && !debitAmount) ||
              (currentConfig.hasTermsCheckbox && !termsAccepted)
                ? "cursor-not-allowed bg-gray-400"
                : "bg-text2 hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95"
            } px-8 py-[1em] font-semibold text-white transition-all duration-300 ease-in-out`}
          >
            Preview
          </Button>
        </div>
      </div>
    </main>
  );
};

export default UnifiedSourceFunds;
