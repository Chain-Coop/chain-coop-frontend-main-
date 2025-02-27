import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { WithdrawIcon } from "../../../../Assets/svg";
import WithdrawAmountModal from "./modals/WithdrawAmountModal";

const WITHDRAWAL_LIMIT = 5000000;

const Withdraw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setError("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Withdraw</div>
        </div>
      </DashboardHeader>
      <section className="m-auto mt-[2em] h-full w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WithdrawIcon />
            <p className="text-lg font-medium">Withdraw to Bank Account</p>
          </div>
          <IoIosArrowForward
            size={25}
            className="cursor-pointer"
            onClick={toggleModal}
          />
        </div>
      </section>

      <WithdrawAmountModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        amount={amount}
        error={error}
        handleAmountChange={handleAmountChange}
        handleContinue={handleContinue}
        withdrawalLimit={WITHDRAWAL_LIMIT}
      />
    </main>
  );
};

export default Withdraw;
