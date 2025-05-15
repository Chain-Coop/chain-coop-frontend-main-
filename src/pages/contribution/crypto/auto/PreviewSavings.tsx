import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoIosArrowDropleft } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import PinModal from "../../../../components/common/PinModal";
import ConnectWallet from "../../../../components/dashboard/contribution/modals/ConnectWallet";
// import PaymentWithCard from "../../../components/dashboard/contribution/paymentChoice/PaymentWithCard";

import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";
import { AppDispatch } from "../../../../shared/redux/store";
import {
  CreatePool,
  CreatePeriodicPool,
} from "../../../../shared/redux/slices/web3.slices";
import ProgressBar from "../../../../components/dashboard/contribution/ProgressBar";

interface LocationState {
  lockedType?: number;
  reasonForSaving?: string;
  interestRate?: string;
  duration?: string;
  tokenName?: string;
  tokenId?: string;
  initialSaveAmount?: string;
  amount?: string;
  deductionOption?: "naira" | "token";
  savingFrequency?: string;
  debitAmount?: string;
  startDate?: string;
  fundSource?: "Internal Crypto Wallet" | "External Crypto Wallet" | string;
  contributionType?: "one-time" | "recurring";
  [key: string]: any;
}

interface PreviewSavingsLockTypeConfig {
  previewTitle: string;
  showPeriodicAmount: boolean;
}

const previewSavingsConfigs: Record<number, PreviewSavingsLockTypeConfig> = {
  0: {
    // Flexible
    previewTitle: "Flexible Savings Preview",
    showPeriodicAmount: true,
  },
  1: {
    // Lock
    previewTitle: "Lock Savings Preview",
    showPeriodicAmount: true,
  },
  2: {
    // Strict Lock
    previewTitle: "Strict Lock Savings Preview",
    showPeriodicAmount: false,
  },
};

const UnifiedPreviewSavings: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const formData = (location.state || {}) as LocationState;
  const { lockedType = 0, contributionType } = formData;

  const [currentConfig, setCurrentConfig] =
    useState<PreviewSavingsLockTypeConfig | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const conversionRate = 1549.43;
  const isOneTimeContribution = contributionType === "one-time";

  useEffect(() => {
    const config = previewSavingsConfigs[lockedType as number];
    if (config) {
      setCurrentConfig(config);
    } else {
      setCurrentConfig(previewSavingsConfigs[0]);
      console.warn(
        "Invalid or missing lockedType in location state for PreviewSavings. Defaulting to Flexible Savings config.",
      );
    }
  }, [lockedType]);

  const handlePay = () => {
    if (formData.fundSource === "Internal Crypto Wallet") {
      setShowPinModal(true);
    } else if (formData.fundSource === "External Crypto Wallet") {
      setShowConnectWalletModal(true);
    } else {
      toast.warn(
        "Selected fund source is not yet supported for direct payment in this flow.",
      );
      console.log(
        "Invalid or unsupported payment method selected:",
        formData.fundSource,
      );
    }
  };

  const handlePinSubmit = (enteredPin: string) => {
    const {
      tokenId,
      initialSaveAmount,
      reasonForSaving,
      duration,
      startDate,
      savingFrequency,
      debitAmount,
      // Exclude fields not needed
      tokenName,
      contributionType,
      interestRate,
      tokenEquivalent,
      nairaEquivalent,
      description,
      fundSource,
      selectedSource,
      currency,
      amount,
      deductionOption,
      ...restOfFormData
    } = formData;

    let durationInDays = 0;
    if (duration && startDate) {
      durationInDays = Math.ceil(
        (new Date(duration).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24),
      );
    } else {
      console.warn(
        "Duration or startDate is missing, defaulting durationInDays to 0",
      );
    }

    let finalPayload: any = {
      ...restOfFormData,
      tokenId: tokenId,
      initialSaveAmount: initialSaveAmount,
      reasonForSaving: reasonForSaving,
      duration: durationInDays,
      lockedType: lockedType,
      pin: enteredPin,
    };

    let actionToDispatch: any;

    if (isOneTimeContribution) {
      actionToDispatch = CreatePool(finalPayload);
    } else {
      finalPayload.interval = savingFrequency;
      finalPayload.periodicAmount = debitAmount;
      actionToDispatch = CreatePeriodicPool(finalPayload);
    }

    setLoading(true);
    setError(undefined);

    dispatch(actionToDispatch)
      .unwrap()
      .then((response: any) => {
        setShowPinModal(false);
        toast.success("Savings pool created successfully!");
        navigate("/dashboard/contribution/main/crypto_contribution");
      })
      .catch((err: any) => {
        const message =
          err?.message ||
          err?.msg ||
          "Failed to create savings pool. Please try again.";
        setError(message);
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConnectWallet = () => {
    console.log("Connect wallet process initiated...");
    setShowConnectWalletModal(false);
    toast.info(
      "Wallet connection successful. Proceed with depositing funds externally.",
    );
  };

  const calculatedNairaEquivalent =
    formData.initialSaveAmount && !isNaN(parseFloat(formData.initialSaveAmount))
      ? (parseFloat(formData.initialSaveAmount) * conversionRate).toFixed(2) +
        " NGN"
      : "N/A";

  const calculatedTokenEquivalent =
    formData.amount && !isNaN(parseFloat(formData.amount))
      ? (parseFloat(formData.amount) / conversionRate).toFixed(2) +
        ` ${formData.tokenName || "Tokens"}`
      : "N/A";

  if (!currentConfig) {
    return (
      <main className="pb-[1.5em]">
        <p className="mt-10 text-center">Loading preview...</p>
      </main>
    );
  }

  return (
    <main className="pb-[1.5em]">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Preview Savings
      </DashboardHeader>

      <ProgressBar step={4} />

      <div className="m-auto flex w-[90%] flex-col">
        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-center text-2xl font-bold">
            {currentConfig.previewTitle}
          </h1>
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

        <div className="mt-[2.5em] flex w-full flex-col gap-4">
          <div className="flex items-start">
            <div className="flex flex-col items-start text-left">
              <h2 className="text-sm font-semibold text-gray-500">Title</h2>
              <p className="text-lg font-bold text-black">
                {formData.reasonForSaving || "N/A"}
              </p>
            </div>
          </div>

          <section className="flex w-full flex-col gap-2 md:flex-row md:gap-5">
            <div className="flex items-center gap-1 md:gap-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Interest Rate:
              </h2>
              <p className="text-sm font-bold text-green-500 md:text-lg">
                {formData.interestRate || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Withdrawal Day:
              </h2>
              <p className="text-sm font-bold md:text-lg">
                {formData.duration
                  ? new Date(formData.duration).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">Token</h2>
              <p className="font-bold">{formData.tokenName || "N/A"}</p>
            </div>

            {formData.deductionOption === "naira" ? (
              <>
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Deposit Amount (NGN)
                  </h2>
                  <p className="font-bold">{formData.amount || "N/A"}</p>
                </div>
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Token Value
                  </h2>
                  <p className="font-bold">{calculatedTokenEquivalent}</p>
                </div>
              </>
            ) : (
              <>
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Deposit Token
                  </h2>
                  <p className="font-bold">
                    {formData.initialSaveAmount || "N/A"}
                  </p>
                </div>
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Equivalent (NGN)
                  </h2>
                  <p className="font-bold">{calculatedNairaEquivalent}</p>
                </div>
              </>
            )}

            {!isOneTimeContribution && formData.savingFrequency && (
              <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                <h2 className="text-sm font-semibold text-gray-500">
                  Contribution Schedule
                </h2>
                <p className="font-bold">{formData.savingFrequency}</p>
              </div>
            )}

            {!isOneTimeContribution &&
              currentConfig.showPeriodicAmount &&
              formData.debitAmount && (
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Periodic Amount ({formData.tokenName || "Token"})
                  </h2>
                  <p className="font-bold">{formData.debitAmount}</p>
                </div>
              )}

            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Start Date
              </h2>
              <p className="font-bold">
                {formData.startDate
                  ? new Date(formData.startDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">End Date</h2>
              <p className="font-bold">
                {formData.duration
                  ? new Date(formData.duration).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Fund Source
              </h2>
              <p className="font-bold">{formData.fundSource || "N/A"}</p>
            </div>
          </section>
        </div>

        <div className="mt-[3em] flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-transform duration-300 hover:scale-110 hover:text-text2"
            aria-label="Go back"
          >
            <IoIosArrowDropleft size={30} />
            <span className="ml-1 font-medium">Back</span>
          </button>
          <Button
            variant="filled"
            onClick={handlePay}
            disabled={loading}
            className={`flex justify-center rounded-md bg-text2 px-8 py-[1em] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform ${loading ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </Button>
        </div>
      </div>

      {showPinModal && (
        <PinModal
          isOpen={showPinModal}
          onClose={() => {
            setShowPinModal(false);
            setError(undefined);
            setPin("");
          }}
          onSubmit={handlePinSubmit}
          header="Enter Your Pin"
          title="Please enter your 4-digit transaction pin to proceed."
          loading={loading}
          error={error}
          pin={pin}
          onPinChange={setPin}
        />
      )}

      {/* Optional: PaymentWithCard Modal if that flow is also unified here
      {showPaymentModal && (
        <PaymentWithCard
          // Pass necessary props
          onClose={() => setShowPaymentModal(false)}
          isOpen={showPaymentModal}
        />
      )} */}

      {showConnectWalletModal && (
        <ConnectWallet
          isOpen={showConnectWalletModal}
          onClose={() => setShowConnectWalletModal(false)}
          onConnect={handleConnectWallet}
        />
      )}
    </main>
  );
};

export default UnifiedPreviewSavings;
