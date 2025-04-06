import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useUserCard } from "../../shared/Hooks/useUserProfile";
import { useUnPaidContribution } from "../../shared/Hooks/useBalance";
import { AppDispatch } from "../../shared/redux/store";
import {
  clearContributionDetails,
  GetContributionDetailsById,
  GetWalletCard,
  PayUnPaidContribution,
} from "../../shared/redux/slices/transaction.slices";
import { formatBalance, isDateValid } from "../../shared/utils/format";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import {
  DetailsSkeleton,
  StatsSkeleton,
  TrackerSkeleton,
} from "../../components/common/Loading";
import ToggleButton from "../../shared/utils/ToggleButton";
import { ContributionTracker } from "../../components/dashboard/contribution/contributionTracker/ContributionTracker";
import { useAppDispatch } from "../../shared/redux/reduxHooks";
import PaymentWithCard from "../../components/dashboard/contribution/unpaidContribution/PaymentWithCard";
import PayWithPaystack from "../../components/dashboard/contribution/unpaidContribution/PayWithPaystack";

const ViewContribution = () => {
  const location = useLocation();
  const contributionId = location?.state?.contributionId;
  const { useWalletCards } = useUserCard();
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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 12;
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetWalletCard());
  }, [dispatch]);

  const hasCards = useWalletCards?.cards ?? [];

  const navigate = useNavigate();

  const handleModalClose = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleDirectPayment = async (paymentType: "paystack") => {
    setIsProcessing(true);
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
        setError("Failed to initiate payment. Please try again.");
      }
    } catch (error: any) {
      setError(error || "An error occurred during payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (contributionId) {
      setIsLoading(true);
      dispatch(
        GetContributionDetailsById({
          contributionId,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        }),
      )
        .then((response) => {
          const historyLength = response.payload?.history?.length || 0;
          setHasMore(historyLength === ITEMS_PER_PAGE);
        })
        .finally(() => setIsLoading(false));
    }
    return () => {
      dispatch(clearContributionDetails());
    };
  }, [dispatch, contributionId, currentPage]);

  const { contributionDetails } = useSelector(
    (state: any) => state?.transaction,
  );

  const balanceInNaira = contributionDetails?.balance || 0;
  const formattedBalance = formatBalance(balanceInNaira);

  const handleBackClick = () => {
    navigate(-1);
  };

  const formatContributionDate = (dateString?: string) => {
    if (!dateString)
      return <p className="whitespace-nowrap text-sm">Date not available</p>;
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch {
      return "Invalid date";
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  if (isLoading) {
    return (
      <main className="pb-[1.5em] ">
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
    <main className="pb-[1.5em] ">
      <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
          {contributionDetails?.history[0]?.savingsType} Savings ({""}
          {contributionDetails?.contributionPlan}
          {""})
        </DashboardHeader>
      </header>

      <section>
        <header className="flex w-full items-center justify-between p-4">
          <div className="flex-shrink-0">
            <IoIosArrowBack
              onClick={handleBackClick}
              className="cursor-pointer"
              size={30}
            />
          </div>
          <div className="flex-1 text-center">
            <h1 className="truncate text-xl font-bold">
              {contributionDetails?.savingsCategory}
            </h1>
          </div>
          <div className="w-8 flex-shrink-0"></div>{" "}
        </header>

        <section className="">
          <article className="text-center text-text4">
            <div className="flex justify-between">
              <h1 className="text-lg font-bold text-gray-500">
                {contributionDetails?.currency
                  ? `${contributionDetails.currency} Savings`
                  : "Savings"}
              </h1>
            </div>

            <div className="rounded-3xl border-[2px] border-gray-200 bg-white p-6 shadow-md">
              <div className="flex justify-center gap-4 ">
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
              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-text2 p-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex w-full flex-col items-center rounded-full border-2 border-gray-500 bg-white px-[1.5em] py-3 lg:w-[35%]">
                  <p className="font-semibold text-gray-600">Unpaid Balance</p>
                  <p className="font-medium text-gray-400">{realBalance}</p>
                </div>

                <div className="flex w-full flex-col items-center rounded-full border-2 border-gray-500 bg-white px-[1.5em] py-3  lg:w-[35%]">
                  <p className="font-semibold">
                    {formatContributionDate(
                      contributionDetails?.withdrawalDate,
                    )}
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
                  className="whitespace-nowrap rounded-full border-2 border-gray-200 bg-inherit px-[1.5em] py-[5px] text-lg font-semibold shadow-lg lg:px-[3em] lg:py-[13px]"
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
                    className="whitespace-nowrap rounded-full border-2 border-gray-200 bg-inherit px-[1.5em] py-[5px] text-lg font-semibold shadow-lg lg:px-[3em] lg:py-[13px]"
                  >
                    Withdraw
                  </motion.button>
                </Link>
              </div>
            </section>
            <span className="mt-[1em] font-semibold text-gray-500">
              {isDateValid(contributionDetails?.nextContributionDate) && (
                <span className="mt-[1em] font-semibold text-gray-500">
                  Next Contribution is:{" "}
                  {formatContributionDate(
                    contributionDetails?.nextContributionDate,
                  )}
                </span>
              )}
            </span>
            <hr className="mt-[2em] w-full" />
          </article>
          <ContributionTracker
            isLoading={isLoading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasMore={hasMore}
          />
        </section>
      </section>

      {isModalOpen &&
        (hasCards.length > 0 ? (
          <PaymentWithCard
            onClose={handleModalClose}
            contributionData={contributionId}
            isOpen={isModalOpen}
            handler={() => setIsModalOpen(!isModalOpen)}
          />
        ) : (
          <PayWithPaystack
            onSelect={handleDirectPayment}
            isProcessing={isProcessing}
            isOpen={isModalOpen}
            handler={() => setIsModalOpen(!isModalOpen)}
            error={error ?? undefined}
            handleCloseError={handleCloseError}
          />
        ))}
    </main>
  );
};

export default ViewContribution;
