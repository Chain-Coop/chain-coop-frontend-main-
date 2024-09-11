import React from "react";
import { useState } from "react";
import ToggleButton from "../../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../common/DashboardHeader";
import { MdArrowOutward } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Primary } from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import { useNavigate } from "react-router";
import { useConributionBalance } from "../../../shared/Hooks/useBalance";


const Contribution = () => {
  const { formattedBalance } = useConributionBalance();
  // console.log("formatted contribution",formattedBalance)
  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const SelectBank = () => {
    navigate("/dashboard/wallet/select-bank");
  };

  const fundContribution = ()=>{
    navigate("/dashboard/wallet/transfer")
  }
  return (
    <main className="font-sans">
      <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
          Monthly Contribution
        </DashboardHeader>
      </header>
      <section className="mt-[2em] sm:px-[1.5em] lg:mx-auto lg:w-[33em] lg:px-[0]">
        <article className="text-center text-text4">
          <div className="mt-[2em] rounded-3xl py-[2em] shadow-md">
            <div className="flex justify-center gap-4 font-sans">
              <p className="font-medium">Contribution Balance</p>
              <div>
                <ToggleButton
                  isVisible={isContributionVisible}
                  onToggle={(newVisibility) => {
                    setIsContributionVisible(newVisibility);
                    sessionStorage.setItem(
                      "contributionBalanceVisible",
                      newVisibility.toString(),
                    );
                  }}
                />
              </div>
            </div>
            <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
              {isContributionVisible ? (
                <p className="font-bold sm:text-xl lg:text-xl">
                  {formattedBalance}
                </p>
              ) : (
                <p className="text-2xl font-bold">*********</p>
              )}
              <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
            </div>
            <div className="mt-[1em] flex justify-center gap-2">
              <span>Total Gains</span>
              <MdArrowOutward className="fill-act" />
              <span className="font-semibold text-act">0%</span>
            </div>
          </div>
          <section className="mt-[2em]">
            <div className="flex justify-between">
              <div>
                <button onClick={fundContribution} className="rounded-full bg-inherit text-lg font-semibold shadow-md sm:px-[2em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                  Payment
                </button>
              </div>
              <div>
                <button
            onClick={toggleModal}
            className="rounded-full bg-inherit text-lg font-semibold shadow-md sm:px-[2em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                  Withdraw
                </button>
              </div>
            </div>
            <hr className="mt-[2em] w-full" />
            <div className="auto-deduction mt-[1em] flex justify-between">
              <p className="sm:font-semibold lg:text-sm lg:font-medium">
                Auto-Deduction from Wallet
              </p>
              <div className="flex items-center">
                <button className="cursor-pointer rounded-full font-medium sm:px-[1em] sm:py-[2px] lg:px-[1.5em] lg:py-[5px]">
                  Turn Off
                </button>
                <IoIosArrowForward className="cursor-pointer" />
              </div>
            </div>
          </section>
        </article>
        <section className="mt-[1em]">
          <p className="text-lg font-semibold">Monthly Contribution Tracker</p>
        </section>
        <div>
          <p className="mt-[1em] text-sm">
            Effortlessly manage and monitor your financial commitments
          </p>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={toggleModal} className="bg-white">
        <div className="mt-[2.5em]">
          <header>
            <h1 className="text-center text-xl font-semibold">
              Bank Account Withdrawal
            </h1>
          </header>
          <section className="mt-[2em]">
            <hr className="h-[1px] rounded-md " />
            <div className="mt-3 flex justify-between">
              <p className="text-howtext">Duration</p>
              <p className="font-medium">2-3 business days</p>
            </div>
            <hr className="mt-3 h-[1px] rounded-md" />
            <div className="mt-5 flex justify-between">
              <p className="text-howtext">Withdrawal limit</p>
              <p className="font-medium">500,000,000 / transaction</p>
            </div>
            <hr className="mt-3 h-[1px] rounded-md" />
            <div className="mt-[1em] w-full">
              <label htmlFor="amount" className="flex-start flex font-medium">
                Enter Amount
              </label>
              <div className="relative mt-[1em] flex w-full items-center">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-semibold text-gray-500">
                  NGN
                </span>
                <input
                  name="amount"
                  id="amount"
                  type="number"
                  className="border-border bg-input focus:border-border flex-1 rounded-lg border-[1px] bg-inherit p-3 pl-10 focus:bg-inherit focus:outline-none"
                  style={{ textAlign: "right" }}
                />
              </div>
            </div>
          </section>
          <Primary
            className="mt-[2em] w-full bg-text2 py-2 text-white"
            onClick={SelectBank}
          >
            Continue
          </Primary>
        </div>
      </Modal>
    </main>
  );
};

export default Contribution;
