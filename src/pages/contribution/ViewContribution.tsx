import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { AppDispatch } from "../../shared/redux/store";
import {
  clearContributionDetails,
  GetContributionDetailsById,
  GetWalletCard,
  PayUnPaidContribution,
} from "../../shared/redux/slices/transaction.slices";
import {
  calculateSavingsDuration,
  formatBalance,
} from "../../shared/utils/format";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import {
  DetailsSkeleton,
  StatsSkeleton,
  TrackerSkeleton,
} from "../../components/common/Loading";
import { ContributionTracker } from "../../components/dashboard/contribution/contributionTracker/ContributionTracker";
import PaymentWithCard from "../../components/dashboard/contribution/unpaidContribution/PaymentWithCard";
import PayWithPaystack from "../../components/dashboard/contribution/unpaidContribution/PayWithPaystack";
import { Button, Typography } from "@material-tailwind/react";
import { RootState } from "../../shared/redux/rootReducer";
import BalanceDisplay from "../../components/dashboard/contribution/balanceDisplay/balanceDisplay";
import { Alert } from "@mui/material";
import { GetContributionDetailsByIdResponse } from "../../shared/types";
import { useContribution } from "../../shared/Hooks/useUserProfile";
import { toast } from "react-toastify";

interface WalletCard {
  cards: Array<unknown>;
}

const ViewContribution = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { contributionDetails, walletCard, isLoading, error } = useSelector(
    (state: RootState) => state.transaction,
  ) as {
    contributionDetails: GetContributionDetailsByIdResponse | null;
    walletCard: WalletCard | null;
    isLoading: boolean;
    error: string | null;
  };

  const contributionId = useMemo(
    () => location?.state?.contributionId,
    [location],
  );

  const { unpaidBalance } = useContribution({
    page: 1,
    limit: 10,
    search: "",
    filter: "",
    contributionId,
  });

  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 12;

  const realBalance = unpaidBalance
    ? formatBalance(unpaidBalance.totalAmount)
    : "₦0.00";

  const isOneTimeContribution =
    contributionDetails?.contributionType?.toLowerCase() === "one-time";

  const hasUnpaidBalance = unpaidBalance && unpaidBalance.totalAmount > 0;

  useEffect(() => {
    if (!contributionId) {
      navigate("/dashboard/contribution");
      return;
    }

    const fetchInitialData = async () => {
      if (!walletCard?.cards?.length) {
        dispatch(GetWalletCard());
      }

      const response: any = await dispatch(
        GetContributionDetailsById({
          contributionId,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        }),
      );
      const historyLength = response.payload?.history?.length || 0;
      setHasMore(historyLength === ITEMS_PER_PAGE);
    };

    fetchInitialData();

    return () => {
      dispatch(clearContributionDetails());
    };
  }, [dispatch, contributionId, currentPage, navigate]);

  const formatCurrency = (amount: number | undefined) => {
    return amount ? formatBalance(amount) : "₦0.00";
  };

  const getFirstDepositAmount = () => {
    if (contributionDetails?.history?.length) {
      const firstDeposit = contributionDetails.history[0];
      return `${contributionDetails.currency === "NGN" ? "₦" : ""}${firstDeposit.amount.toLocaleString()}`;
    }
    return "N/A";
  };

  const formatContributionDate = (dateString?: string) => {
    if (!dateString) return "Date not available";
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch {
      return "Invalid date";
    }
  };

  const handleDirectPayment = async (paymentType: "paystack") => {
    setIsProcessing(true);
    setLocalError(null);

    try {
      const paymentResponse = await dispatch(
        PayUnPaidContribution({
          contributionId,
          paymentType,
        }),
      ).unwrap();
      // if (paymentResponse?.charge?.info?.data?.authorization_url) {
      //   window.location.href =
      //     paymentResponse.charge.info.data.authorization_url;
      // } else {
      //   setLocalError("Failed to initiate payment. Please try again.");
      // }
    } catch (err: any) {
      setLocalError(
        err.message || "An error occurred during payment. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setLocalError(null);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleOpenModal = () => {
    if (!hasUnpaidBalance) {
      toast.info("You have not missed any contribution.");
      return;
    }
    setIsModalOpen(true);
  };

  if (isLoading && !contributionDetails) {
    return (
      <main className="pb-6">
        <DashboardHeader className="mt-0 flex items-center justify-center lg:mt-8">
          Loading Contribution Details...
        </DashboardHeader>
        <section className="px-6 lg:mx-auto lg:max-w-2xl">
          <DetailsSkeleton />
          <StatsSkeleton />
          <TrackerSkeleton />
        </section>
      </main>
    );
  }

  if (error && !contributionDetails) {
    return (
      <main className="pb-6">
        <DashboardHeader className="mt-0 flex items-center justify-center lg:mt-8">
          Contribution Details
        </DashboardHeader>
        <section className="px-6">
          <div className="mt-6">
            <Alert severity="error">{error}</Alert>
            <Button
              variant="text"
              onClick={handleBackClick}
              className="mt-4 w-full bg-text2 py-3 text-white"
            >
              Go Back
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pb-6">
      <header className="mt-0 lg:mt-8">
        <DashboardHeader className="flex items-center justify-center">
          {contributionDetails?.history[0]?.savingsType || "Savings"} Savings (
          {contributionDetails?.contributionPlan ||
            contributionDetails?.contributionType}
          )
        </DashboardHeader>
      </header>

      <section className="px-2 lg:mx-auto lg:max-w-2xl">
        <header className="flex items-center justify-between py-4">
          <IoIosArrowBack
            onClick={handleBackClick}
            className="cursor-pointer"
            size={30}
          />
          <h1 className="flex-1 truncate text-center text-xl font-bold">
            {contributionDetails?.savingsCategory || "Contribution"}{" "}
            <span className="ml-2 font-medium text-gray-500">
              {contributionDetails?.currency === "NGN"
                ? "(Naira)"
                : contributionDetails?.currency || "Savings"}
            </span>
          </h1>
          <div className="w-8" />
        </header>

        <article className="text-center">
          <div className="rounded-3xl border-2 border-gray-200 bg-white p-12 shadow-md">
            <BalanceDisplay
              title="Contribution Balance"
              balance={contributionDetails?.balance}
              isLoading={isLoading}
              isVisible={isContributionVisible}
              onToggle={(newVisibility) => {
                setIsContributionVisible(newVisibility);
                sessionStorage.setItem(
                  "contributionBalanceVisible",
                  newVisibility.toString(),
                );
              }}
              formatCurrency={formatCurrency}
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-text2 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full flex-col items-center justify-center rounded-full border-2 border-gray-500 bg-white px-6 py-3 lg:w-[35%]">
              <p className="w-full text-center font-semibold text-gray-600">
                {contributionDetails?.history[0]?.savingsType === "Strict"
                  ? "Fund Lock"
                  : "Unpaid Balance"}
              </p>
              <p
                className={`w-full text-center font-medium text-gray-400 ${
                  contributionDetails?.history[0]?.savingsType === "Strict"
                    ? "invisible"
                    : ""
                }`}
              >
                {realBalance}
              </p>
            </div>
            <div className="flex w-full flex-col items-center rounded-full border-2 border-gray-500 bg-white px-6 py-3 lg:w-[35%]">
              <p className="font-medium">Withdrawal Day</p>
              <p className="font-semibold">
                {formatContributionDate(contributionDetails?.withdrawalDate)}
              </p>
            </div>
          </div>

          <hr className="my-8" />

          <div className="flex justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenModal}
              className="rounded-full border-2 border-gray-200 bg-inherit px-6 py-2 text-lg font-semibold shadow-lg"
            >
              Add Money
            </motion.button>
            <Link
              to="/dashboard/contribution/withdraw_contribution"
              state={{ contributionId }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border-2 border-gray-200 bg-inherit px-6 py-2 text-lg font-semibold shadow-lg"
              >
                Withdraw
              </motion.button>
            </Link>
          </div>

          {!isOneTimeContribution && (
            <Typography className="mt-4 font-semibold text-gray-600">
              Next Contribution:{" "}
              {formatContributionDate(
                contributionDetails?.nextContributionDate,
              )}
            </Typography>
          )}

          <hr className="my-8" />
        </article>

        <section className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-xl bg-Dh p-5 md:flex-col md:items-start">
            <Typography className="text-sm font-semibold text-gray-600 md:flex-col md:text-lg">
              Deposit Amount
            </Typography>
            <Typography className="mt-2 text-sm font-semibold md:text-lg">
              {getFirstDepositAmount()}
            </Typography>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-Dh p-5 md:flex-col md:items-start">
            <Typography className="text-sm font-semibold text-gray-600 md:text-lg">
              Savings Duration
            </Typography>
            <Typography className="mt-2 text-sm font-semibold md:text-lg">
              {calculateSavingsDuration(
                contributionDetails?.startDate,
                contributionDetails?.withdrawalDate,
              )}
            </Typography>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-Dh p-5 md:flex-col md:items-start">
            <Typography className="text-sm font-semibold text-gray-600 md:text-lg">
              Start Date
            </Typography>
            <Typography className="mt-2 text-sm font-semibold md:text-lg">
              {formatContributionDate(contributionDetails?.startDate)}
            </Typography>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-Dh p-5 md:flex-col md:items-start">
            <Typography className="text-sm font-semibold text-gray-600 md:text-lg">
              End Date
            </Typography>
            <Typography className="mt-2 text-sm font-semibold md:text-lg">
              {formatContributionDate(contributionDetails?.withdrawalDate)}
            </Typography>
          </div>
        </section>

        <ContributionTracker
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          hasMore={hasMore}
        />
      </section>

      {isModalOpen &&
        (walletCard?.cards?.length ? (
          <PaymentWithCard
            onClose={handleModalClose}
            contributionData={contributionId}
            isOpen={isModalOpen}
            handler={handleModalClose}
          />
        ) : (
          <PayWithPaystack
            onSelect={handleDirectPayment}
            isProcessing={isProcessing}
            isOpen={isModalOpen}
            handler={handleModalClose}
            error={localError || ""}
            handleCloseError={() => setLocalError(null)}
          />
        ))}
    </main>
  );
};

export default ViewContribution;
