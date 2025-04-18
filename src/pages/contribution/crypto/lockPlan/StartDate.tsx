import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { Alert } from "@mui/material";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";

const StartDate: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const [duration, setDuration] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [savingFrequency, setSavingFrequency] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { tokenName } = location.state || {};

  const handleFrequencySelect = (frequency: string) => {
    setSavingFrequency(frequency);
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();

    const finalEndDate = customEndDate || duration;

    if (!finalEndDate) {
      setError("Please select or enter an end date.");
      return;
    }

    if (!savingFrequency) {
      setError("Please select a saving frequency.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = {
      ...location.state,
      startDate: today,
      duration: finalEndDate,
      savingFrequency,
      lockedType: location.state?.lockedType,
    };

    try {
      navigate("/dashboard/contribution/lock/source_funds", {
        state: formData,
      });
    } catch (error: any) {
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
            <img src={cryptoSavings} alt="savings-img" />
          </div>
        </section>
        <section className="mt-[2em]">
          <div>
            <h2 className="text-lg font-bold text-memt1">
              Select Saving Frequency
            </h2>
          </div>
          <div className="mt-[1.5em] flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-start lg:flex-wrap">
            <button
              onClick={() => handleFrequencySelect("Daily")}
              className={`flex h-[45px] w-[174px] transform items-center rounded-md px-6 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2 ${
                savingFrequency === "Daily"
                  ? "bg-text2 text-white"
                  : "bg-[#ECE6F2] text-memt1"
              }`}
            >
              Daily
            </button>

            <button
              onClick={() => handleFrequencySelect("Monthly")}
              className={`flex h-[45px] w-[174px] transform items-center rounded-md px-6 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2 ${
                savingFrequency === "Monthly"
                  ? "bg-text2 text-white"
                  : "bg-[#ECE6F2] text-memt1"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => handleFrequencySelect("Weekly")}
              className={`flex h-[45px] w-[174px] transform items-center rounded-md px-6 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2 ${
                savingFrequency === "Weekly"
                  ? "bg-text2 text-white"
                  : "bg-[#ECE6F2] text-memt1"
              }`}
            >
              Weekly
            </button>

            <button
              onClick={() => handleFrequencySelect("Manually")}
              className={`flex h-[45px] w-[174px] transform items-center rounded-md px-6 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2 ${
                savingFrequency === "Manually"
                  ? "bg-text2 text-white"
                  : "bg-[#ECE6F2] text-memt1"
              }`}
            >
              Manually
            </button>
          </div>
        </section>
        <div>
          <div className="mt-[2.5em]">
            <label className="mb-3 flex font-semibold">
              Start Date (Today)
            </label>
            <p className="input mb-5 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
              {today}
            </p>
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
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
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
          >
            <IoIosArrowDropleft size={25} />
          </button>
          <Button
            variant="text"
            onClick={handleNext}
            className="flex justify-center rounded-md bg-text2 px-8 py-[1em] font-semibold text-text3"
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

export default StartDate;
