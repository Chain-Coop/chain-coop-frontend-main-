import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Modal from "../../../common/Modal";
import { Primary } from "../../../common/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import withdraw from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";

const Withdraw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const WITHDRAWAL_LIMIT = 500000000;

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError("");
  };

  const handleAmountChange = (e: any) => {
    const inputAmount = e.target.value;
    setAmount(inputAmount);

    const numAmount = parseFloat(inputAmount);
    if (numAmount > WITHDRAWAL_LIMIT) {
      setError(
        `Amount exceeds the withdrawal limit of ${WITHDRAWAL_LIMIT.toLocaleString()} NGN.`,
      );
    } else {
      setError("");
    }
  };

  const handleContinue = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount.");
    } else if (numAmount > WITHDRAWAL_LIMIT) {
      setError(
        `Amount exceeds the withdrawal limit of ${WITHDRAWAL_LIMIT.toLocaleString()} NGN.`,
      );
    } else {
      navigate("/dashboard/wallet/select-bank", {
        state: { amount: numAmount },
      });
    }
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
            <div className="tracking-wide">Withdraw</div>
          </div>
        </DashboardHeader>
      </header>
      <section className="m-auto mt-[2em] h-full w-full">
        <div className="flex items-center justify-between px-4 sm:px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <img src={withdraw} alt="Withdraw" className="h-12 w-12" />
            <p className="text-lg font-medium">Withdraw to Bank Account</p>
          </div>
          <IoIosArrowForward
            size={25}
            className="cursor-pointer"
            onClick={toggleModal}
          />
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        className="mx-4 bg-white"
      >
        <div className="mt-[2.5em] w-full max-w-[38em] px-4">
          <header>
            <h1 className="text-center text-lg font-semibold sm:text-xl">
              Bank Account Withdrawal
            </h1>
          </header>
          <section className="mt-[2em]">
            <hr className="h-[1px] rounded-md" />
            <div className="mt-3 flex flex-col justify-between gap-2 text-sm sm:flex-row sm:text-base">
              <p className="text-howtext">Duration</p>
              <p className="font-medium">2-3 business days</p>
            </div>
            <hr className="mt-3 h-[1px] rounded-md" />
            <div className="mt-5 flex flex-col justify-between gap-2 text-sm sm:flex-row sm:text-base">
              <p className="text-howtext">Withdrawal limit</p>
              <p className="whitespace-nowrap font-medium">
                {WITHDRAWAL_LIMIT.toLocaleString()} NGN / transaction
              </p>
            </div>
            <hr className="mt-3 h-[1px] rounded-md" />
            <div className="mt-[1em] w-full">
              <label
                htmlFor="amount"
                className="flex-start flex text-sm font-semibold sm:text-base"
              >
                Enter Amount
              </label>
              <div className="relative mt-[1em] flex w-full items-center">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-semibold">
                  NGN
                </span>
                <input
                  name="amount"
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="border-border bg-input focus:border-border w-full rounded-lg border-[1px] bg-inherit p-2 pl-12 text-sm focus:bg-inherit focus:outline-none sm:p-3 sm:text-base"
                  style={{ textAlign: "right" }}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm font-bold text-red-500">{error}</p>
              )}
            </div>
          </section>
          <Primary
            className="mt-[2em] w-full bg-text2 py-2 text-sm text-white sm:text-base"
            onClick={handleContinue}
          >
            Continue
          </Primary>
        </div>
      </Modal>
    </main>
  );
};

export default Withdraw;
