import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../shared/redux/reduxHooks";
import {
  clearTransactionState,
  CreateContributionPlan,
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
import { AppDispatch } from "../../../../shared/redux/store";
import { useDispatch } from "react-redux";
import { RootState } from "../../../../shared/redux/rootReducer";
import {
  useUserProfile,
  useWallet,
} from "../../../../shared/Hooks/useUserProfile";

interface PreviewState {
  purpose: string;
  plan: string;
  amount: number;
  currency: string;
  savingsType: string;
  contributionType: string;
  startDate: string;
  endDate: string;
}

const Preview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    contributionPlan,
    payContributionPaystack,
    isLoading,
    error,
    createContributionPlanSuccess,
    payContributionPaystackSuccess,
  } = useAppSelector((state: RootState) => state.transaction);
  const { profileDetails } = useUserProfile();
  const { walletCard } = useWallet();
  const state = location.state as PreviewState | undefined;

  useEffect(() => {
    if (!state) {
      console.error(
        "Preview: Missing location.state, redirecting to contribution page",
      );
      navigate("/dashboard/contribution");
    } else {
      console.log("Preview: Received state:", state);
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const {
    purpose,
    plan,
    amount,
    savingsType,
    contributionType,
    startDate,
    endDate,
  } = state;
  const hasCards = (walletCard?.cards ?? []).length > 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributionData, setContributionData] = useState<{
    contributionId: string;
    withdrawalDate: string;
  } | null>(null);

  useEffect(() => {
    dispatch(clearTransactionState());
  }, [dispatch]);

  useEffect(() => {
    if (createContributionPlanSuccess && contributionPlan?.result) {
      setContributionData(contributionPlan.result);
      setIsModalOpen(true);
    }
  }, [createContributionPlanSuccess, contributionPlan]);

  useEffect(() => {
    if (
      payContributionPaystackSuccess &&
      payContributionPaystack?.payment?.info?.data?.authorization_url
    ) {
      handleModalClose();
      window.location.href =
        payContributionPaystack.payment.info.data.authorization_url;
    }
  }, [payContributionPaystackSuccess, payContributionPaystack]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!profileDetails?._id) {
      navigate("/dashboard/contribution");
      return;
    }

    const body = {
      savingsCategory: purpose,
      contributionPlan: plan,
      amount,
      startDate,
      endDate,
      currency: "NGN",
      savingsType,
      contributionType,
    };

    dispatch(CreateContributionPlan(body));
  };

  const handleDirectPayment = async (paymentType: "paystack") => {
    if (!contributionData?.contributionId || !profileDetails?._id) {
      console.error(
        "Preview: Missing contributionId or userId for Paystack payment",
      );
      return;
    }

    dispatch(
      PayContributionPaystack({
        contributionId: contributionData.contributionId,
        userId: profileDetails._id,
        paymentType: "paystack",
      }),
    );
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const formattedStartDate = startDate ? formatFullDate(startDate) : "N/A";
  const formattedEndDate = endDate ? formatFullDate(endDate) : "N/A";

  const previewData = [
    { label: "Amount", value: `${"NGN"} ${amount || "0"}` },
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
            {getSavingsTypeTitle(savingsType)} Preview
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
            disabled={isLoading}
            className="flex items-center justify-center rounded-md bg-text2 px-8 py-2 font-semibold normal-case text-white transition-all duration-300 hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            {isLoading ? "Submitting..." : "Submit"}
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
          isProcessing={isLoading}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </main>
  );
};

export default Preview;
