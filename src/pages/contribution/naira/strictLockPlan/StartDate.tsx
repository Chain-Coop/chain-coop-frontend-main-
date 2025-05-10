import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  addDays,
  addMonths,
  calculateAvailableEndDates,
  formatDate,
  getDateDifference,
  validateCustomEndDate,
} from "../../../../shared/utils/format";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import prevFormIcon from "../../../../Assets/svg/dashboard/ajo/prev_form.svg";

const StartDate: React.FC = () => {
  const today = formatDate(new Date());
  const startDate = today;
  const [endDate, setEndDate] = useState("");
  const [availableEndDates, setAvailableEndDates] = useState<string[]>([]);
  const [customEndDate, setCustomEndDate] = useState("");
  const [error, setError] = useState("");
  const [useCustomDate, setUseCustomDate] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { purpose, amount, currency, contributionType, contributionPlan } =
    location.state || {};
  const isDaily = contributionPlan?.toLowerCase() === "daily";

  const MAX_YEARS = 2;

  useEffect(() => {
    const dates = calculateAvailableEndDates(
      startDate,
      isDaily ? "daily" : "monthly",
    );
    setAvailableEndDates(dates);
    setEndDate("");
    setCustomEndDate("");
    setUseCustomDate(false);
  }, [startDate]);

  const handleEndDateChange = (event: any) => {
    const value = event.target.value;
    if (value === "custom" && isDaily) {
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
    const validation = validateCustomEndDate(startDate, value, {
      type: isDaily ? "daily" : "monthly",
    });
    if (validation.isValid) {
      setError("");
    } else {
      setError(validation.error || "");
    }
  };

  const handleNextClick = () => {
    const finalEndDate = useCustomDate ? customEndDate : endDate;

    if (!finalEndDate) {
      setError("Please select or enter an end date.");
      return;
    }

    const validation = validateCustomEndDate(startDate, finalEndDate, {
      type: isDaily ? "daily" : "monthly",
    });

    if (!validation.isValid) {
      setError(validation.error || "");
      return;
    }

    navigate("/dashboard/contribution/naira/strict_lock/preview", {
      state: {
        savingsCategory: purpose,
        amount,
        currency,
        startDate: startDate,
        endDate: finalEndDate,
        contributionType,
        contributionPlan,
        savingsType: "strict",
      },
    });
  };

  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="pb-[1.5em]">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Strict Lock Plan
      </DashboardHeader>
      <div>
        <header className="mt-[1.5em] flex flex-col justify-center text-center lg:mt-[3em]">
          <h1 className="text-center text-xl font-bold">Savings Duration</h1>
          <p className="mt-[1em] text-center text-sm font-medium">
            Save your money for a one-time and your savings will be locked. Then
            our team will unlock your savings for withdrawal untill after 6
            months of contributions.
          </p>
        </header>
        <h1 className="mt-[1.5em] text-xl font-semibold">
          How long would you like to restrict access to your funds?
        </h1>
        <div className="mt-[2em]">
          <label className="mb-3 flex font-semibold">Start Date (Today)</label>
          <p className="input mb-5 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
            {formattedStartDate}
          </p>
        </div>
        <div className="mt-[2em]">
          <FormControl fullWidth>
            <InputLabel id="end-date-label" style={{ color: "#440080" }}>
              Choose End Date
            </InputLabel>
            <Select
              labelId="end-date-label"
              id="end-date-select"
              value={useCustomDate ? "custom" : endDate}
              label="Choose End Date"
              onChange={handleEndDateChange}
              className="mb-5"
              sx={{
                height: "3.4em",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "0.5rem",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#440080",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#440080",
                },
              }}
            >
              <MenuItem value="">
                <em>Select end date</em>
              </MenuItem>
              {availableEndDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {new Date(date)?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  (
                  {getDateDifference(
                    startDate,
                    date,
                    isDaily ? "daily" : "monthly",
                  )}
                  )
                </MenuItem>
              ))}
              {isDaily && (
                <MenuItem value="custom">
                  <em>Set custom end date</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>

          {useCustomDate && isDaily && (
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Custom End Date
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={handleCustomEndDateChange}
                min={formatDate(addDays(new Date(startDate), 1))}
                max={formatDate(addMonths(new Date(startDate), MAX_YEARS * 12))}
                className="input mb-2 h-[4em] w-full rounded-lg border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
              {customEndDate && (
                <p className="text-sm text-gray-600">
                  Duration:{" "}
                  {getDateDifference(
                    startDate,
                    customEndDate,
                    isDaily ? "daily" : "monthly",
                  )}
                </p>
              )}
            </div>
          )}
        </div>
        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}
        <div className="mt-[3em] flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-transform duration-300 hover:scale-110"
          >
            <img src={prevFormIcon} alt="Previous form" className="w-[40px]" />
          </button>
          <button
            onClick={handleNextClick}
            className="rounded-md bg-text2 px-8 py-2 font-semibold text-white
                 transition-all duration-300 ease-in-out
                 hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
                 active:scale-95 active:transform"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default StartDate;
