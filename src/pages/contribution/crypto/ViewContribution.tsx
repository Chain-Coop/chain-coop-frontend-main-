import React, { useState, useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import {
  DetailsSkeleton,
  StatsSkeleton,
  TrackerSkeleton,
} from "../../../components/common/Loading";
import ToggleButton from "../../../shared/utils/ToggleButton";
import { Typography } from "@material-tailwind/react";
import Naira from "../../../Assets/svg/dashboard/contribution/naira.svg";
import up from "../../../Assets/svg/dashboard/contribution/up.svg";
import FundSavingsModal from "../../../components/dashboard/contribution/modals/FundContribution";
import UpdateSavingsModal from "../../../components/dashboard/contribution/modals/UpdateContribution";
import EarlyWithdrawalModal from "../../../components/dashboard/contribution/modals/EarlyWithdrawal";
import TransactionHistory from "./TransactionHistory";
import { Pool } from "../../../shared/types/types";
import {
  format,
  parseISO,
  addDays,
  addWeeks,
  addMonths,
  isBefore,
  startOfDay,
  isAfter,
} from "date-fns";

const ViewCryptoContribution = () => {
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [isEarlyWithdrawalModalOpen, setIsEarlyWithdrawalModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const contribution = location.state as Pool | null;

  if (!contribution) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-gray-500">
          No contribution details available.
        </p>
      </main>
    );
  }

  const formatDate = (date: Date | null | string, time = false): string => {
    if (!date) return "--/--/----";
    try {
      const d = typeof date === "string" ? parseISO(date) : date;
      if (isNaN(d.getTime())) return "--/--/----";
      const formatString = time ? "MMM d, yyyy hh:mm a" : "yyyy-MM-dd";
      return format(d, formatString);
    } catch (error) {
      console.error("Error formatting date:", date, error);
      return "--/--/----";
    }
  };

  const calculateEndDate = (
    startDateISO: string | null,
    durationDays: number,
  ): Date | null => {
    if (!startDateISO || durationDays === undefined || durationDays === null) {
      return null;
    }
    try {
      const startDate = new Date(startDateISO);
      if (isNaN(startDate.getTime())) return null;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Number(durationDays));
      return endDate;
    } catch (error) {
      console.error(
        "Error calculating end date:",
        { startDateISO, durationDays },
        error,
      );
      return null;
    }
  };

  const endDate = calculateEndDate(
    contribution?.createdAt ?? null,
    contribution?.duration ?? 0,
  );

  const formattedEndDateString = formatDate(endDate); 

  const isStrictLock = contribution?.lockType === 2;
  const isLockSavings = contribution?.lockType === 1;

  const isEndDateReached = endDate ? isAfter(new Date(), endDate) : false;

  const disableStrictWithdrawal = isStrictLock && !isEndDateReached;

  const isWithdrawButtonDisabled = disableStrictWithdrawal || !contribution?.isActive;

  const nextChargeDate = useMemo(() => {
    if (
      contribution?.poolType !== "periodic" ||
      !contribution.createdAt ||
      !contribution.interval
    ) {
      return null;
    }

    try {
      const startDate = parseISO(contribution.createdAt);
      const now = new Date();
      let nextDate = startOfDay(startDate);

      let adder: (date: Date | number, amount: number) => Date;
      switch (contribution.interval.toLowerCase()) {
        case "daily":
          adder = addDays;
          break;
        case "weekly":
          adder = addWeeks;
          break;
        case "monthly":
          adder = addMonths;
          break;
        default:
          console.warn(`Unknown interval: ${contribution.interval}`);
          return null;
      }

      while (isBefore(nextDate, now)) {
        nextDate = adder(nextDate, 1);
      }

      if (isBefore(nextDate, startDate)) {
        return startDate;
      }

      return nextDate;
    } catch (error) {
      console.error("Error calculating next charge date:", error);
      return null;
    }
  }, [contribution?.poolType, contribution?.createdAt, contribution?.interval]);

  const handleOpenModalBasedOnType = () => {
    if (!contribution) return;

    if (contribution.poolType === "periodic") {
      setIsUpdateModalOpen(true);
    } else {
      setIsFundModalOpen(true);
    }
  };

  const handleWithdrawClick = () => {
    if (!contribution) return;

    const currentAmount = contribution.totalAmount || 0;

    if (isLockSavings && !isEndDateReached) {
      setIsEarlyWithdrawalModalOpen(true);
    } else {
     
      navigate(
        "/dashboard/contribution/withdraw_crypto_contribution",
        {
          state: {
            poolIndex: contribution.poolId,
            symbol: contribution.tokenSymbol,
            amount: currentAmount,
            poolType: contribution.poolType,
          },
        },
      );
    }
  };

  const handleEarlyWithdrawalConfirm = (amountAfterFee: number) => {
    setIsEarlyWithdrawalModalOpen(false);
    if (!contribution) return;

    navigate(
      "/dashboard/contribution/withdraw_crypto_contribution",
      {
        state: {
          poolIndex: contribution.poolId,
          symbol: contribution.tokenSymbol,
          amount: amountAfterFee,
        },
      },
    );
  };


  return (
    <main className="pb-[1.5em] ">
      <header className="relative sm:mt-[0] lg:mt-[2em]">
        <div className="absolute left-5 top-5 flex-shrink-0">
          <IoIosArrowBack
            className="cursor-pointer text-white"
            size={30}
            onClick={() => navigate(-1)}
          />
        </div>
        <DashboardHeader className="flex items-center justify-center">
          Savings Details
        </DashboardHeader>
      </header>

      <section>
        <section className="">
          <article className="text-center text-text4">
            <div className="mt-4 rounded-3xl border-[2px] border-gray-200 bg-white p-12 pb-5 shadow-md">
              <div className="flex justify-center gap-4 ">
                <p className="font-medium">Contribution balance</p>
                <div className="hidden">
                  <ToggleButton isVisible={true} onToggle={() => {}} />
                </div>
              </div>
              <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
                <p className="text-2xl font-bold text-text2 md:text-3xl">
                  $ {contribution.totalAmount || "*********"}
                </p>
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
              </div>

              <div className="mt-[1.5em] flex flex-col items-center justify-center gap-4 text-center text-text3">
                <p className="flex w-full items-center justify-center gap-1 rounded-lg border-[1px] border-dashed border-text2 py-4 text-sm font-bold text-text2 lg:w-[80%]">
                  <img src={Naira} alt="naira-symbol" />
                  Naira Equivalent: <span>NGN 8000</span>
                </p>
                <p className="hidden items-center justify-center gap-1.5 text-sm font-normal text-text1">
                  Current Interest rate{" "}
                  <span className="flex items-center gap-1.5 text-[#2EC046]">
                    <img src={up} alt="up-icon" /> 0.85%
                  </span>
                </p>
              </div>

              <section className="mt-5">
                <div className="flex justify-between gap-2 md:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!contribution.isActive}
                    className={`flex-1 whitespace-nowrap rounded-lg border-2 border-gray-200 bg-inherit bg-text2 px-[1.5em] py-[5px] text-lg font-semibold text-white shadow-lg lg:px-[3em] lg:py-[13px] ${
                      !contribution.isActive
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    onClick={handleOpenModalBasedOnType}
                  >
                    {contribution.poolType === "periodic" ? "Update" : "Fund"}
                  </motion.button>

                  {/* Withdraw Button - Updated onClick */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isWithdrawButtonDisabled}
                    onClick={handleWithdrawClick}
                    className={`flex-1 whitespace-nowrap rounded-lg border-2 border-gray-200 bg-inherit px-[1.5em] py-[5px] text-lg font-semibold shadow-lg lg:px-[3em] lg:py-[13px] ${
                      isWithdrawButtonDisabled
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    Withdraw
                  </motion.button>
                </div>
              </section>
            </div>
          </article>

          <section className="my-10 flex flex-col gap-2">
            <div className="flex items-start">
              <h2 className="text-2xl font-bold text-black">
                {contribution.reason}
              </h2>
            </div>

            <section className="flex w-full flex-col gap-2 md:flex-row md:gap-5">
              <div className="hidden items-center gap-1 md:gap-2">
                <h2 className="text-sm font-semibold text-gray-500">
                  Interest Rate:
                </h2>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <h2 className="text-sm font-semibold text-gray-500">
                  Withdrawal Day:
                </h2>
                <p className="text-sm font-bold md:text-lg">
                  {formatDate(endDate)}
                </p>
              </div>
            </section>

            <p className="hidden text-lg">
              bh dui. Habitant ue mattis amet duis dis tincidunt vitae imperdiet
              morbi. Niestas neque vulputate. Et aliquet odio mattis eget ornare
              nisl semper donec velit.
            </p>
          </section>

          <section className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                Token
              </Typography>
              <Typography className="mt-2 text-lg font-semibold  text-[#939090]">
                {contribution.tokenSymbol}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                Lock Type
              </Typography>
              <Typography className="mt-2 text-lg font-semibold  text-[#939090]">
                {contribution.poolType === "periodic" || "manual"
                  ? contribution.lockType === 0
                    ? "Flexible Savings"
                    : contribution.lockType === 1
                      ? "Lock Savings"
                      : contribution.lockType === 2
                        ? "Strict Lock Savings"
                        : "Unknown"
                  : "N/A"}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                Deposit Amount
              </Typography>
              <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                ${contribution.initialAmount || "N/A"}
              </Typography>
            </div>

            {contribution?.poolType === "periodic" && (
              <>
                <div className="w-full rounded-xl bg-Dh p-5">
                  <Typography className="text-lg font-semibold text-text1">
                    Frequency
                  </Typography>
                  <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                    {contribution.interval || "N/A"}
                  </Typography>
                </div>

                <div className="w-full rounded-xl bg-Dh p-5">
                  <Typography className="text-lg font-semibold text-text1">
                    Periodic Amount
                  </Typography>
                  <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                    ${contribution.periodicAmount || "N/A"}
                  </Typography>
                </div>

                {/* Display Next Charge Date */}
                <div className="w-full rounded-xl bg-Dh p-5">
                  <Typography className="text-lg font-semibold text-text1">
                    Next Charge
                  </Typography>
                  <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                    {nextChargeDate ? formatDate(nextChargeDate, true) : "N/A"}
                  </Typography>
                </div>
              </>
            )}

            <div className="hidden w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                Savings Duration
              </Typography>
              <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                {contribution.duration !== undefined &&
                contribution.duration !== null
                  ? `${contribution.duration} day${contribution.duration !== 1 ? "s" : ""}`
                  : "N/A"}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                Start Date
              </Typography>
              <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                {formatDate(contribution?.createdAt ?? null)}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                End Date
              </Typography>
              <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                {formatDate(endDate)} ({contribution?.duration} days)
              </Typography>
            </div>
          </section>
          <TransactionHistory contribution={{ ...contribution, transactions: [] }} />
        </section>
      </section>

      <FundSavingsModal
        isOpen={isFundModalOpen}
        onClose={() => setIsFundModalOpen(false)}
        contribution={{
          poolIndex: contribution.poolId,
          tokenToSaveWith: contribution.tokenAddress,
        }}
      />

      {/* Update Savings Modal*/}
      <UpdateSavingsModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        contribution={{
          poolIndex: contribution.poolId,
          tokenToSaveWith: contribution.tokenAddress,
        }}
      />

      {contribution && (
         <EarlyWithdrawalModal
            isOpen={isEarlyWithdrawalModalOpen}
            onClose={() => setIsEarlyWithdrawalModalOpen(false)}
            onConfirm={handleEarlyWithdrawalConfirm}
            totalAmount={Number(contribution.totalAmount) || 0}
            feePercentage={3}
            formattedEndDate={formattedEndDateString}
         />
      )}

    </main>
  );
};

export default ViewCryptoContribution;
