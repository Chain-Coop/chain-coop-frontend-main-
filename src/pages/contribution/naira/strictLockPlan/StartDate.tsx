import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert } from "@mui/material";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import FormInput from "../../../../components/common/FormInput";
import prevFormIcon from "../../../../Assets/svg/dashboard/ajo/prev_form.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StartDate: React.FC = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { purpose, amount, currency, contributionType, contributionPlan } =
    location.state || {};

  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleNextClick = () => {
    if (!endDate) {
      setError("Please select an end date");
      return;
    }

    navigate("/dashboard/contribution/naira/strict_lock/preview", {
      state: {
        savingsCategory: purpose,
        amount,
        currency,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        contributionType,
        contributionPlan,
        savingsType: "strict",
      },
    });
  };

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
        <div className="mb-5">
          <label className="mb-3 flex font-semibold">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            minDate={today}
            className="input flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            readOnly
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
