import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { AppDispatch } from "../../../../shared/redux/store";
import { WithdrawalFromContribution } from "../../../../shared/redux/slices/transaction.slices";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { formatBalance } from "../../../../shared/utils/format";
import { Button, Typography } from "@material-tailwind/react";
import Success from "../../../common/Success";

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
            <Button
              variant="text"
              className="w-[70%] bg-text2 py-3 text-white"
              onClick={handleBackClick}
            >
              Go Back
            </Button>
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
            <Typography variant="small" className=" text-lg font-semibold">
              Amount to Chain Co-op Wallet
            </Typography>
            <span className="font-medium">
              {amountInNaira ? formatBalance(amountInNaira) : "---"}
            </span>
          </div>
          <hr className="w-full" />
          <div className="flex items-center justify-between">
            <Typography className="font-semibold">Contribution Plan</Typography>
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
          <Button
            variant="text"
            className="flex w-[70%] justify-center bg-text2 py-3 text-sm normal-case text-white hover:bg-text2"
            onClick={handleFund}
            disabled={loading || !amountInNaira || !contributionId}
            loading={loading}
          >
            {loading
              ? "Please Wait..."
              : `Fund ${amountInNaira ? formatBalance(amountInNaira) : "---"}`}
          </Button>
        </div>
      </section>

      <Success
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Successfully Submitted"
      />
    </main>
  );
};

export default ConfirmAmount;
