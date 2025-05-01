import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import {
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../../components/common/DashboardHeader";
import cryptoSavings from "../../../../../Assets/png/dashboard/cryptSavings.png";
import "react-datepicker/dist/react-datepicker.css";
import {
  formatDate,
  addDays,
  addMonths,
  getDateDifference,
  calculateAvailableEndDates,
  validateCustomEndDate,
} from "../../../../../shared/utils/format";

const StartDate: React.FC = () => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const todayString = todayDate.toISOString().split("T")[0];

  const [endDate, setEndDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [availableEndDates, setAvailableEndDates] = useState<string[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { tokenName } = location.state || {};

  // useEffect to calculate available dates (run once)
  useEffect(() => {
    // Calculate presets assuming a 'daily' type for interval variety
    const config = { dailyIntervals: [7, 14, 30, 60, 90, 180] }; // Example presets
    const dates = calculateAvailableEndDates(todayString, "daily", config);
    setAvailableEndDates(dates);
  }, [todayString]); // Run only when todayString changes (effectively once on mount)

  // Handler for dropdown change
  const handleEndDateChange = (event: any) => {
    const value = event.target.value;
    if (value === "custom") {
      // Allow custom
      setUseCustomDate(true);
      setEndDate("");
    } else {
      setUseCustomDate(false);
      setEndDate(value);
      setCustomEndDate("");
    }
    setError(""); // Clear error on change
  };

  // Handler for custom date input change
  const handleCustomEndDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setCustomEndDate(value);
    // Validate on change
    const validation = validateCustomEndDate(todayString, value, {
      type: "daily",
      minDays: 7,
    });
    setError(validation.isValid ? "" : validation.error || "Invalid date");
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");

    const finalEndDate = useCustomDate ? customEndDate : endDate;

    // No frequency check needed

    if (!finalEndDate) {
      setError("Please select or enter an end date.");
      return;
    }

    // Final validation before submitting
    const validation = validateCustomEndDate(todayString, finalEndDate, {
      type: "daily",
      minDays: 7, // Lock plan might have different minimum?
    });
    if (!validation.isValid) {
      setError(validation.error || "Invalid end date selected.");
      return;
    }

    setLoading(true);

    const formData = {
      ...location.state,
      startDate: todayString,
      duration: finalEndDate,
      // No frequency
      lockedType: location.state?.lockedType,
      contributionType: location.state?.contributionType,
    };

    try {
      let nextRoute = "/dashboard/contribution/one_time_plan/lock/source_funds";
      navigate(nextRoute, {
        state: formData,
      });
    } catch (err: any) {
      console.error("Navigation error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pb-[1.5em] ">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Lock Savings
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] flex flex-col lg:mt-[3em]">
          <h1 className="text-2xl font-bold">Lock Savings</h1>
          <p className="mt-[1em] font-medium">
            You are about to save in {tokenName} crypto currency
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
        <section className="mt-[1em]">
          <FormControl fullWidth>
            <InputLabel id="end-date-select-label" style={{ color: "#000000" }}>
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
                  ({getDateDifference(todayString, date, "daily")}){" "}
                  {/* Always daily diff */}
                </MenuItem>
              ))}
              {/* Always allow custom for one-time */}
              <MenuItem value="custom">
                <em>Set custom end date</em>
              </MenuItem>
            </Select>
          </FormControl>

          {/* Custom Date Input */}
          {useCustomDate && (
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Custom End Date
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={handleCustomEndDateChange}
                min={formatDate(addDays(new Date(todayString), 7))} // Min 7 days
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
        {/* --- End Duration Selection UI --- */}

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
            className="flex justify-center rounded-md bg-text2 px-8 py-[1em] font-semibold text-text3 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default StartDate;
