import React from "react";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";
import calenda from "../../../../../Assets/svg/dashboard/wallet/calenda.svg";

const Transactions = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="font-sans">
      <header className="mt-4 md:mt-6">
        <DashboardHeader onClick={handleBackClick}>
          <div className="flex w-full items-center justify-between">
            <IoIosArrowBack size={25} className="cursor-pointer" />
            <h1 className="text-base font-semibold md:text-xl">
              Transaction History
            </h1>
            <div className="w-6"></div>
          </div>
        </DashboardHeader>
      </header>

      <section className="px-5">
        <section className="mt-4 flex flex-col gap-2 md:mt-6">
          <div className="relative w-full md:w-[70%]">
            <input
              type="text"
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm placeholder-gray-400 shadow-md focus:border-gray-500"
              placeholder="Search"
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 transform text-lg text-gray-500" />
          </div>

          <div className="mt-2 flex flex-col justify-between gap-2 md:w-[80%] md:flex-row">
            <button className="flex items-center gap-2 rounded-full border border-black px-4 py-2 text-sm font-medium">
              Select Range
              <img
                src={calenda}
                alt="calenda"
                className="h-4 w-4 md:h-5 md:w-5"
              />
            </button>
            <button className="rounded-full bg-text2 px-3 py-2 text-sm text-white">
              Research Statements
            </button>
          </div>
        </section>

        <div className="mt-6 w-full rounded-lg border-b-4 border-red-600 bg-rec1 p-3 shadow-lg">
          <div className="flex items-center justify-between md:flex-row">
            <p className="text-sm font-semibold md:text-base">Fri 14</p>
            <p className="text-sm font-medium text-gray-400 md:text-base">
              10:19:00am
            </p>
            <p className="text-sm font-semibold md:text-base">June 2024</p>
          </div>
          <hr className="my-4 h-[1px] rounded-full bg-gray-200" />
          <div className="flex items-center justify-between md:flex-row">
            <p className="text-sm font-semibold md:text-base">
              From: Chain Coop Wallet
            </p>
            <p className="text-sm font-semibold text-red-500 md:text-base">
              -NGN 50,000
            </p>
          </div>
          <hr className="my-4 h-[1px] rounded-full bg-gray-200" />
          <div className="mt-4 flex flex-col justify-between gap-2 ">
            <div className="flex justify-between">
              <p className="jus text-sm font-medium text-gray-400 md:text-base">
                Receiver:
                <span className="ml-1 font-semibold text-howtext">
                  Kizo Pay Pass Salary
                </span>
              </p>
              <p className="text-sm font-semibold text-[#2EC046] md:text-base">
                Successful
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row">
            <button className="gap-2 rounded-full border border-black px-7 py-2 text-sm font-medium">
              Report
            </button>
            <button className="rounded-full bg-text2 px-7 py-2 text-sm text-white">
              Repeat
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Transactions;
