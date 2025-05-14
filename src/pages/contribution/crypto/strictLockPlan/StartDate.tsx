import React, { useState, useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import {
  formatDate,
  addDays,
  addMonths,
  getDateDifference,
  calculateAvailableEndDates,
  validateCustomEndDate,
} from "../../../../shared/utils/format";

const StartDate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};
  const { tokenName } = location.state || {};

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const todayString = todayDate.toISOString().split("T")[0];

  const [savingFrequency, setSavingFrequency] = useState<string>("");
  const [endDate, setEndDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [availableEndDates, setAvailableEndDates] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // useEffect to calculate available dates based on frequency
  useEffect(() => {
    if (!savingFrequency || savingFrequency === "MANUALLY") {
      setAvailableEndDates([]);
      return;
    }
    const calculationType = savingFrequency === "WEEKLY" ? "daily" : "monthly";
    let config = {};
    if (savingFrequency === "WEEKLY") {
      config = {
        dailyIntervals: Array.from({ length: 52 }, (_, i) => (i + 1) * 7),
      };
    } else if (savingFrequency === "MONTHLY") {
      config = {
        monthlyIntervals: Array.from({ length: 24 }, (_, i) => i + 1),
      };
    } else if (savingFrequency === "DAILY") {
      config = { dailyIntervals: [7, 14, 30, 60, 90, 180] };
    }
    const dates = calculateAvailableEndDates(
      todayString,
      calculationType,
      config,
    );
    setAvailableEndDates(dates);
    setEndDate("");
    setCustomEndDate("");
    setUseCustomDate(false);
  }, [savingFrequency, todayString]);

  const handleFrequencySelect = (frequency: string) => {
    setSavingFrequency(frequency);
    setError("");
  };

  // Handler for dropdown change
  const handleEndDateChange = (event: any) => {
    const value = event.target.value;
    if (
      value === "custom" &&
      (savingFrequency === "DAILY" || savingFrequency === "MANUALLY")
    ) {
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
    const validation = validateCustomEndDate(todayString, value, {
      type: "daily",
      minDays: 1,
    });
    setError(validation.isValid ? "" : validation.error || "Invalid date");
  };

  const handleNext = () => {
    setError("");
    const finalEndDate = useCustomDate ? customEndDate : endDate;

    if (!savingFrequency) {
      setError("Please select a saving frequency.");
      return;
    }
    if (!finalEndDate) {
      setError("Please select or enter an end date.");
      return;
    }
    const validation = validateCustomEndDate(todayString, finalEndDate, {
      type: savingFrequency === "MONTHLY" ? "monthly" : "daily",
      minDays: 1,
    });
    if (!validation.isValid) {
      setError(validation.error || "Invalid end date selected.");
      return;
    }

    setLoading(true);
    let nextRoute = "/dashboard/contribution/strict_lock/source_funds";
    navigate(nextRoute, {
      state: {
        ...formData,
        startDate: todayString,
        duration: finalEndDate,
        // Remove savingsDuration if not needed downstream
        savingFrequency,
        lockedType: location.state?.lockedType,
        contributionType: location.state?.contributionType,
      },
    });
  };

  return (
    <main className="pb-[1.5em] ">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Strict Lock Savings
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] flex flex-col lg:mt-[3em]">
          <h1 className="text-2xl font-bold">Strict Lock Savings</h1>
          <p className="mt-[1em] font-medium">
            {location.state?.contributionType === "one-time"
              ? "You can save one-time and withdrawal will be locked until saving duration is complete."
              : "Set up your strict lock savings plan."}
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
        <section className="mt-[2em]">
          <div>
            <h2 className="text-lg font-bold text-memt1">
              Select Contribution Schedule
            </h2>
          </div>
          <div className="mt-[1.5em] flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-start lg:flex-wrap">
            {(["DAILY", "WEEKLY", "MONTHLY"] as const).map(
              (freq) => (
                <button
                  key={freq}
                  onClick={() => handleFrequencySelect(freq)}
                  className={`flex h-[45px] w-[174px] transform items-center justify-center rounded-md px-6 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2 ${
                    savingFrequency === freq
                      ? "bg-text2 text-white"
                      : "bg-[#ECE6F2] text-memt1"
                  }`}
                >
                  {freq}
                </button>
              ),
            )}
          </div>
        </section>

        <div>
          <div className="mt-[2.5em]">
            <label className="mb-3 flex font-semibold">
              Start Date (Today)
            </label>
            <p className="input mb-2 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
              {todayString}
            </p>
          </div>
        </div>

        {/* --- Duration Selection UI (using MUI) --- */}
        {savingFrequency && savingFrequency !== "MANUALLY" && (
          <section className="mt-[1em]">
            <FormControl fullWidth>
              <InputLabel
                id="end-date-select-label"
                style={{ color: "#000000" }}
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
                sx={{
                  height: "3.5em",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "0.5rem",
                    borderColor: "#D1D5DB",
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
                    (
                    {getDateDifference(
                      todayString,
                      date,
                      savingFrequency === "MONTHLY" ? "monthly" : "daily",
                    )}
                    )
                  </MenuItem>
                ))}
                {/* Allow custom only for DAILY */}
                {savingFrequency === "DAILY" && (
                  <MenuItem value="custom">
                    <em>Set custom end date</em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            {/* Custom Date Input */}
            {useCustomDate && savingFrequency === "DAILY" && (
              <div className="mt-2">
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Custom End Date
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={handleCustomEndDateChange}
                  min={formatDate(addDays(new Date(todayString), 1))}
                  required
                  className="input h-[3.5em] w-full rounded-lg border-[2px] border-gray-300 bg-white px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
                />
                {customEndDate && (
                  <p className="mt-1 text-xs text-gray-600">
                    Duration:{" "}
                    {getDateDifference(todayString, customEndDate, "daily")}
                  </p>
                )}
              </div>
            )}
          </section>
        )}
        {/* --- End Duration Selection UI --- */}

        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-[3em] flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-transform duration-300 hover:scale-110"
            aria-label="Go back"
          >
            <IoIosArrowDropleft size={25} />
          </button>
          <Button
            variant="text"
            onClick={handleNext}
            disabled={loading}
            className="flex justify-center rounded-md bg-text2 px-8 py-[1em] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform disabled:opacity-50"
          >
            {loading ? "Processing..." : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default StartDate;
