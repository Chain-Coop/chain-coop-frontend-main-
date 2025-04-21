import React, { useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StartDate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const todayString = todayDate.toISOString().split("T")[0];

  const [endDate, setEndDate] = useState<Date | null>(null);
  const [savingsDuration, setSavingsDuration] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);

    if (date && date > todayDate) {
      const start = todayDate;
      const end = date;
      end.setHours(0, 0, 0, 0);

      const totalDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 3600 * 24),
      );
      const months = Math.floor(totalDays / 30);
      const days = totalDays % 30;
      setSavingsDuration(`${months} months (${days} days)`);
      setError("");
    } else {
      setSavingsDuration("");
      if (date && date <= todayDate) {
        setError("End date must be in the future.");
      }
    }
  };

  const handleNext = () => {
    const finalEndDateString = formatDate(endDate);

    if (!finalEndDateString) {
      setError("Please select an end date.");
      return;
    }

    if (!endDate || endDate <= todayDate) {
      setError("End date must be in the future.");
      return;
    }

    setError("");
    setLoading(true);

    let nextRoute = "/dashboard/contribution/strict_lock/source_funds";

    navigate(nextRoute, {
      state: {
        ...formData,
        startDate: todayString,
        duration: finalEndDateString,
        savingsDuration,
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

        <div>
          {/* Start Date */}
          <div className="mt-[2.5em]">
            <label className="mb-3 flex font-semibold">
              Start Date (Today)
            </label>
            <p className="input mb-5 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
              {todayString}
            </p>
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1">
            <label
              className="flex text-lg font-semibold text-memt1 mb-1"
            >
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={new Date(todayDate.getTime() + 24 * 60 * 60 * 1000)}
              placeholderText="YYYY-MM-DD"
              required
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2" // Apply your styles
              wrapperClassName="w-full"
            />
          </div>

          {/* Savings Duration */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="savingsDuration"
              className="flex text-lg font-semibold text-memt1"
            >
              Savings Duration
            </label>
            <input
              type="text"
              id="savingsDuration"
              value={savingsDuration}
              readOnly
              placeholder="Duration will be calculated"
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 bg-gray-100 px-4 text-sm shadow-md focus:outline-none" // Adjusted style for read-only
            />
          </div>
        </div>

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