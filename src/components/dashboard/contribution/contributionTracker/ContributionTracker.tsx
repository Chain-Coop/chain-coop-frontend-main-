import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
} from "@material-tailwind/react";
import { TrackerSkeleton } from "../../../common/Loading";

interface ContributionTrackerProps {
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hasMore: boolean;
}

const isDateValid = (dateString?: string) => {
  if (!dateString) return false;
  try {
    const date = new Date(dateString);
    const currentDate = new Date();
    return date > currentDate;
  } catch {
    return false;
  }
};

export const ContributionTracker: React.FC<ContributionTrackerProps> = ({
  isLoading,
  currentPage,
  setCurrentPage,
  hasMore,
}) => {
  const { contributionDetails } = useSelector(
    (state: any) => state?.transaction,
  );

  if (!contributionDetails) return null;

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const {
    nextContributionDate,
    withdrawalDate,
    amount = 0,
    history = [],
  } = contributionDetails || {};

  const buildSteps = () => {
    const steps = [];
    const sortedHistory = [...(history || [])].sort(
      (a, b) => new Date(a?.Date)?.getTime() - new Date(b?.Date)?.getTime(),
    );

    const isOneTime =
      contributionDetails?.contributionType?.toLowerCase() === "one-time";

    if (sortedHistory?.length > 0) {
      const firstTransaction = sortedHistory[0];

      if (!isOneTime) {
        steps?.push({
          label: "Start Date",
          date: firstTransaction?.Date,
          amount: firstTransaction?.amount,
          type: firstTransaction?.type,
          balance: firstTransaction?.balance,
          description: "Start of regular contributions",
          status: firstTransaction?.status,
          reference: firstTransaction?.reference,
        });
      }

      const startIndex = isOneTime ? 0 : 1;
      sortedHistory?.slice(startIndex).forEach((transaction) => {
        const isDebitSuccess =
          transaction?.type?.toLowerCase() === "debit" &&
          transaction?.status?.toLowerCase() === "success";

        steps?.push({
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

    if (!isOneTime && isDateValid(nextContributionDate)) {
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
      <div className="flex items-start gap-2">
        <span className="whitespace-nowrap text-xs font-medium text-gray-600 sm:text-sm">
          {isDebit ? "Debit Amount:" : "Credit Amount:"}
        </span>
        <span
          className={`text-sm font-semibold ${isDebit ? "text-red-500" : "text-[#61E532]"} whitespace-nowrap`}
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
    <section className="mt-4 sm:mt-6">
      <div className="mb-4 space-y-1 sm:space-y-2">
        <p className="text-lg font-bold">Transaction History</p>
        <p className="text-xs sm:text-base">
          Effortlessly manage and monitor your financial commitment
        </p>
        {isWithdrawalDatePassed && (
          <div className="rounded-lg bg-green-100 p-2 text-xs text-green-700 sm:p-3 sm:text-base">
            Withdrawal date has been reached. You can now withdraw your funds.
          </div>
        )}
      </div>
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <p className="text-sm font-medium sm:text-lg">
          {contributionDetails?.contributionType?.toLowerCase() === "one-time"
            ? "One-Time Contribution"
            : `${contributionDetails?.contributionPlan} Contribution Plan`}
        </p>
        <p className="hidden text-sm font-medium sm:text-lg md:flex">Status</p>
      </div>

      <div className="w-full">
        <Timeline>
          {steps.map((step, index) => (
            <TimelineItem key={index}>
              {index !== steps.length - 1 && <TimelineConnector />}
              <TimelineHeader>
                <TimelineIcon
                  className={
                    isStepActive(step?.status) ? "bg-[#430280]" : "bg-[#9CA3AF]"
                  }
                />
                <div className="flex w-full flex-col space-y-2 sm:space-y-3">
                  <div className="flex items-start justify-between sm:items-center">
                    <p className="text-sm font-semibold sm:text-lg">
                      {step?.label}
                    </p>
                    <div
                      className={`inline-flex hidden min-w-[90px] items-center justify-center rounded-full px-3 py-1 text-xs sm:min-w-[120px] sm:px-4 sm:py-1.5 sm:text-sm md:flex ${getStatusStyle(
                        step?.status,
                      )}`}
                    >
                      {step?.status}
                    </div>
                  </div>
                </div>
              </TimelineHeader>
              <TimelineBody className="pb-6">
                <div className="ml-4 space-y-1 sm:space-y-2">
                  <p className="text-xs font-medium text-gray-600 sm:text-base">
                    {formatSafeDateTime(step?.date)}
                  </p>
                  {formatAmount(step?.amount, step?.type)}
                  {step.balance !== null && (
                    <p className="text-xs font-medium text-gray-600 sm:text-base">
                      Current Balance:{" "}
                      <span className="font-semibold text-text2">
                        NGN {step?.balance?.toLocaleString()}
                      </span>
                    </p>
                  )}
                </div>
              </TimelineBody>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex items-center rounded-full px-4 py-2 ${
            currentPage === 1
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-text2 text-white hover:bg-opacity-90"
          }`}
        >
          <IoIosArrowBack className="text-white" size={20} />
        </button>
        <span className="text-sm font-medium">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className={`flex items-center rounded-full px-4 py-2 ${
            !hasMore
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-text2 text-white hover:bg-opacity-90"
          }`}
        >
          <IoIosArrowForward className="text-white" size={20} />
        </button>
      </div>
    </section>
  );
};
