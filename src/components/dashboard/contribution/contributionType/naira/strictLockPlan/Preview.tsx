import React, { useState } from "react";
import { DashboardHeader } from "../../../../../common/DashboardHeader";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowDropleft } from "react-icons/io";
import {
  CreateContributionPlan,
  PayContribution,
} from "../../../../../../shared/redux/slices/transaction.slices";
import { useAppDispatch } from "../../../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../../../shared/redux/store";
import { useUserCard } from "../../../../../../shared/Hooks/useUserProfile";
import PaymentWithCard from "../../../paymentChoice.tsx/PaymentWithCard";
import PayWithPaystack from "../../../paymentChoice.tsx/PayWithPaystack";
import { Button } from "@material-tailwind/react";

interface ContributionResponse {
  result: {
    contributionId: string;
    withdrawalDate: string;
  };
}

const Preview = () => {
  const location = useLocation();
  const {
    savingsCategory,
    amount,
    currency,
    startDate,
    endDate,
    contributionPlan,
  } = location.state || {};
  const navigate = useNavigate();
  const [contributionData, setContributionData] = useState<
    ContributionResponse["result"] | null
  >(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();
  const { useWalletCards } = useUserCard();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const hasCards = (useWalletCards?.cards ?? []).length > 0;

  const handleDirectPayment = async (paymentType: "paystack") => {
    setIsProcessingPayment(true);

    try {
      const paymentResponse = await dispatch(
        PayContribution({
          contributionId: contributionData?.contributionId,
          paymentType,
        }),
      ).unwrap();

      if (paymentResponse?.landing?.payment?.info?.data) {
        handleModalClose();
        window.location.href =
          paymentResponse.landing.payment.info.data.authorization_url;
      } else {
        setError("Unable to process payment. Please try again.");
      }
    } catch (error: any) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.error || "Payment verification failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const previewData = [
    { label: "Lock Amount", value: `${amount.toLocaleString()} ${currency}` },
    { label: "Start Date", value: formattedStartDate },
    { label: "End Date", value: formattedEndDate },
    { label: "Contribution Plan", value: contributionPlan || "Not specified" },
  ];

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const body = {
      savingsCategory,
      amount,
      currency,
      startDate,
      endDate,
      contributionType: "auto",
      contributionPlan,
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsProcessingPayment(false);
    setError("");
  };

  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Strict Lock Savings
      </DashboardHeader>
      <div>
        <header className="mt-[1.5em] flex flex-col gap-2 lg:mt-[3em]">
          <h1 className="text-2xl font-bold">Strict Lock Savings Preview</h1>
        </header>
        <header className="mt-[1.5em]">
          <p className="font-semibold text-gray-400">Title</p>
          <h1 className="text-2xl font-bold">{savingsCategory}</h1>
        </header>

        <div className="mt-[2em] grid grid-cols-1 gap-6 md:grid-cols-2">
          {previewData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg bg-gray-200 p-4 transition-all duration-300 hover:shadow-md"
            >
              <p className="font-semibold text-gray-500">{item.label}</p>
              <h1 className="mt-auto text-xl font-medium">{item.value}</h1>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-4 rounded-md bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}
      </div>
      <div className="mt-[3em] flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center transition-transform duration-300 hover:scale-110"
        >
          <IoIosArrowDropleft size={25} />
        </button>
        <Button
          onClick={handleSubmit}
          className="rounded-md bg-text2 px-8 py-2 font-semibold normal-case text-white"
          loading={loading}
        >
          {loading ? "Please Wait..." : "Next"}
        </Button>
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

export default Preview;
