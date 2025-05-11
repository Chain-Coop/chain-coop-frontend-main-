import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../shared/redux/store";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/redux/reduxHooks";
import {
  useUserCard,
  useUserProfile,
} from "../../../../shared/Hooks/useUserProfile";
import {
  CreateContributionPlan,
  GetWalletCard,
  PayContributionPaystack,
} from "../../../../shared/redux/slices/transaction.slices";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { Button, Typography } from "@material-tailwind/react";
import { Alert } from "@mui/material";
import PaymentWithCard from "../../../../components/dashboard/contribution/paymentChoice/PaymentWithCard";
import PayWithPaystack from "../../../../components/dashboard/contribution/paymentChoice/PayWithPaystack";
import prevFormIcon from "../../../../Assets/svg/dashboard/ajo/prev_form.svg";
import { getSavingsTypeTitle } from "../../../../shared/utils/Helpers";
import { formatFullDate } from "../../../../shared/utils/format";
import { RootState } from "../../../../shared/redux/rootReducer";

interface ContributionResponse {
  result: {
    contributionId: string;
    withdrawalDate: string;
  };
}

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { useWalletCards } = useUserCard();
  const { getProfile } = useAppSelector((state: RootState) => state.landing);

  const {
    purpose,
    plan,
    amount,
    currency,
    savingsType,
    contributionType,
    startDate,
    endDate,
  } = location.state || {};
  const hasCards = (useWalletCards?.cards ?? []).length > 0;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributionData, setContributionData] = useState<
    ContributionResponse["result"] | null
  >(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    dispatch(GetWalletCard());
  }, [dispatch]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body = {
      savingsCategory: purpose,
      contributionPlan: plan,
      amount,
      startDate,
      endDate,
      currency,
      savingsType,
      contributionType,
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
          userId: getProfile?._id,
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsProcessingPayment(false);
    setError("");
  };

  const formattedStartDate = startDate ? formatFullDate(startDate) : "N/A";

  const formattedEndDate = endDate ? formatFullDate(endDate) : "N/A";

  const previewData = [
    { label: "Amount", value: `${currency || "NGN"} ${amount || "0"}` },
    { label: "Start Date", value: formattedStartDate },
    { label: "End Date", value: formattedEndDate },
  ];

  return (
    <main className="pb-[1.5em]">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        {getSavingsTypeTitle(savingsType)}
      </DashboardHeader>
      <div>
        <header className="mt-[1.5em] flex flex-col gap-2 lg:mt-[3em]">
          <Typography className="text-2xl font-bold">
            {getSavingsTypeTitle(savingsType)} {""}
            Preview
          </Typography>

          <Typography className="mt-4 text-xl text-gray-400">Title</Typography>
          <Typography className="text-2xl font-bold">{purpose}</Typography>
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
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-[3em] flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-transform duration-300 hover:scale-110"
          >
            <img src={prevFormIcon} alt="Previous form" className="w-[40px]" />
          </button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
            className="flex items-center justify-center rounded-md bg-text2 px-8 py-2 font-semibold normal-case text-white transition-all duration-300 hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            Submit
          </Button>
        </div>
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
