import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { Alert } from "@mui/material";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StartDate: React.FC = () => {
  const todayDate = new Date();
  const todayString = todayDate.toISOString().split("T")[0];

  const [endDate, setEndDate] = useState<Date | null>(null);

  const [savingFrequency, setSavingFrequency] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { tokenName } = location.state || {};

  const handleFrequencySelect = (frequency: string) => {
    setSavingFrequency(frequency);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();

    const finalEndDateString = formatDate(endDate);

    if (!finalEndDateString) {
      setError("Please select an end date.");
      return;
    }

    if (!savingFrequency) {
      setError("Please select a saving frequency.");
      return;
    }

    if (!endDate || endDate <= todayDate) {
      setError("End date must be in the future.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = {
      ...location.state,
      startDate: todayString,
      duration: finalEndDateString,
      savingFrequency,
      lockedType: location.state?.lockedType,
      contributionType: location.state?.contributionType,
    };

    try {
      let nextRoute = "/dashboard/contribution/flexible/source_funds";
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
        Flexible Savings
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] flex flex-col lg:mt-[3em]">
          <h1 className="text-2xl font-bold">Flexible Savings</h1>
          <p className="mt-[1em] font-medium">
            {tokenName
              ? `You are about to save in ${tokenName} crypto currency`
              : "Set up your savings plan"}
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
            {(["DAILY", "WEEKLY", "MONTHLY", "MANUALLY"] as const).map(
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
            <p className="input mb-5 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
              {todayString}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="mb-1 flex text-lg font-semibold text-memt1">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              minDate={new Date(todayDate.setDate(todayDate.getDate() + 1))}
              placeholderText="YYYY-MM-DD"
              required
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2" // Apply your styles
              wrapperClassName="w-full"
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
