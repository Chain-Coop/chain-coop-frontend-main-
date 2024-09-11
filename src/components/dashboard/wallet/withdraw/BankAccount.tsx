import React from "react";
import { useNavigate } from "react-router";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Primary } from "../../../common/Button";
import { IoIosArrowBack } from "react-icons/io";

const BankAccount = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const selectAccount = () => {
    navigate("/dashboard/wallet/select-account");
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
        <p className="font-medium">{`Please, only add a bank account that you own. Transactions to accoiunts that don't belong to you will be flagged`}</p>
        <div className="mt-[1.5em] flex flex-col gap-3">
          <label htmlFor="amount" className="font-semibold">
            Account Number
          </label>
          <input
            name="amount"
            id="amount"
            type="number"
            className="border-border bg-input focus:border-border flex-1 rounded-lg border-[1px] bg-inherit p-3 pl-10 focus:bg-inherit focus:outline-none"
            style={{ textAlign: "right" }}
          />
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
