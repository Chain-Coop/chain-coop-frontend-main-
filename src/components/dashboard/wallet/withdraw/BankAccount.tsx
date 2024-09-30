import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Primary } from "../../../common/Button";
import { IoIosArrowBack } from "react-icons/io";

const BankAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount;

  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAccountNumberChange = (e:any) => {
    setAccountNumber(e.target.value);
    setError("");
  };

  const selectAccount = () => {
    if (accountNumber.length !== 10) {
      setError("Please enter a valid 10-digit account number.");
      return;
    }
    navigate("/dashboard/wallet/select-account", {
      state: { amount, accountNumber },
    });
  };

  return (
    <main className="font-sans">
      <header className="lg:mt-[2em]">
        <DashboardHeader
          className="relative cursor-pointer items-center"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-0 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Add Bank Account</div>
          </div>
        </DashboardHeader>
      </header>
      <section className="mt-[2em] px-[1em]">
        <p className="font-medium">
          {`Please, only add a bank account that you own. Transactions to accounts that don't belong to you will be flagged`}
        </p>
        {amount && (
          <p className="mt-[1em] font-medium">
            Withdrawal amount: <span className="text-green-500">NGN {parseFloat(amount).toLocaleString()}</span>
            </p>
        )}
        <div className="mt-[1.5em] flex flex-col gap-3">
          <label htmlFor="accountNumber" className="font-semibold">
            Account Number
          </label>
          <input
            name="accountNumber"
            id="accountNumber"
            type="text"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            maxLength={10}
            className="border-border bg-input focus:border-border flex-1 rounded-lg border-[1px] bg-inherit p-3 focus:bg-inherit focus:outline-none"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Primary
          className="mt-[2em] w-full bg-text2 py-3 text-white"
          onClick={selectAccount}
        >
          Continue
        </Primary>
      </section>
    </main>
  );
};

export default BankAccount;