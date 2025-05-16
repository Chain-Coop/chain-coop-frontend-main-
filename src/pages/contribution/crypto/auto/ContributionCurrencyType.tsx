import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert } from "@mui/material";
import etherium from "../../../../Assets/svg/dashboard/contribution/etherum.svg";
import bitcoin from "../../../../Assets/svg/dashboard/bitcoin.svg";
import usdc from "../../../../Assets/svg/dashboard/usd.svg";
import usdt from "../../../../Assets/svg/dashboard/usdt.svg";
import { IoIosArrowDropleft } from "react-icons/io";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import ProgressBar from "../../../../components/dashboard/contribution/ProgressBar";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface LocationState {
  lockedType?: number;
  contributionType?: "one-time" | "auto" | "recurring";
}

interface LockTypeConfig {
  dashboardTitle: string;
  pageTitle: string;
  getPageDescription: (
    contributionType?: "one-time" | "auto" | "recurring",
  ) => string;
  nextPath: string;
}

const UNIFIED_START_DATE_PATH =
  "/dashboard/contribution/crypto/unified-start-date";

const lockTypeConfigs: Record<number, LockTypeConfig> = {
  0: {
    // Flexible
    dashboardTitle: "Flexible Savings",
    pageTitle: "Flexible Savings",
    getPageDescription: () => "You can save and withdraw anytime you want.",
    nextPath: UNIFIED_START_DATE_PATH,
  },
  1: {
    // Lock
    dashboardTitle: "Lock Savings",
    pageTitle: "Lock Savings",
    getPageDescription: () =>
      "You can save and withdrawal will be locked until saving duration is complete but you withdraw before the time frame.",
    nextPath: UNIFIED_START_DATE_PATH,
  },
  2: {
    // Strict Lock
    dashboardTitle: "Strict Lock Savings",
    pageTitle: "Strict Lock Savings",
    getPageDescription: (contributionType) => {
      if (contributionType === "one-time") {
        return "You can save one-time and withdrawal will be locked untill saving duration is complete.";
      }
      return "Set up your auto strict lock savings. Withdrawal will be locked until the saving duration for each cycle is complete.";
    },
    nextPath: UNIFIED_START_DATE_PATH,
  },
};

// Define Network Configurations - Updated
const STABLE_COIN_NETWORKS = [
  { label: "BSC (BNB Smart Chain)", value: "BSC", disabled: false },
  { label: "ETHERLINK", value: "ETHERLINK", disabled: false },
  { label: "GNOSIS", value: "GNOSIS", disabled: false },
  { label: "LISK", value: "LISK", disabled: false },
];

const BTC_NETWORKS = [
  { label: "BTC Core", value: "BTC_CORE", disabled: false },
  { label: "BTC Lightning", value: "BTC_LIGHTNING", disabled: false },
];

const UnifiedContributionCurrencyType: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [currentLockedType, setCurrentLockedType] = useState<number>(0);
  const [incomingContributionType, setIncomingContributionType] = useState<
    "one-time" | "auto" | "recurring" | undefined
  >(undefined);
  const [currentConfig, setCurrentConfig] = useState<LockTypeConfig>(
    lockTypeConfigs[0],
  );

  useEffect(() => {
    const newLockedType = state?.lockedType;
    const contType = state?.contributionType;

    setIncomingContributionType(contType);

    if (
      newLockedType !== undefined &&
      lockTypeConfigs.hasOwnProperty(newLockedType)
    ) {
      setCurrentLockedType(newLockedType);
      setCurrentConfig(lockTypeConfigs[newLockedType]);
    } else {
      setCurrentLockedType(0);
      setCurrentConfig(lockTypeConfigs[0]);
      console.warn(
        "Invalid or missing lockedType in location state. Defaulting to Flexible Savings.",
      );
    }
  }, [state]);

  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    reasonForSaving: "",
    description: "",
    currency: "",
    tokenId: "",
    tokenName: "",
    network: "", // For selected network value
  });
  const [error, setError] = useState("");

  // State for Network Selection
  const [selectedNetwork, setSelectedNetwork] = useState<{
    label: string;
    value: string;
    disabled?: boolean;
  } | null>(null);
  const [availableNetworks, setAvailableNetworks] = useState<
    Array<{ label: string; value: string; disabled?: boolean }>
  >([]);

  useEffect(() => {
    // Update available networks when tokenName changes
    if (formData.tokenName) {
      let networks: Array<{ label: string; value: string; disabled?: boolean }>;
      if (formData.tokenName === "BTC") {
        networks = BTC_NETWORKS;
      } else if (["USDT", "USDC"].includes(formData.tokenName)) {
        networks = STABLE_COIN_NETWORKS;
      } else {
        networks = []; // For other tokens like LISK
      }

      const sortedNetworks = networks.sort(
        (a, b) => Number(a.disabled) - Number(b.disabled),
      );
      setAvailableNetworks(sortedNetworks);

      // Set a default network if none is selected or current is invalid
      if (sortedNetworks.length > 0) {
        const currentNetworkIsValid = sortedNetworks.some(
          (n) => n.value === selectedNetwork?.value && !n.disabled,
        );
        if (!selectedNetwork || !currentNetworkIsValid) {
          const firstEnabled = sortedNetworks.find((n) => !n.disabled);
          if (firstEnabled) {
            setSelectedNetwork(firstEnabled);
            setFormData((prev) => ({ ...prev, network: firstEnabled.value }));
          } else if (sortedNetworks.length > 0) {
            // Fallback if all are disabled
            setSelectedNetwork(sortedNetworks[0]);
            setFormData((prev) => ({
              ...prev,
              network: sortedNetworks[0].value,
            }));
          }
        }
      } else {
        setSelectedNetwork(null);
        setFormData((prev) => ({ ...prev, network: "" }));
      }
    } else {
      // Clear network if no token is selected
      setAvailableNetworks([]);
      setSelectedNetwork(null);
      setFormData((prev) => ({ ...prev, network: "" }));
    }
  }, [formData.tokenName]); // Re-run when tokenName changes

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      currency: category,
      tokenId: "",
      tokenName: "",
    }));
  };

  const handleCryptoTypeSelect = (tokenName: string) => {
    const tokenMapping: Record<string, string> = {
      USDT: "2",
      USDC: "2",
      BTC: "2",
    };

    setFormData((prev) => ({
      ...prev,
      tokenId: tokenMapping[tokenName],
      tokenName,
      network: "", // Reset network, useEffect will set a default
    }));
    // setSelectedNetwork(null); // Let useEffect handle setting the default selectedNetwork
  };

  const handleNetworkSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const network = availableNetworks.find((n) => n.value === selectedValue);
    if (network && !network.disabled) {
      setSelectedNetwork(network);
      setFormData((prev) => ({ ...prev, network: network.value }));
    }
  };

  const handleNext = () => {
    if (!formData.reasonForSaving) {
      setError("Please enter a savings title");
      return;
    }

    if (!formData.currency) {
      setError("Please select a contribution currency");
      return;
    }

    if (formData.currency === "Cryptocurrency" && !formData.tokenId) {
      setError("Please select a cryptocurrency type");
      return;
    }

    if (
      formData.currency === "Cryptocurrency" &&
      formData.tokenId &&
      !formData.network
    ) {
      setError("Please select a network for the chosen cryptocurrency");
      return;
    }

    setError("");

    const stateToPass: any = {
      ...formData,
      lockedType: currentLockedType,
      contributionType: incomingContributionType,
    };

    navigate(currentConfig.nextPath, {
      state: stateToPass,
    });
  };

  return (
    <main className="pb-[1.5em]">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        {currentConfig.dashboardTitle}
      </DashboardHeader>

      <ProgressBar step={1} />

      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-xl font-semibold md:text-2xl lg:text-2xl">
            {currentConfig.pageTitle}
          </h1>
          <p className="mt-[1em] font-medium">
            {currentConfig.getPageDescription(incomingContributionType)}
          </p>
        </header>
        <div className="mt-[2em]">
          <div className="flex flex-col gap-4">
            <div className="mt-[2em]">
              <label
                htmlFor="reasonForSaving"
                className="mb-3 flex text-lg font-semibold text-memt1"
              >
                Savings Title
              </label>
              <input
                type="text"
                id="reasonForSaving"
                value={formData.reasonForSaving}
                onChange={handleInputChange}
                required
                placeholder="Buy a car"
                className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-3 flex text-lg font-semibold text-memt1"
              >
                Savings Description{" "}
                <span className="ml-2 text-gray-400">(Optional)</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block min-h-32 w-full rounded-md border-[2px] border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="A short description for your savings goal..."
              ></textarea>
            </div>
          </div>
        </div>

        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-lg font-semibold md:text-xl lg:text-xl">
            What Currency are you Saving on?
          </h1>
        </header>

        <div
          className={`mt-8 flex w-full items-center justify-between rounded-lg px-4 py-[9px] 
            transition-all duration-300 ease-in-out
            ${hoveredPlan === 0 ? "scale-[1.02] transform bg-[#DED3EA] shadow-lg" : "bg-[#ECE6F2]"}
            cursor-pointer`}
          onMouseEnter={() => setHoveredPlan(0)}
          onMouseLeave={() => setHoveredPlan(null)}
          onClick={() => handleCategorySelect("Cryptocurrency")}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="items-center text-xl">
                <img src={etherium} alt="ethereum" className="h-10 w-10" />
              </span>
              <h3
                className={`${hoveredPlan === 0 ? "scale-105" : "scale-100"} 
                  transform items-center font-semibold transition-all duration-300 ease-in-out`}
              >
                Cryptocurrency
              </h3>
            </div>
            {hoveredPlan === 0 && (
              <p className="animate-fade-in text-sm text-gray-600">
                Click to select this Currency
              </p>
            )}
          </div>
          <button
            className={`rounded-md border px-6 py-1 font-medium transition-all duration-300 ease-in-out
              ${
                formData.currency === "Cryptocurrency"
                  ? "bg-text2 text-white hover:bg-opacity-90"
                  : "border-text2 bg-white hover:bg-text2 hover:text-white"
              }
              transform ${hoveredPlan === 0 ? "scale-105" : "scale-100"}
              ${hoveredPlan === 0 ? "shadow-md" : ""}`}
          >
            {formData.currency === "Cryptocurrency" ? "Selected" : "Select"}
          </button>
        </div>

        {formData.currency === "Cryptocurrency" && (
          <>
            <section className="mt-[3em]">
              <div className="w-full max-w-[30em] rounded-xl bg-inherit py-[2em] shadow-lg md:max-w-full">
                <div className="px-[1em]">
                  <header>
                    <h4 className="mb-2 text-lg font-semibold text-memt1">
                      Select Cryptocurrency type
                    </h4>
                  </header>
                </div>
                <hr />
                <div className="mt-[1em] flex flex-col items-center justify-center gap-[2em] px-[1em] md:flex-row md:items-start md:justify-start">
                  {[
                    { type: "USDT", icon: usdt },
                    { type: "USDC", icon: usdc },
                    { type: "BTC", icon: bitcoin },
                  ].map(({ type, icon }) => (
                    <button
                      key={type}
                      onClick={() => handleCryptoTypeSelect(type)}
                      className={`flex w-[9em] items-center gap-2 rounded-md bg-[#ECE6F2] px-6 py-2 font-medium transition-all duration-300 lg:py-1
                        ${
                          formData.tokenName === type
                            ? "border-2 border-text2"
                            : "hover:bg-text2 hover:text-white"
                        }
                        transform uppercase hover:scale-105 active:scale-95`}
                    >
                      <img src={icon} alt={type} className="h-8 w-8" />
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {formData.tokenName && (
              <div className="relative mb-4 mt-8">
                <label className="mb-1 block text-lg font-medium text-memt1">
                  Token network
                </label>
                <div className="relative">
                  <select
                    value={selectedNetwork?.value || ""}
                    onChange={handleNetworkSelect}
                    className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-text2 focus:outline-none focus:ring-2 focus:ring-text2 focus:ring-opacity-50"
                  >
                    <option value="" disabled className="text-gray-500">
                      Select Network
                    </option>
                    {availableNetworks.map((network) => (
                      <option
                        key={network.value}
                        value={network.value}
                        disabled={network.disabled}
                        className={`py-2 ${network.disabled ? "text-gray-400" : "text-gray-700"}`}
                      >
                        {network.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-[3em] flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-text2"
          >
            <IoIosArrowDropleft size={25} />
            <span className="ml-1">Back</span>
          </button>
          <button
            className="rounded-md bg-text2 px-8 py-2 font-semibold text-white
              transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
              active:scale-95 active:transform disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleNext}
            disabled={
              !formData.currency ||
              (formData.currency === "Cryptocurrency" &&
                (!formData.tokenId || !formData.network))
            }
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default UnifiedContributionCurrencyType;
