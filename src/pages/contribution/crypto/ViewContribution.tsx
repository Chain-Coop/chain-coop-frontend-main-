import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";
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

const ViewCryptoContribution = () => {
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const contribution = location.state;

  if (!contribution) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-gray-500">
          No contribution details available.
        </p>
      </main>
    );
  }

  const startDateTimestamp = contribution.startDate
    ? parseInt(contribution.startDate)
    : null;

  const durationSeconds = contribution.Duration
    ? parseInt(contribution.Duration)
    : null;

  const startDate = startDateTimestamp
    ? new Date(startDateTimestamp * 1000)
    : null;

  const endDate =
    startDateTimestamp && durationSeconds
      ? new Date((startDateTimestamp + durationSeconds) * 1000)
      : null;

  const formatDate = (date: Date | null) => {
    if (!date || isNaN(date.getTime())) return "--/--/----";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
                  $ {contribution.amountSaved || "*********"}
                </p>
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
              </div>

              <div className="mt-[1.5em] flex flex-col items-center justify-center gap-4 text-center text-text3">
                <p className="flex w-full items-center justify-center gap-1 rounded-lg border-[1px] border-dashed border-text2 py-4 text-sm font-bold text-text2 lg:w-[50%]">
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
                    className="flex-1 whitespace-nowrap rounded-lg border-2 border-gray-200 bg-inherit bg-text2 px-[1.5em] py-[5px] text-lg font-semibold text-white shadow-lg lg:px-[3em] lg:py-[13px]"
                    onClick={() => setIsFundModalOpen(true)}
                  >
                    Fund
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      navigate(
                        "/dashboard/contribution/withdraw_crypto_contribution",
                        {
                          state: {
                            poolIndex: contribution.poolIndex,
                            symbol: contribution.symbol,
                            amount: contribution.amountSaved,
                          },
                        },
                      )
                    }
                    className="flex-1 whitespace-nowrap rounded-lg border-2 border-gray-200 bg-inherit px-[1.5em] py-[5px] text-lg font-semibold shadow-lg lg:px-[3em] lg:py-[13px]"
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
                {contribution.Reason}
              </h2>
            </div>

            <section className="flex w-full flex-col gap-2 md:flex-row md:gap-5">
              <div className="hidden items-center gap-1 md:gap-2">
                <h2 className="text-sm font-semibold text-gray-500">
                  Interest Rate:
                </h2>
                <p className="text-sm font-bold text-green-500 md:text-lg">
                  {contribution.interestRate || "0.85%"}
                </p>
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

            <p className="text-lg">
              bh dui. Habitant ue mattis amet duis dis tincidunt vitae imperdiet
              morbi. Niestas neque vulputate. Et aliquet odio mattis eget ornare
              nisl semper donec velit.
            </p>
          </section>

          <section className="my-8 grid grid-cols-2 gap-4">
            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                Token
              </Typography>
              <Typography className="mt-2 text-lg font-semibold  text-[#939090]">
                {contribution.symbol}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                Deposit Amount
              </Typography>
              <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                ${contribution.amountSaved || "N/A"}
              </Typography>
            </div>

            <div className="hidden w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                Savings Duration
              </Typography>
              <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                {contribution.Duration
                  ? `${Math.floor(contribution.Duration / (30 * 24 * 60 * 60))} months (${Math.floor((contribution.Duration % (30 * 24 * 60 * 60)) / (24 * 60 * 60))} Days)`
                  : "N/A"}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                Start Date
              </Typography>
              <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                {formatDate(startDate)}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-text1">
                End Date
              </Typography>
              <Typography className="mt-2 text-lg font-semibold text-[#939090]">
                {formatDate(endDate)} ({contribution.Duration} days)
              </Typography>
            </div>
          </section>
        </section>
      </section>

      {/* Fund Savings Modal */}
      <FundSavingsModal
        isOpen={isFundModalOpen}
        onClose={() => setIsFundModalOpen(false)}
        contribution={contribution}
      />
    </main>
  );
};

export default ViewCryptoContribution;
