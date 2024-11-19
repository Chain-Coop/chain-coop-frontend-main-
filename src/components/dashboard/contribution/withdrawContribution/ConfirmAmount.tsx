import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router";
import { Primary } from "../../../common/Button";
import { formatBalance } from "../../../../shared/utils/format";
import { useDispatch } from "react-redux";
import {
  FundProject,
  WithdrawalFromContribution,
} from "../../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../../shared/redux/store";
import { Alert } from "@mui/material";
import ReactLoading from "react-loading";
import Modal from "../../../common/Modal";
import success from "../../../../Assets/svg/auth/sucess.svg";
import { DashboardHeader } from "../../../common/DashboardHeader";

const ConfirmAmount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { amountInNaira, contributionId } = location.state as {
    amountInNaira: number;
    contributionId: string;
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handleFund = async () => {
    setLoading(true);
    setError("");
    try {
      const body = {
        amount: amountInNaira,
        contributionId: contributionId,
        pay: "active",
      };
      const result = await dispatch(WithdrawalFromContribution(body)).unwrap();
      if (result?.landing?.statusCode === 200) {
        setLoading(false);
        setIsModalOpen(true);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message || "An error occurred. Please try again.");
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
          <div className="tracking-wide">Confirm Amount</div>
        </div>
      </DashboardHeader>

      <section className="px-2">
        <div className="mt-[2.5em] flex justify-center">
          <h1 className="text-xl font-bold">{formatBalance(amountInNaira)}</h1>
        </div>
        <div className="mt-9 flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="font-semibold">Amount to Chain Co-op Walet</h1>
            <span className="font-medium">{formatBalance(amountInNaira)}</span>
          </div>
          <hr className="w-full" />
          <div className="flex items-center justify-between">
            <p className="font-semibold">Contribution Plan</p>
            <span className="font-medium">Monthly</span>
          </div>
          <hr className="w-full" />
        </div>
        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}
        <div className="mt-[2em] flex justify-center">
          <Primary
            className="flex w-[70%] justify-center bg-text2 py-3 text-white"
            onClick={handleFund}
            disabled={loading}
          >
            {loading ? (
              <ReactLoading
                type="spin"
                color="#ffffff"
                height={20}
                width={20}
              />
            ) : (
              `Fund ${formatBalance(amountInNaira)}`
            )}
          </Primary>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className="bg-white"
      >
        <div className="mt-[2.5em] flex flex-col justify-center">
          <img
            src={success}
            alt="Success Icon"
            className="mx-auto sm:w-[6em] lg:w-[8em]"
          />
          <header>
            <h1 className="text-center text-xl font-semibold">
              Successfully Submitted
            </h1>
          </header>
          <div className="mt-4 flex justify-center">
            <Primary
              className="w-[50%] bg-text2 py-2 text-white"
              onClick={handleCloseModal}
            >
              Done
            </Primary>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default ConfirmAmount;
