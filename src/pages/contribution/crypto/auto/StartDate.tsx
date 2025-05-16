import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import {
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";
import "react-datepicker/dist/react-datepicker.css";
import { calculateAvailableEndDates } from "../../../../shared/utils/format";
import ProgressBar from "../../../../components/dashboard/contribution/ProgressBar";

interface LocationState {
  lockedType?: number;
  tokenName?: string;
  contributionType?: "one-time" | "recurring";
  [key: string]: any;
}

interface StartDateLockTypeConfig {
  dashboardTitle: string;
  pageTitle: string;
  getPageDescription: (
    tokenName?: string,
    contributionType?: "one-time" | "recurring",
  ) => string;
  nextPath: string;
  availableFrequencies: ("DAILY" | "WEEKLY" | "MONTHLY")[];
  allowCustomDateForFrequencies: string[];
}

const UNIFIED_SOURCE_FUNDS_PATH =
  "/dashboard/contribution/crypto/unified-source-funds";

const startDateConfigs: Record<number, StartDateLockTypeConfig> = {
  0: {
    // Flexible
    dashboardTitle: "Flexible Savings",
    pageTitle: "Flexible Savings",
    getPageDescription: (tokenName = "selected token") =>
      `You are about to save in ${tokenName} cryptocurrency. Set up your savings plan.`,
    nextPath: UNIFIED_SOURCE_FUNDS_PATH,
    availableFrequencies: ["DAILY", "WEEKLY", "MONTHLY"],
    allowCustomDateForFrequencies: ["DAILY", "MANUALLY"],
  },
  1: {
    // Lock
    dashboardTitle: "Lock Savings",
    pageTitle: "Lock Savings",
    getPageDescription: (tokenName = "selected token") =>
      `You are about to save in ${tokenName} cryptocurrency. Set up your lock savings plan.`,
    nextPath: UNIFIED_SOURCE_FUNDS_PATH,
    availableFrequencies: ["DAILY", "WEEKLY", "MONTHLY"],
    allowCustomDateForFrequencies: ["DAILY", "MANUALLY"],
  },
  2: {
    // Strict Lock
    dashboardTitle: "Strict Lock Savings",
    pageTitle: "Strict Lock Savings",
    getPageDescription: (tokenName = "selected token", contributionType) =>
      contributionType === "one-time"
        ? "You can save one-time and withdrawal will be locked until saving duration is complete."
        : `Set up your strict lock savings plan for ${tokenName}.`,
    nextPath: UNIFIED_SOURCE_FUNDS_PATH,
    availableFrequencies: ["DAILY", "WEEKLY", "MONTHLY"],
    allowCustomDateForFrequencies: ["DAILY"],
  },
};

const getTomorrowDateString = (todayString: string): string => {
  const today = new Date(todayString);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

interface DateCalculationConfig {
  dailyIntervals?: number[];
  monthlyIntervals?: number[];
}

const UnifiedStartDate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    lockedType = 0,
    tokenName,
    contributionType,
    ...passedFormData
  } = (location.state || {}) as LocationState;

  const [currentConfig, setCurrentConfig] =
    useState<StartDateLockTypeConfig | null>(null);

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const todayString = todayDate.toISOString().split("T")[0];
  const tomorrowString = getTomorrowDateString(todayString);

  const [savingFrequency, setSavingFrequency] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [useCustomDate, setUseCustomDate] = useState<boolean>(false);
  const [availableEndDates, setAvailableEndDates] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isOneTimeContribution = contributionType === "one-time";

  useEffect(() => {
    const config = startDateConfigs[lockedType as number];
    if (config) {
      setCurrentConfig(config);
    } else {
      setCurrentConfig(startDateConfigs[0]);
      console.warn(
        "Invalid or missing lockedType in location state for StartDate. Defaulting to Flexible Savings config.",
      );
    }
  }, [lockedType]);

  useEffect(() => {
    if (isOneTimeContribution) {
      const config: DateCalculationConfig = {
        dailyIntervals: [7, 14, 30, 60, 90, 180, 365],
      };
      const dates = calculateAvailableEndDates(todayString, "daily", config);
      setAvailableEndDates(dates);
      setSavingFrequency("ONE-TIME");
      setEndDate("");
      setCustomEndDate("");
      setUseCustomDate(false);
      return;
    }

    if (!savingFrequency || savingFrequency === "MANUALLY" || !currentConfig) {
      setAvailableEndDates([]);
      return;
    }
    const calculationType = savingFrequency === "WEEKLY" ? "daily" : "monthly";
    let dateCalcConfig: DateCalculationConfig = {};

    if (savingFrequency === "WEEKLY") {
      dateCalcConfig = {
        dailyIntervals: Array.from({ length: 52 }, (_, i) => (i + 1) * 7),
      };
    } else if (savingFrequency === "MONTHLY") {
      dateCalcConfig = {
        monthlyIntervals: Array.from({ length: 24 }, (_, i) => i + 1),
      };
    } else if (savingFrequency === "DAILY") {
      dateCalcConfig = { dailyIntervals: [7, 14, 30, 60, 90, 180, 365] };
    }

    const dates = calculateAvailableEndDates(
      todayString,
      calculationType,
      dateCalcConfig,
    );
    setAvailableEndDates(dates);
    setEndDate("");
    setCustomEndDate("");
    setUseCustomDate(false);
  }, [savingFrequency, todayString, currentConfig, isOneTimeContribution]);

  const handleFrequencySelect = (frequency: string) => {
    if (isOneTimeContribution) return;
    setSavingFrequency(frequency);
    setError("");
    setEndDate("");
    setCustomEndDate("");
    setUseCustomDate(false);
  };

  const handleEndDateChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const allowCustom =
      isOneTimeContribution ||
      currentConfig?.allowCustomDateForFrequencies.includes(savingFrequency);

    if (value === "custom" && allowCustom) {
      setUseCustomDate(true);
      setEndDate("");
    } else {
      setUseCustomDate(false);
      setEndDate(value);
      setCustomEndDate("");
    }
    setError("");
  };

  const handleCustomEndDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setCustomEndDate(value);
    if (value && new Date(value) <= new Date(todayString)) {
      setError("Custom end date cannot be today or in the past.");
    } else {
      setError("");
    }
  };

  const handleNext = () => {
    setError("");
    const finalEndDate = useCustomDate ? customEndDate : endDate;

    if (!isOneTimeContribution && !savingFrequency) {
      setError("Please select a contribution schedule.");
      return;
    }
    if (!finalEndDate) {
      setError("Please select or enter an end date / duration.");
      return;
    }

    if (new Date(finalEndDate) <= new Date(todayString)) {
      setError("End date cannot be today or in the past.");
      return;
    }

    setLoading(true);

    const formDataToPass = {
      ...passedFormData,
      tokenName,
      contributionType,
      lockedType,
      startDate: todayString,
      duration: finalEndDate,
      ...(!isOneTimeContribution && { savingFrequency }),
    };

    if (currentConfig) {
      navigate(currentConfig.nextPath, { state: formDataToPass });
    } else {
      setError("Configuration error. Cannot proceed.");
      setLoading(false);
    }
  };

  if (!currentConfig) {
    return (
      <main className="pb-[1.5em]">
        <p className="mt-10 text-center">Loading configuration...</p>
      </main>
    );
  }

  const getSimpleDateDifference = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return `${diffDays} day`;
    return `${diffDays} days`;
  };

  return (
    <main className="pb-[1.5em]">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        {currentConfig.dashboardTitle}
      </DashboardHeader>

      <ProgressBar step={2} />

      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] flex flex-col lg:mt-[3em]">
          <h1 className="text-2xl font-bold">{currentConfig.pageTitle}</h1>
          <p className="mt-[1em] font-medium">
            {currentConfig.getPageDescription(tokenName, contributionType)}
          </p>
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
        {!isOneTimeContribution &&
          currentConfig && (
            <section className="mt-[2em]">
              <div>
                <h2 className="text-lg font-bold text-memt1">
                  Select Contribution Schedule
                </h2>
              </div>
              <div className="mt-[1.5em] flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-start lg:flex-wrap">
                {currentConfig.availableFrequencies.map((freq) => (
                  <button
                    key={freq}
                    onClick={() => handleFrequencySelect(freq)}
                    className={`flex h-[45px] w-[174px] transform items-center justify-center rounded-md px-6 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2 ${
                      savingFrequency === freq
                        ? "bg-text2 text-white"
                        : "bg-[#ECE6F2] text-memt1"
                    }`}
                  >
                    {freq.charAt(0) + freq.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </section>
          )}
        <div>
          <div className="mt-[2.5em]">
            <label className="mb-3 flex font-semibold">
              Start Date (Today)
            </label>
            <p className="input mb-2 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
              {new Date(todayString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {(savingFrequency || isOneTimeContribution) && (
          <section className="mt-[1em]">
            <FormControl fullWidth>
              <InputLabel
                id="end-date-select-label"
                sx={{
                  color:
                    error &&
                    (endDate === "" || (useCustomDate && customEndDate === ""))
                      ? "red"
                      : "#000000",
                }}
              >
                Choose End Date / Duration
              </InputLabel>
              <Select
                labelId="end-date-select-label"
                id="end-date-select"
                value={useCustomDate ? "custom" : endDate}
                label="Choose End Date / Duration"
                onChange={handleEndDateChange}
                className="mb-1"
                error={
                  error !== "" &&
                  (endDate === "" || (useCustomDate && customEndDate === ""))
                }
                sx={{
                  height: "3.5em",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "0.5rem",
                    borderColor:
                      error &&
                      (endDate === "" ||
                        (useCustomDate && customEndDate === ""))
                        ? "red"
                        : "#D1D5DB",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#440080",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#440080",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select duration...</em>
                </MenuItem>
                {availableEndDates.map((date) => (
                  <MenuItem key={date} value={date}>
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    ({getSimpleDateDifference(todayString, date)})
                  </MenuItem>
                ))}
                {(isOneTimeContribution ||
                  (currentConfig &&
                    currentConfig.allowCustomDateForFrequencies.includes(
                      savingFrequency,
                    ))) && (
                  <MenuItem value="custom">
                    <em>Set custom end date</em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            {useCustomDate &&
              (isOneTimeContribution ||
                (currentConfig &&
                  currentConfig.allowCustomDateForFrequencies.includes(
                    savingFrequency,
                  ))) && (
                <div className="mt-2">
                  <label className="mb-1 block text-sm font-medium text-gray-600">
                    Custom End Date
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={handleCustomEndDateChange}
                    min={tomorrowString}
                    required
                    className={`input h-[3.5em] w-full rounded-lg border-[2px] bg-white px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2 ${
                      error &&
                      customEndDate !== "" &&
                      new Date(customEndDate) <= new Date(todayString)
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {customEndDate &&
                    new Date(customEndDate) > new Date(todayString) && (
                      <p className="mt-1 text-xs text-gray-600">
                        Duration:{" "}
                        {getSimpleDateDifference(todayString, customEndDate)}
                      </p>
                    )}
                </div>
              )}
          </section>
        )}

        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

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
            variant="text"
            onClick={handleNext}
            disabled={
              loading ||
              (!isOneTimeContribution && !savingFrequency) || // Check frequency only if not one-time
              (!endDate && !customEndDate) ||
              (useCustomDate &&
                customEndDate !== "" &&
                new Date(customEndDate) <= new Date(todayString)) ||
              (!useCustomDate &&
                endDate !== "" &&
                new Date(endDate) <= new Date(todayString)) ||
              (error !== "" &&
                customEndDate !== "" &&
                new Date(customEndDate) <= new Date(todayString)) // Disable if error and custom date is invalid
            }
            className="flex justify-center rounded-md bg-text2 px-8 py-[1em] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default UnifiedStartDate;
