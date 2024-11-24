import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../../../shared/redux/store";
import {
  clearContributionDetails,
  GetContributionDetailsById,
  PayUnPaidContribution,
} from "../../../../shared/redux/slices/transaction.slices";
import { formatBalance } from "../../../../shared/utils/format";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import ToggleButton from "../../../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "../../../common/Modal";
import PaymentWithCard from "../unpaidContribution/PaymentWithCard";
import PayWithPaystack from "../unpaidContribution/PayWithPaystack";
import { useUnPaidContribution } from "../../../../shared/Hooks/useBalance";
import { motion } from "framer-motion";
import { Alert, Snackbar, Box } from "@mui/material";

type VerificationStatus = "idle" | "verifying" | "success" | "error";

const DetailsSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="flex justify-center">
      <div className="h-6 w-48 rounded-full bg-gray-200"></div>
    </div>
    <div className="mt-6 rounded-3xl py-8 shadow-md">
      <div className="flex justify-center gap-4">
        <div className="h-5 w-40 rounded bg-gray-200"></div>
        <div className="h-5 w-8 rounded bg-gray-200"></div>
      </div>
      <div className="mx-auto mt-6 w-60 rounded-md">
        <div className="h-8 rounded bg-gray-200"></div>
        <hr className="mt-4 h-1 rounded-md bg-gray-200" />
      </div>
    </div>
  </div>
);

const StatsSkeleton: React.FC = () => (
  <div className="mt-6 flex animate-pulse justify-between rounded-2xl bg-text2 py-4">
    <div className="m-auto w-[35%] rounded-full border-2 border-gray-500 bg-white py-2">
      <div className="mx-auto h-5 w-24 rounded bg-gray-200"></div>
      <div className="mx-auto mt-2 h-4 w-20 rounded bg-gray-200"></div>
    </div>
    <div className="m-auto w-[35%] rounded-full border-2 border-gray-500 bg-white py-2">
      <div className="mx-auto h-5 w-24 rounded bg-gray-200"></div>
      <div className="mx-auto mt-2 h-4 w-20 rounded bg-gray-200"></div>
    </div>
  </div>
);

const TrackerSkeleton: React.FC = () => (
  <div className="mt-8 animate-pulse">
    <div className="mb-4">
      <div className="h-6 w-48 rounded bg-gray-200"></div>
      <div className="mt-2 h-4 w-72 rounded bg-gray-200"></div>
    </div>
    <div className="space-y-8">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="h-6 w-6 rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-5 w-36 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-48 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-32 rounded bg-gray-200"></div>
          </div>
          <div className="h-8 w-24 rounded-full bg-gray-200"></div>
        </div>
      ))}
    </div>
  </div>
);

const ViewContribution = () => {
  const location = useLocation();
  const contributionId = location?.state?.contributionId;
  const [isLoading, setIsLoading] = useState(true);
  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });
  const { formattedBalance: realBalance } = useUnPaidContribution();
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const walletData = useSelector(
    (state: any) => state?.transaction?.getWalletBalance,
  );
  const hasCards = walletData?.allCards?.length > 0;

  const dispatch: AppDispatch = useAppDispatch();
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("idle");
  const navigate = useNavigate();

  const handleDirectPayment = async (paymentType: "paystack") => {
    setIsProcessing(true);
    setVerificationStatus("verifying");
    setError(null);

    try {
      const paymentResponse = await dispatch(
        PayUnPaidContribution({
          contributionId,
          paymentType,
        }),
      ).unwrap();

      if (paymentResponse?.landing?.charge?.info?.data) {
        window.location.href =
          paymentResponse.landing?.charge?.info?.data?.authorization_url;
      } else {
        setVerificationStatus("error");
        setError("Failed to initiate payment. Please try again.");
      }
    } catch (error: any) {
      setVerificationStatus("error");
      setError(error || "An error occurred during payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (contributionId) {
      setIsLoading(true);
      dispatch(GetContributionDetailsById({ contributionId })).finally(() =>
        setIsLoading(false),
      );
    }
    return () => {
      dispatch(clearContributionDetails());
    };
  }, [dispatch, contributionId]);

  const { contributionDetails } = useSelector(
    (state: any) => state?.transaction,
  );

  const balanceInNaira = contributionDetails?.balance || 0;
  const formattedBalance = formatBalance(balanceInNaira);

  const handleBackClick = () => {
    navigate(-1);
  };

  const formatContributionDate = (dateString?: string) => {
    if (!dateString) return "Date not available";
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch {
      return "Invalid date";
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const ContributionTracker = () => {
    const { contributionDetails } = useSelector(
      (state: any) => state?.transaction,
    );

    if (!contributionDetails) return null;

    const {
      nextContributionDate,
      withdrawalDate,
      amount = 0,
      history = [],
    } = contributionDetails || {};

    const buildSteps = () => {
      const steps = [];

      const sortedHistory = [...(history || [])].sort(
        (a, b) => new Date(a?.Date).getTime() - new Date(b?.Date).getTime(),
      );

      if (sortedHistory.length > 0) {
        const firstTransaction = sortedHistory[0];
        steps.push({
          label: "Start Date",
          date: firstTransaction?.Date,
          amount: firstTransaction?.amount,
          type: firstTransaction?.type,
          balance: firstTransaction?.balance,
          description: "Start of regular contributions",
          status: firstTransaction?.status,
          reference: firstTransaction?.reference,
        });

        sortedHistory.slice(1).forEach((transaction) => {
          const isDebitSuccess =
            transaction?.type?.toLowerCase() === "debit" &&
            transaction?.status?.toLowerCase() === "success";

          steps.push({
            label: isDebitSuccess
              ? "Cash Transfer to Chain Co-op Wallet"
              : "Cash Transfer from Savings Account",
            date: transaction?.Date,
            amount: transaction?.amount,
            type: transaction?.type,
            balance: transaction?.balance,
            description: isDebitSuccess
              ? "Transfer to Chain Co-op Wallet"
              : "Cash Transfer from Savings Bank Account",
            status: transaction?.status,
            reference: transaction?.reference,
          });
        });
      }

      if (nextContributionDate) {
        steps.push({
          label: "Next Contribution",
          date: nextContributionDate,
          amount: amount,
          type: "Credit",
          balance: null,
          description: "Cash Transfer from Savings Bank Account",
          status: "Pending",
        });
      }

      return steps;
    };

    const getStatusStyle = (status?: string) => {
      switch (status?.toLowerCase()) {
        case "completed":
          return "bg-text2 font-semibold shadow-lg text-white";
        case "success":
          return "bg-[#4CAF50] font-semibold shadow-lg text-white";
        case "pending":
          return "bg-[#B8B4B4] font-semibold shadow-lg text-white";
        case "unpaid":
          return "bg-[#EC5246] font-semibold shadow-lg text-white";
        default:
          return "bg-gray-200 text-gray-600";
      }
    };

    const formatSafeDateTime = (dateString?: string) => {
      try {
        if (!dateString) throw new Error("No date provided");
        return format(parseISO(dateString), "EEEE: dd/MM/yyyy | HH:mm");
      } catch {
        return "Date unavailable";
      }
    };

    const isStepActive = (status?: string) => {
      return (
        status?.toLowerCase() === "completed" ||
        status?.toLowerCase() === "success"
      );
    };

    const formatAmount = (amount?: number, type?: string) => {
      const formattedAmount = amount?.toLocaleString() || "0";
      const isDebit = type?.toLowerCase() === "debit";
      return (
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-600">
            {isDebit ? "Debit Amount:" : "Credit Amount:"}
          </span>
          <span
            className={`text-sm font-semibold ${
              isDebit ? "text-red-500" : "text-[#61E532]"
            }`}
          >
            {isDebit ? "- " : "+ "}NGN {formattedAmount}
          </span>
        </div>
      );
    };

    const isWithdrawalDatePassed = withdrawalDate
      ? new Date(withdrawalDate) <= new Date()
      : false;

    const steps = buildSteps();

    if (isLoading) {
      return <TrackerSkeleton />;
    }

    return (
      <section className="mt-[1em] font-sans">
        <div className="mb-4 flex flex-col gap-3 whitespace-nowrap">
          <p className="text-lg font-bold">Transaction History</p>
          <p>Effortlessly manage and monitor your financial commitment</p>
          {isWithdrawalDatePassed && (
            <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
              Withdrawal date has been reached. You can now withdraw your funds.
            </div>
          )}
        </div>
        <div className="mb-2 flex justify-between gap-3 whitespace-nowrap">
          <p className="text-lg font-medium">Monthly Contribution</p>
          <p className="font-medium">Status</p>
        </div>
        <Box sx={{ maxWidth: "100%", marginTop: "1.5em" }}>
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index} active={isStepActive(step?.status)}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-iconContainer": {
                      paddingRight: "1rem",
                      "& .MuiStepIcon-root": {
                        color: isStepActive(step?.status)
                          ? "#430280"
                          : "#9CA3AF",
                      },
                    },
                  }}
                >
                  <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:gap-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-semibold">{step?.label}</p>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col gap-2">
                          <p className="whitespace-nowrap font-medium text-gray-600">
                            {formatSafeDateTime(step?.date)}
                          </p>
                          {formatAmount(step?.amount, step?.type)}
                        </div>
                        <div className="flex flex-col gap-1">
                          {step.balance !== null && (
                            <p className="whitespace-nowrap font-medium text-gray-600">
                              Current Balance:{" "}
                              <span className="font-semibold text-text2">
                                NGN {step?.balance?.toLocaleString()}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="self-start sm:ml-2 sm:self-center">
                      <div
                        className={`w-[8em] whitespace-nowrap rounded-full px-5 py-2 text-center text-sm shadow-lg ${getStatusStyle(
                          step?.status,
                        )}`}
                      >
                        {step?.status}
                      </div>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </section>
    );
  };

  if (isLoading) {
    return (
      <main className="pb-[1.5em] font-sans">
        <header className="sm:mt-[0] lg:mt-[2em]">
          <DashboardHeader className="flex items-center justify-center">
            Loading Contribution Details...
          </DashboardHeader>
        </header>
        <section className="sm:px-[1.5em] lg:mx-auto lg:w-[33em] lg:px-[0]">
          <DetailsSkeleton />
          <StatsSkeleton />
          <TrackerSkeleton />
        </section>
      </main>
    );
  }

  return (
    <main className="pb-[1.5em] font-sans">
      <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
          {contributionDetails?.contributionPlan} Contribution Plan
        </DashboardHeader>
      </header>
      <header className="mx-auto flex w-full max-w-md items-center justify-between gap-8 p-4">
        <div className="left-0 ml-4">
          <IoIosArrowBack
            onClick={handleBackClick}
            className="cursor-pointer"
            size={30}
          />
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold">
            {contributionDetails?.savingsCategory}
          </h1>
        </div>
      </header>
      <section className="sm:px-[1.5em] lg:mx-auto lg:w-[33em] lg:px-[0]">
        <article className="text-center text-text4">
          <div className="rounded-3xl py-[2em] shadow-md">
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
          </div>
          <section>
            <div className="mt-[1.5em] flex justify-between rounded-2xl bg-text2 py-[1em]">
              <div className="m-auto flex w-[35%] flex-col items-center rounded-full border-2 border-gray-500 bg-white py-2 ">
                <p className="font-semibold text-gray-600 ">Unpaid Balance</p>
                <p className="font-medium text-gray-400">{realBalance}</p>
              </div>

              <div className="m-auto flex w-[35%] flex-col items-center rounded-full border-2 border-gray-500 bg-white py-2">
                <p className="font-semibold">
                  {formatContributionDate(contributionDetails?.withdrawalDate)}
                </p>
                <p className="font-medium">Withdrawal Day</p>
              </div>
            </div>
          </section>
          <hr className="mt-[2em]" />
          <section className="mb-[2em] mt-[2em]">
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="whitespace-nowrap rounded-full border-2 border-gray-200 bg-inherit text-lg font-semibold shadow-lg sm:px-[1em] sm:py-[5px] lg:px-[3em] lg:py-[13px]"
              >
                Add Money
              </motion.button>

              <Link
                to="/dashboard/contribution/withdraw_contribution"
                state={{ contributionId: contributionId }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="whitespace-nowrap rounded-full border-2 border-gray-200 bg-inherit text-lg font-semibold shadow-lg sm:px-[1em] sm:py-[5px] lg:px-[3em] lg:py-[13px]"
                >
                  Withdraw
                </motion.button>
              </Link>
            </div>
          </section>
          <span className="mt-[1em] font-semibold text-gray-500">
            Next Contribution is:{" "}
            {formatContributionDate(contributionDetails?.nextContributionDate)}
          </span>
          <hr className="mt-[2em] w-full" />
        </article>
        <ContributionTracker />
      </section>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="flex flex-col bg-[#ECE6F2] py-[2em]"
      >
        {hasCards ? (
          <PaymentWithCard contributionData={contributionId} />
        ) : (
          <PayWithPaystack
            onSelect={handleDirectPayment}
            isProcessing={isProcessing}
          />
        )}
      </Modal>
    </main>
  );
};

export default ViewContribution;
