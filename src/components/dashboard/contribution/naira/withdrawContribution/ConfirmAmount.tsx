import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router";
import { Primary } from "../../../../common/Button";
import { formatBalance } from "../../../../../shared/utils/format";
import { useDispatch } from "react-redux";
import { WithdrawalFromContribution } from "../../../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../../../shared/redux/store";
import { Alert } from "@mui/material";
import ReactLoading from "react-loading";
import Modal from "../../../../common/Modal";
import success from "../../../../../Assets/svg/auth/sucess.svg";
import { DashboardHeader } from "../../../../common/DashboardHeader";

const ConfirmAmount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [amountInNaira, setAmountInNaira] = useState<number | null>(null);
  const [contributionId, setContributionId] = useState<string | null>(null);

  useEffect(() => {
    if (!location.state) {
      setError("Missing required information. Please try again.");
      return;
    }

    const { amountInNaira: amount, contributionId: id } = location.state as {
      amountInNaira?: number;
      contributionId?: string;
    };

    if (!amount || !id) {
      setError("Invalid amount or contribution ID. Please try again.");
      return;
    }

    setAmountInNaira(amount);
    setContributionId(id);
  }, [location.state]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handleFund = async () => {
    if (!amountInNaira || !contributionId) {
      setError("Missing required information. Please try again.");
      return;
    }

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

  if (error && (!amountInNaira || !contributionId)) {
    return (
      <main className="font-sans">
        <DashboardHeader
          className="relative cursor-pointer items-center lg:mt-[2em]"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-0 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Error</div>
          </div>
        </DashboardHeader>
        <div className="mt-8 px-4">
          <Alert severity="error">{error}</Alert>
          <div className="mt-4 flex justify-center">
            <Primary
              className="w-[70%] bg-text2 py-3 text-white"
              onClick={handleBackClick}
            >
              Go Back
            </Primary>
          </div>
        </div>
      </main>
    );
  }

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
          <h1 className="text-xl font-bold">
            {amountInNaira ? formatBalance(amountInNaira) : "---"}
          </h1>
        </div>
        <div className="mt-9 flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="font-semibold">Amount to Chain Co-op Wallet</h1>
            <span className="font-medium">
              {amountInNaira ? formatBalance(amountInNaira) : "---"}
            </span>
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
            disabled={loading || !amountInNaira || !contributionId}
          >
            {loading ? (
              <ReactLoading
                type="spin"
                color="#ffffff"
                height={20}
                width={20}
              />
            ) : (
              `Fund ${amountInNaira ? formatBalance(amountInNaira) : "---"}`
            )}
          </Primary>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className="w-[90%] rounded-lg bg-white"
      >
        <div className="flex flex-col justify-center py-[1em] lg:w-[25em]">
          <img
            src={success}
            alt="Success Icon"
            className="mx-auto w-[4em] sm:w-[5em] md:w-[6em] lg:w-[8em]"
          />
          <header>
            <h1 className="text-center text-lg font-semibold sm:text-xl">
              Successfully Submitted
            </h1>
          </header>
          <div className="mt-4 flex justify-center">
            <Primary
              className="w-[80%] bg-text2 py-2 text-white sm:w-[60%] md:w-[50%]"
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
