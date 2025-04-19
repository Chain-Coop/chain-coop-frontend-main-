import { IoIosArrowDropleft } from "react-icons/io";
import cryptoSavings from "../../../../../Assets/png/dashboard/cryptSavings.png";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../../components/common/DashboardHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@mui/material";

const StartDate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  const today = new Date().toISOString().split("T")[0];
  const [duration, setDuration] = useState<string>("");
  const [savingsDuration, setSavingsDuration] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = e.target.value;
    setDuration(selectedEndDate);

    const start = new Date(today);
    const end = new Date(selectedEndDate);

    if (end > start) {
      const totalDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 3600 * 24),
      );
      const months = Math.floor(totalDays / 30);
      const days = totalDays % 30;
      setSavingsDuration(`${months} months (${days} days)`);
    } else {
      setSavingsDuration("");
    }
  };

  const handleNext = () => {
    if (!duration) {
      setError("Please select an end date.");
      return;
    }

    setError("");
    navigate("/dashboard/contribution/one_time_plan/strict_lock/source_funds", {
      state: {
        ...formData,
        startDate: today,
        duration,
        savingsDuration,
        lockedType: location.state?.lockedType,
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
            You can save one-time and withdrawal will be locked until saving
            duration is complete
          </p>
        </header>
        <section className="mt-[2.5em] flex justify-center">
          <div>
            <img src={cryptoSavings} alt="savings-img" />
          </div>
        </section>

        <div>
          {/* Start Date */}
          <div className="mt-[2.5em]">
            <label className="mb-3 flex font-semibold">
              Start Date (Today)
            </label>
            <p className="input mb-5 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
              {today}
            </p>
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="endDate"
              className="flex text-lg font-semibold text-memt1"
            >
              End Date
            </label>
            <input
              type="date"
              id="duration"
              value={duration}
              onChange={handleEndDateChange}
              required
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
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
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 bg-gray-100 px-4 text-sm shadow-md focus:outline-none"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-[3em] flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-transform duration-300 hover:scale-110"
          >
            <IoIosArrowDropleft size={25} />
          </button>
          <Button
            variant="text"
            onClick={handleNext}
            className="flex justify-center rounded-md bg-text2
              px-8 py-[1em] font-semibold
              text-white transition-all duration-300
              ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

export default StartDate;
