import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { Alert } from "@mui/material";
import { DashboardHeader } from "../../../../../common/DashboardHeader";

const StartDate: React.FC = () => {
  const today = formatDate(new Date());
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [savingsDuration, setSavingsDuration] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { purpose, amount, currency } = location.state || {};

  function formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleNextClick = () => {
    if (!savingsDuration || !endDate) {
      setError("Please select both savings duration and end date");
      return;
    }

    navigate("/dashboard/contribution/strict_lock/preview", {
      state: {
        purpose,
        amount,
        currency,
        startDate,
        endDate,
        savingsDuration,
      },
    });
  };

  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Strict Lock Plan
      </DashboardHeader>
      <div className="m-auto w-[90%]">
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
        <div className="flex flex-col gap-3">
          <label
            htmlFor="savingsDuration"
            className="flex text-lg font-semibold text-memt1"
          >
            Savings Duration
          </label>
          <input
            type="number"
            id="savingsDuration"
            value={savingsDuration}
            onChange={(e) => setSavingsDuration(e.target.value)}
            min="1"
            required
            className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            placeholder="Enter duration in months"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="endDate"
            className="flex text-lg font-semibold text-memt1"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
          />
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
            <IoIosArrowDropleft size={25} />
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
