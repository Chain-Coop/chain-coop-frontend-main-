import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import withdraw from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import xlamation from "../../../../Assets/svg/dashboard/wallet/xclamation.svg";

const SelectBank = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount;

  const handleBackClick = () => {
    navigate(-1);
  };

  const BankAccount = () => {
    navigate("/dashboard/wallet/bank-account", { state: { amount } });
  };

  return (
    <main className="items-center font-sans">
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
            <div className="tracking-wide">Select Bank</div>
          </div>
        </DashboardHeader>
      </header>
      <article>
        <div className="px-[1em]">
          <div className="mt-[2em] flex w-full gap-[1em] rounded-lg bg-Dh px-[1.5em] py-[1em] font-medium">
            <img src={xlamation} alt="" />
            <p>
              Withdrawals can only be made to bank accounts that match the name of
              your Chain Coop account
            </p>
          </div>
          <div className="mt-[2em] text-center">
            <div className="flex justify-center">
              <img src={withdraw} alt="withdraw" />
            </div>
            <p className="mt-[1em] text-howtext">{`You haven't added any bank yet`}</p>
            {amount && (
              <p className="mt-[0.5em] font-medium">
                Withdrawal amount: <span className="text-green-500">NGN {parseFloat(amount).toLocaleString()}</span>
              </p>
            )}
          </div>
          <button
            className="mt-[2em] flex w-full justify-center gap-[1em] rounded-lg bg-Dh px-[1.5em] py-[1em] font-semibold text-text2"
            onClick={BankAccount}
          >
            <p>Add a new bank account</p>
          </button>
        </div>
      </article>
    </main>
  );
};

export default SelectBank;