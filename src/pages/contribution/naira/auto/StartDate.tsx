import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import prevFormIcon from "../../../../Assets/svg/dashboard/ajo/prev_form.svg";
import {
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import {
  formatDate,
  addDays,
  addMonths,
  getDateDifference,
  calculateAvailableEndDates,
  validateCustomEndDate,
} from "../../../../shared/utils/format";
import { toast } from "react-toastify";

interface StartDateState {
  purpose: string;
  plan: string;
  amount: number;
  currency: string;
  savingsType: string;
  contributionType: string;
}

const StartDate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { purpose, plan, amount, currency, savingsType, contributionType } =
    location.state as StartDateState;
  const isDaily = plan?.toLowerCase() === "daily";

  useEffect(() => {
    if (
      !purpose ||
      !plan ||
      !amount ||
      !currency ||
      !savingsType ||
      !contributionType
    ) {
      toast.error("Missing required information. Please start over.");
      navigate("/dashboard/contribution");
    }
  }, [
    purpose,
    plan,
    amount,
    currency,
    savingsType,
    contributionType,
    navigate,
  ]);

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(now.getDate()).padStart(2, "0")}`;
  const [endDate, setEndDate] = useState("");
  const [availableEndDates, setAvailableEndDates] = useState<string[]>([]);
  const [customEndDate, setCustomEndDate] = useState("");
  const [error, setError] = useState("");
  const [useCustomDate, setUseCustomDate] = useState(false);

  useEffect(() => {
    const dates = calculateAvailableEndDates(
      today,
      isDaily ? "daily" : "monthly",
    );
    setAvailableEndDates(dates);
    setEndDate("");
    setCustomEndDate("");
    setUseCustomDate(false);
  }, [today, isDaily]);

  const handleEndDateChange = (event: SelectChangeEvent<string>) => {
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
    const validation = validateCustomEndDate(today, value, {
      type: isDaily ? "daily" : "monthly",
    });
    setError(validation.isValid ? "" : validation.error || "");
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const finalEndDate = useCustomDate ? customEndDate : endDate;

    if (!finalEndDate) {
      setError("Please select or enter an end date.");
      return;
    }

    const validation = validateCustomEndDate(today, finalEndDate, {
      type: isDaily ? "daily" : "monthly",
    });
    if (!validation.isValid) {
      setError(validation.error || "Invalid end date");
      return;
    }

    console.log("Navigating to Preview with state:", {
      purpose,
      plan,
      amount,
      currency,
      savingsType,
      contributionType,
      startDate: today,
      endDate: finalEndDate,
    });

    navigate("/dashboard/contribution/preview", {
      state: {
        purpose,
        plan,
        amount,
        currency,
        savingsType,
        contributionType,
        startDate: today,
        endDate: finalEndDate,
      },
    });
  };

  const formattedStartDate = new Date(today).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="pb-[1.5em]">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Contribution Plan
      </DashboardHeader>

      <div>
        <header className="mt-[1em] flex flex-col justify-center text-center lg:mt-[3em]">
          <h1 className="text-center text-2xl font-bold">
            {plan} Contribution
          </h1>
          <p className="mt-[1em] text-center font-medium">
            You are about to save {currency || "NGN"}
            {amount || "0"} {plan?.toLowerCase() || ""} into your contribution
            amount
          </p>
        </header>

        {savingsType === "Strict" && (
          <Typography className="mt-[1.5em] text-xl font-semibold">
            How long would you like to restrict access to your funds?
          </Typography>
        )}

        <div className="mt-6 lg:mt-[1.5em]">
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
              {isDaily && (
                <MenuItem value="custom">
                  <em>Set custom end date</em>
                </MenuItem>
              )}
              {availableEndDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {new Date(date)?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  (
                  {getDateDifference(
                    today,
                    date,
                    isDaily ? "daily" : "monthly",
                  )}
                  )
                </MenuItem>
              ))}
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
                min={formatDate(addDays(new Date(today), 1))}
                max={formatDate(addMonths(new Date(today), 24))}
                className="input mb-2 h-[4em] w-full rounded-lg border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
              {customEndDate && (
                <p className="text-sm text-gray-600">
                  Duration:{" "}
                  {getDateDifference(
                    today,
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

        <div className="mt-4 lg:mt-[3em]">
          <Button
            onClick={handleSubmit}
            disabled={!endDate && !customEndDate}
            className="px Geology, Astronomy, and Space Exploration-8 m-auto flex w-[80%] justify-center rounded-md bg-text2 py-[1em] text-sm font-semibold normal-case text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            Next
          </Button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-[3em] flex items-center transition-transform duration-300 hover:scale-110"
        >
          <img src={prevFormIcon} alt="Previous form" className="w-[40px]" />
        </button>
      </div>
    </main>
  );
};

export default StartDate;
