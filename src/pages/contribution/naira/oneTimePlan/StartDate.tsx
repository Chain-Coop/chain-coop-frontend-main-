import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { Alert } from "@mui/material";
import useUserProfile, {
  useUserCard,
} from "../../../../shared/Hooks/useUserProfile";
import { addDays, formatDate } from "../../../../shared/utils/format";
import { AppDispatch } from "../../../../shared/redux/store";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import {
  CreateContributionPlan,
  GetWalletCard,
  PayContributionPaystack,
} from "../../../../shared/redux/slices/transaction.slices";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { Button } from "@material-tailwind/react";
import PaymentWithCard from "../../../../components/dashboard/contribution/paymentChoice/PaymentWithCard";
import PayWithPaystack from "../../../../components/dashboard/contribution/paymentChoice/PayWithPaystack";

interface ContributionResponse {
  result: {
    contributionId: string;
    withdrawalDate: string;
  };
}

const StartDate: React.FC = () => {
  const { useWalletCards } = useUserCard();
  const { profileDetails } = useUserProfile();
  const today = formatDate(new Date());
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributionData, setContributionData] = useState<
    ContributionResponse["result"] | null
  >(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const dispatch: AppDispatch = useAppDispatch();

  const { purpose, amount, currency, savingsType, contributionType } =
    location.state || {};

  const hasCards = (useWalletCards?.cards ?? []).length > 0;

  useEffect(() => {
    dispatch(GetWalletCard());
  }, [dispatch]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsProcessingPayment(false);
    setError("");
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!endDate) {
      setError("Please select an end date.");
      return;
    }

    const startDate = new Date(today);
    const selectedEndDate = new Date(endDate);

    const minEndDate = addDays(startDate, 7);
    if (selectedEndDate < minEndDate) {
      setError("End date must be at least 7 days after the start date.");
      return;
    }

    setLoading(true);
    setError("");

    const body = {
      savingsCategory: purpose,
      amount,
      startDate: today,
      endDate,
      currency: currency,
      // savingsType: savingsType,
      contributionType: contributionType,
      savingsType: "Strict",
    };

    try {
      const response = await dispatch(CreateContributionPlan(body)).unwrap();
      if (response?.result) {
        setContributionData(response.result);
        setIsModalOpen(true);
      } else {
        setError("Contribution plan creation failed. Please try again.");
      }
    } catch (error: any) {
      setError(error?.msg || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectPayment = async (paymentType: "paystack") => {
    if (!contributionData?.contributionId) {
      setError("Invalid contribution data");
      return;
    }

    setIsProcessingPayment(true);
    setError("");

    try {
      const paymentResponse = await dispatch(
        PayContributionPaystack({
          contributionId: contributionData.contributionId,
          userId: profileDetails?._id,
          paymentType: "paystack",
        }),
      ).unwrap();

      if (paymentResponse?.landing?.payment?.info?.data?.authorization_url) {
        handleModalClose();
        window.location.href =
          paymentResponse.landing.payment.info.data.authorization_url;
      } else {
        throw new Error("Missing payment authorization URL");
      }
    } catch (error: any) {
      let errorMessage = "An error occurred during payment. Please try again.";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setError(errorMessage);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const formattedStartDate = new Date(today).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="pb-[1.5em]">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Contribution Plan
      </DashboardHeader>

      <div>
        <header className="mt-[1em] flex flex-col justify-center text-center lg:mt-[3em]">
          <h1 className="text-center text-2xl font-bold">
            One-Time Contribution
          </h1>
          <p className="mt-[1em] text-center font-medium">
            You are about to save NGN{amount} one-time into your contribution
            amount
          </p>
        </header>

        <div className="mt-6 lg:mt-[2em]">
          <label className="mb-3 flex font-semibold">Start Date (Today)</label>
          <p className="input mb-5 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
            {formattedStartDate}
          </p>
        </div>

        <div className="mt-[2em]">
          <label className="mb-2 block text-sm font-medium">
            Select End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={formatDate(addDays(new Date(today), 7))} // Minimum 7 days after start date
            className="input mb-2 h-[4em] w-full rounded-lg border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
          />
        </div>

        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-4 lg:mt-[3em]">
          <Button
            onClick={handleSubmit}
            disabled={loading || !endDate}
            loading={loading}
            className="m-auto flex w-[80%] justify-center rounded-md bg-text2 px-8 py-[1em] text-sm font-semibold normal-case text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            {loading ? "Please Wait..." : "Submit"}
          </Button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-[3em] flex items-center transition-transform duration-300 hover:scale-110"
        >
          <IoIosArrowDropleft size={25} />
        </button>
      </div>

      {hasCards ? (
        contributionData && (
          <PaymentWithCard
            contributionData={contributionData}
            onClose={handleModalClose}
            isOpen={isModalOpen}
          />
        )
      ) : (
        <PayWithPaystack
          onSelect={handleDirectPayment}
          isProcessing={isProcessingPayment}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </main>
  );
};

export default StartDate;
