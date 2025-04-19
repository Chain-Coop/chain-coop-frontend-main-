import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCryptoWallet } from "../../../../shared/Hooks/useBalance";
import { useAllUserPools } from "../../../../shared/Hooks/useUserProfile";
import ToggleButton from "../../../../shared/utils/ToggleButton";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import { toast } from "react-toastify";
import { Typography, Button } from "@material-tailwind/react";
import { UpdateUserPool } from "../../../../shared/redux/slices/web3.slices";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { ContributionListSkeleton } from "../../../../components/common/Loading";
import { SavingsPlan } from "../../../../components/dashboard/contribution/modals/SavingsPlan";
import { Flexibile, Lock, StrictLocak } from "../../../../Assets/svg";
import FundSavingsModal from "../../../../components/dashboard/contribution/modals/FundContribution";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";

const CryptoSavings: React.FC = () => {
  const navigate = useNavigate();
  const {
    Balance,
    loading: cryptoBalanceLoading,
    isWalletVisible,
    setIsWalletVisible,
  } = useCryptoWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatePayment, setUpdatePayment] = useState(false);
  const [savingsType, setSavingsType] = useState<"naira" | "crypto">("crypto");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { userPools = [], loading: poolsLoading } = useAllUserPools() || {};
  const [selectedPool, setSelectedPool] = useState<{
    poolId_bytes: string;
    tokenAddressToSaveWith: string;
  } | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [selectedContribution, setSelectedContribution] = useState<{
    poolIndex: string;
    tokenToSaveWith: string;
  } | null>(null);

  const handleOpenFundModal = (pool: any) => {
    setSelectedContribution({
      poolIndex: pool.poolIndex,
      tokenToSaveWith: pool.tokenToSaveWith,
    });
    setIsFundModalOpen(true);
  };

  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  const [contributionType, setContributionType] = useState<
    "auto" | "one-time" | null
  >(null);

  const [hoveredSavingsType, setHoveredSavingsType] = useState<string | null>(
    null,
  );

  const formatDuration = (durationInDays: any, startDateTimestamp: any) => {
    if (!durationInDays || !startDateTimestamp) {
      return "Duration info missing";
    }

    try {
      const durationDays = parseInt(durationInDays);
      const startDateSeconds = parseInt(startDateTimestamp);

      if (
        isNaN(durationDays) ||
        isNaN(startDateSeconds) ||
        durationDays <= 0 ||
        startDateSeconds <= 0
      ) {
        return "Invalid data";
      }

      const secondsPerDay = 24 * 60 * 60;
      const endDateSeconds = startDateSeconds + durationDays * secondsPerDay;

      const currentTimestampSeconds = Math.floor(Date.now() / 1000);

      const remainingSeconds = endDateSeconds - currentTimestampSeconds;

      if (remainingSeconds <= 0) {
        return "Pool closed";
      }

      const remainingDays = Math.ceil(remainingSeconds / secondsPerDay);

      return `Ends in ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
    } catch (error) {
      console.error("Error calculating duration:", error);
      return "Error calculating";
    }
  };
  const handleSavingsTypeChange = (type: "naira" | "crypto") => {
    setSavingsType(type);
    if (type === "naira") {
      navigate("/dashboard/contribution");
    }
    setIsModalOpen(false);
  };

  const handleContributionTypeChange = (type: "auto" | "one-time") => {
    setContributionType(type);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleUpdatePaymentModal = (pool?: any) => {
    if (pool) {
      setSelectedPool({
        poolId_bytes: pool.poolIndex,
        tokenAddressToSaveWith: pool.tokenToSaveWith,
      });
    } else {
      setSelectedPool(null);
    }
    setUpdatePayment(!updatePayment);
  };

  const fundContribution = () => {
    navigate("/dashboard/contribution/contribution_curency_type");
  };

  const SubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedPool ||
      !amount ||
      isNaN(Number(amount)) ||
      Number(amount) <= 0
    ) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    const body = {
      amount,
      poolId_bytes: selectedPool.poolId_bytes,
      tokenAddressToSaveWith: selectedPool.tokenAddressToSaveWith,
    };

    dispatch(UpdateUserPool(body))
      .unwrap()
      .then((response) => {
        setLoading(false);
        toast.success("Payment Updated Successfully");
        toggleUpdatePaymentModal();
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error?.message || "Failed to update payment");
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    userPools?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((userPools?.length || 0) / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full "
    >
      <DashboardHeader className="flex items-center justify-center text-2xl md:text-3xl lg:mt-[2em] lg:text-xl">
        Contribution Plan
      </DashboardHeader>

      <main>
        <section>
          <article className="text-center text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-3xl border-[2px] border-gray-200 bg-white p-6 shadow-md"
            >
              <div className="mb-4 flex justify-end">
                <button
                  onClick={toggleModal}
                  className="text-md flex transform  items-center gap-2 rounded-lg border-[3px] border-gray-200 bg-[#E3D9E6] px-3 py-2 font-semibold normal-case text-text2 transition-all duration-300
                  hover:scale-105 active:scale-95"
                >
                  Crypto Savings
                  <IoIosArrowDown />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <p className="text-xs font-medium sm:text-sm lg:text-base">
                  Total Contribution Balance
                </p>
                <ToggleButton
                  isVisible={isContributionVisible}
                  onToggle={(newVisibility) => {
                    setIsWalletVisible(newVisibility);
                    setIsContributionVisible(newVisibility);
                    sessionStorage.setItem(
                      "contributionBalanceVisible",
                      newVisibility.toString(),
                    );
                  }}
                />
              </div>

              <div className="mt-4 w-full rounded-md sm:mt-6">
                {cryptoBalanceLoading ? (
                  <div className="h-6 animate-pulse rounded bg-gray-200 sm:h-8"></div>
                ) : isContributionVisible ? (
                  <p className="text-xl font-bold lg:text-2xl">${Balance}</p>
                ) : (
                  <p className="text-lg font-bold sm:text-xl">*********</p>
                )}
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
              </div>
            </motion.div>

            {/* Contribution Type Selection */}
            <section className="py-8">
              <div className="flex justify-between">
                {/* Auto Savings Button */}
                <Button
                  variant="text"
                  onClick={() => handleContributionTypeChange("auto")}
                  className={`flex w-fit items-center px-2 py-3 text-center normal-case transition-all duration-300 ${
                    contributionType === "auto"
                      ? "bg-text2 text-white hover:bg-text2"
                      : "border border-gray-500 bg-inherit text-black hover:shadow-lg"
                  }`}
                >
                  <Typography
                    className={`text-sm font-semibold ${
                      contributionType === "auto" ? "text-white" : "text-black"
                    }`}
                  >
                    Auto Savings
                  </Typography>
                </Button>

                {/* One-Time Savings Button */}
                <Button
                  variant="text"
                  onClick={() => handleContributionTypeChange("one-time")}
                  className={`relative flex w-fit items-center px-2 py-3 text-center normal-case transition-all duration-300 hover:shadow-lg sm:px-3 md:px-3.5 lg:px-4 xl:px-5 ${
                    contributionType === "one-time"
                      ? "bg-text2 text-white"
                      : "border border-gray-500 bg-inherit text-black"
                  }`}
                >
                  <Typography
                    className={`text-sm font-semibold ${
                      contributionType === "one-time"
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    One-Time Savings
                  </Typography>
                </Button>
              </div>
            </section>

            {/* Savings Options */}
            {(contributionType === "auto" ||
              contributionType === "one-time") && (
              <section className="mb-8">
                <Typography className="mb-4 text-left font-medium">
                  Choose savings type
                </Typography>

                <div className="flex flex-col gap-4">
                  <Link
                    to={
                      contributionType === "auto"
                        ? "/dashboard/contribution/flexible/crypto_purpose"
                        : "/dashboard/contribution/one_time_plan/flexible/crypto_purpose"
                    }
                    state={{
                      lockedType: 0,
                      contributionType: contributionType,
                    }}
                    className="w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
                      onMouseEnter={() => setHoveredSavingsType("Flexible")}
                      onMouseLeave={() => setHoveredSavingsType(null)}
                    >
                      <Flexibile />
                      <Typography className="text-lg font-medium text-gray-800">
                        Flexible Savings
                      </Typography>
                      <div
                        className={`rounded border border-text2 px-8 py-2 text-sm font-medium
              transition-all duration-300 ease-in-out
              ${hoveredSavingsType === "Flexible" ? "scale-105 transform bg-text2 text-white shadow-md" : ""}
            `}
                      >
                        Select
                      </div>
                    </motion.div>
                  </Link>

                  {contributionType === "auto" && (
                    <Link
                      to="/dashboard/contribution/lock/crypto_purpose"
                      state={{ lockedType: 1, contributionType: "auto" }}
                      className="w-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
                        onMouseEnter={() => setHoveredSavingsType("Lock")}
                        onMouseLeave={() => setHoveredSavingsType(null)}
                      >
                        <Lock />
                        <Typography className="text-lg font-medium text-gray-800">
                          Lock Savings
                        </Typography>
                        <div
                          className={`rounded border border-text2 px-8 py-2 text-sm font-medium
                transition-all duration-300 ease-in-out
                ${hoveredSavingsType === "Lock" ? "scale-105 transform bg-text2 text-white shadow-md" : ""}
              `}
                        >
                          Select
                        </div>
                      </motion.div>
                    </Link>
                  )}

                  <Link
                    to={
                      contributionType === "auto"
                        ? "/dashboard/contribution/strict_lock/crypto_purpose"
                        : "/dashboard/contribution/one_time_plan/strict_lock/crypto_purpose"
                    }
                    state={{
                      lockedType: 2,
                      contributionType: contributionType,
                    }}
                    className="w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
                      onMouseEnter={() => setHoveredSavingsType("Strict")}
                      onMouseLeave={() => setHoveredSavingsType(null)}
                    >
                      <StrictLocak />
                      <Typography className="text-lg font-medium text-gray-800">
                        Strict Lock Savings
                      </Typography>
                      <div
                        className={`rounded border border-text2 px-8 py-2 text-sm font-medium
              transition-all duration-300 ease-in-out
              ${hoveredSavingsType === "Strict" ? "scale-105 transform bg-text2 text-white shadow-md" : ""}
            `}
                      >
                        Select
                      </div>
                    </motion.div>
                  </Link>
                </div>

                <hr className="mx-auto mt-8 w-full max-w-2xl" />
              </section>
            )}
          </article>
        </section>

        <section className="mt-6 w-full sm:mt-8 lg:mt-10">
          <header className="flex items-center justify-between">
            <h1 className="text-lg font-bold sm:text-xl lg:text-2xl">
              My Savings
            </h1>
            <input
              className="hidden rounded-lg border-2 border-[#F5F0F0] px-3 py-1 placeholder:text-sm md:px-5 md:py-3"
              type="text"
              placeholder="Search by categories"
            />
          </header>

          {poolsLoading ? (
            <ContributionListSkeleton />
          ) : userPools?.length > 0 ? (
            <div className="p3 mb-10 mt-4 flex h-auto flex-col gap-3 rounded-2xl bg-text2 px-3 py-5 text-center sm:mt-6 sm:gap-4 md:px-7 md:py-10">
              {/* Pagination UI */}
              {userPools.length > itemsPerPage && (
                <div className="mb-3 flex items-center justify-between px-4">
                  <span className="text-sm font-medium text-white md:text-base">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-2 font-semibold">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <IoIosArrowBack size={20} />
                    </button>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <IoIosArrowForward size={20} />
                    </button>
                  </div>
                </div>
              )}

              {currentItems.map((pools: any) => (
                <motion.div
                  key={pools.poolIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="mx-auto flex w-full max-w-3xl cursor-pointer flex-col gap-2 rounded-xl border border-gray-300 bg-white p-3 transition-all hover:bg-gray-50 sm:gap-3 sm:p-4 md:rounded-3xl"
                >
                  <div className="flex justify-between text-xs font-medium text-gray-500 sm:text-sm">
                    <p>Savings Token: {pools?.symbol}</p>
                    <p>Target Amount: ${pools?.goalAmount}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-bold">{pools?.Reason}</p>
                    <p className="text-sm font-semibold">
                      Deposited Amount:{" "}
                      <span className="font-bold text-text2">
                        ${pools?.amountSaved}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Duration:{" "}
                      <span className="text-gray-500">
                        {formatDuration(pools?.Duration, pools?.startDate)}
                      </span>
                    </p>
                    <p className="text-xs font-semibold sm:text-sm">
                      Current Balance:{" "}
                      <span className="text-gray-800">
                        ${pools?.amountSaved}
                      </span>
                    </p>
                  </div>

                  <hr className="my-1" />

                  <div className="flex justify-between">
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={() => handleOpenFundModal(pools)}
                        className="rounded-lg bg-[#ECE6F2] px-2 py-1 text-xs font-semibold text-text2 transition-all hover:scale-105 active:scale-95 sm:px-3 sm:text-sm"
                      >
                        Update
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        navigate(
                          "/dashboard/contribution/crypto_contribution_details",
                          {
                            state: pools,
                          },
                        )
                      }
                      className="rounded-lg bg-[#ECE6F2] px-2 py-1 text-xs font-semibold text-text2 transition-all hover:scale-105 active:scale-95 sm:px-3 sm:text-sm"
                    >
                      Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 mt-4 flex h-[12em] w-full flex-col items-center justify-center gap-4 rounded-lg bg-text2 p-6 text-center md:mt-6 md:p-8"
            >
              <Typography
                variant="h2"
                className="text-xl font-bold text-how1 md:text-2xl"
              >
                No Savings Yet
              </Typography>
            </motion.div>
          )}
        </section>
      </main>

      <SavingsPlan
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        savingsType={savingsType}
        onSavingsTypeChange={handleSavingsTypeChange}
      />

      {selectedContribution && (
        <FundSavingsModal
          isOpen={isFundModalOpen}
          onClose={() => setIsFundModalOpen(false)}
          contribution={selectedContribution}
        />
      )}
    </motion.main>
  );
};

export default CryptoSavings;
