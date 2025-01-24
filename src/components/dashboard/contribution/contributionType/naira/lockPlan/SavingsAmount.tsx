import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { Alert } from "@mui/material";
import { DashboardHeader } from "../../../../../common/DashboardHeader";

const MIN_AMOUNT = 2000;

const SavingsAmount = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const { purpose, plan, currency } = location.state || {};

  const formatAmount = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const formatted = Number(numbers).toLocaleString();
    return formatted === "NaN" ? "" : formatted;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/,/g, "");

    if (rawValue === "" || /^\d+$/.test(rawValue)) {
      setAmount(formatAmount(rawValue));
      setError("");
    }
  };

  const handleNext = () => {
    const numericAmount = Number(amount.replace(/,/g, ""));

    if (numericAmount < MIN_AMOUNT) {
      setError(
        `Minimum contribution amount is ₦${MIN_AMOUNT.toLocaleString()}`,
      );
    } else {
      setError("");
      navigate("/dashboard/contribution/lock/date", {
        state: {
          purpose,
          plan,
          amount: numericAmount,
          currency,
        },
      });
    }
  };

  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Flexible Savings
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] flex flex-col justify-center text-center lg:mt-[3em]">
          <h1 className="text-center text-xl font-semibold">
            {plan} Contribution
          </h1>
          <p>Enter the amount suitable to you</p>
        </header>
        <div className="mt-[2em]">
          <label htmlFor="amount" className="mb-3 flex text-text2">
            Amount
          </label>
          <div className="relative">
            <input
              type="text"
              id="amount"
              required
              value={amount}
              onChange={handleAmountChange}
              placeholder="0"
              className="input mb-5 h-[4em] w-full rounded-full border-[1px] pl-8 pr-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Minimum contribution amount: ₦{MIN_AMOUNT.toLocaleString()}
          </p>
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
              className="rounded-md bg-text2 px-8 py-2 font-semibold text-white
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
              active:scale-95 active:transform"
              onClick={handleNext}
              disabled={
                !amount || Number(amount.replace(/,/g, "")) < MIN_AMOUNT
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SavingsAmount;
