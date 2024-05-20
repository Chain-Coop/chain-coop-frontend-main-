import { DashboardHeader } from "../../common/DashboardHeader";
import { useState } from "react";
import {
  MdOutlineVisibilityOff,
  MdOutlineVisibility,
  MdArrowOutward,
} from "react-icons/md";
import { PiHandWithdrawBold } from "react-icons/pi";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const Wallet = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const toggleVisibility = () => {
    setBalanceVisible((prevVisible) => !prevVisible);
  };

  return (
    <main className="font-sans">
      <div className="items-center sm:mt-[0] lg:mt-[2em]">
        <header>
          <DashboardHeader text="Chain Coop Wallet" />
        </header>
        <div className="mx-auto sm:px-[1.5em] lg:w-[31em]">
          <section className="text-center text-text4">
            <div className="mx-auto mt-[2em] rounded-3xl py-[2em] shadow-md">
              <div className="flex justify-center gap-4 font-sans">
                <p className="font-medium">Wallet Balance</p>
                <div>
                  <button className="bg-inherit" onClick={toggleVisibility}>
                    {balanceVisible ? (
                      <MdOutlineVisibilityOff />
                    ) : (
                      <MdOutlineVisibility />
                    )}
                  </button>
                </div>
              </div>
              <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
                {balanceVisible ? (
                  <p className="text-2xl font-bold">N 100,000.00</p>
                ) : (
                  <p className="text-2xl font-bold">*********</p>
                )}
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext font-normal" />
              </div>
              <div className="mt-[1em] flex justify-center gap-2">
                <span>Total Gains</span>
                <MdArrowOutward className="fill-act" />
                <span className="font-semibold text-act">0%</span>
              </div>
            </div>
          </section>
          {/***/}
          <div className="mt-[1.5em] rounded-3xl shadow-md">
            <div className="flex items-center justify-between py-[2em] font-semibold text-howtext sm:px-[1em] lg:px-[2.5em]">
              <button className="flex flex-col items-center bg-inherit text-center">
                <PiHandWithdrawBold className=" cursor-pointer fill-howtext text-4xl" />
                <span className="block lg:text-lg ">Withdraw</span>
              </button>
              <button className="flex flex-col items-center bg-inherit text-center">
                <BsPlusCircleFill className="cursor-pointer fill-howtext text-4xl" />
                <span className="block lg:text-lg">Fund Wallet</span>
              </button>
              <button className="flex flex-col items-center bg-inherit text-center">
                <FaMoneyBillTransfer className="cursor-pointer fill-howtext text-4xl" />
                <span className="block lg:text-lg ">Transfer</span>
              </button>
            </div>
          </div>
          <hr className="mt-[2em] h-[1px] rounded-md bg-howtext font-normal" />
          <div className="mt-[2em]">
            <p className="text-base font-semibold">No Card Linked</p>
            <div className="mt-[1em] lg:flex lg:justify-between ">
              <p>You havent linked your card to add fund</p>
              <div className="flex items-center">
                <button className="flex items-center rounded-full bg-act py-[2px] text-center font-medium text-text5 sm:px-[9px] lg:px-[7px]">
                  Turn On
                  <IoIosArrowForward />
                </button>
              </div>
            </div>

            <div className="mt-[2em]">
              <p className="text-base font-semibold">Recent Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wallet;
