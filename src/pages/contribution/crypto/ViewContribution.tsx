import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import {
  DetailsSkeleton,
  StatsSkeleton,
  TrackerSkeleton,
} from "../../../components/common/Loading";
import ToggleButton from "../../../shared/utils/ToggleButton";
import { ContributionTracker } from "../../../components/dashboard/contribution/contributionTracker/ContributionTracker";
import PaymentWithCard from "../../../components/dashboard/contribution/unpaidContribution/PaymentWithCard";
import PayWithPaystack from "../../../components/dashboard/contribution/unpaidContribution/PayWithPaystack";
import { Typography } from "@material-tailwind/react";

const ViewCryptoContribution = () => {
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

  return (
    <main className="pb-[1.5em] ">
      <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
          Crypto Contribution Details
        </DashboardHeader>
      </header>

      <section>
        <header className="flex w-full items-center justify-between p-4">
          <div className="flex-shrink-0">
            <IoIosArrowBack
              className="cursor-pointer"
              size={30}
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="flex-1 text-center">
            <h1 className="truncate text-xl font-bold">
              {contribution.Reason || "Crypto Savings"}
              <span className="ml-2 font-medium text-gray-500">(Crypto)</span>
            </h1>
          </div>
          <div className="w-8 flex-shrink-0"></div>
        </header>

        <section className="">
          <article className="text-center text-text4">
            <div className="rounded-3xl border-[2px] border-gray-200 bg-white p-12 shadow-md">
              <div className="flex justify-center gap-4 ">
                <p className="font-medium">Contribution Balance</p>
                <div>
                  <ToggleButton isVisible={true} onToggle={() => {}} />
                </div>
              </div>
              <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
                <p className="text-xl font-bold md:text-xl">
                  {contribution.amountSaved || "*********"}
                </p>
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
              </div>
            </div>

            <section>
              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-text2 p-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex w-full flex-col items-center justify-center rounded-full border-2 border-gray-500 bg-white px-[1.5em] py-3 lg:w-[35%]">
                  <p className="w-full text-center font-semibold text-gray-600">
                    Unpaid Balance
                  </p>
                  <p className="w-full text-center font-medium text-gray-400">
                    {contribution.amountSaved || "*********"}
                  </p>
                </div>

                <div className="flex w-full flex-col items-center rounded-full border-2 border-gray-500 bg-white px-[1.5em] py-3  lg:w-[35%]">
                  <p className="font-semibold">
                    {contribution.Duration
                      ? `${Math.ceil(contribution.Duration / (24 * 60 * 60))} Days`
                      : "N/A"}
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
                  className="whitespace-nowrap rounded-full border-2 border-gray-200 bg-inherit px-[1.5em] py-[5px] text-lg font-semibold shadow-lg lg:px-[3em] lg:py-[13px]"
                >
                  Fund
                </motion.button>

                <Link to="/dashboard/contribution/withdraw_contribution">
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
              <span className="mt-[1em] hidden font-semibold text-[#626262]">
                Next Contribution is:{" "}
                {contribution.nextContribution || "--/--/----"}
              </span>
            </span>
            <hr className="mt-[2em] w-full" />
          </article>

          <section className="my-8 grid grid-cols-2 gap-4">
            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-gray-600">
                Deposit Amount
              </Typography>
              <Typography className="mt-2 text-lg font-semibold">
                {contribution.amountSaved || "N/A"} {contribution.symbol}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-gray-600">
                Savings Duration
              </Typography>
              <Typography className="mt-2 text-lg font-semibold">
                {contribution.Duration
                  ? `${Math.floor(contribution.Duration / (30 * 24 * 60 * 60))} months (${Math.floor((contribution.Duration % (30 * 24 * 60 * 60)) / (24 * 60 * 60))} Days)`
                  : "N/A"}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-gray-600">
                Start Date
              </Typography>
              <Typography className="mt-2 text-lg font-semibold">
                {contribution.startDate || "--/--/----"}
              </Typography>
            </div>

            <div className="w-full rounded-xl bg-Dh p-5">
              <Typography className="text-lg font-semibold text-gray-600">
                End Date
              </Typography>
              <Typography className="mt-2 text-lg font-semibold">
                {contribution.Duration
                  ? `${Math.ceil(contribution.Duration / (24 * 60 * 60))} Days`
                  : "N/A"}
              </Typography>
            </div>
          </section>

          <ContributionTracker
            isLoading={false}
            currentPage={1}
            setCurrentPage={() => {}}
            hasMore={false}
          />
        </section>
      </section>

      <PaymentWithCard
        onClose={() => {}}
        contributionData={contribution}
        isOpen={false}
        handler={() => {}}
      />

      <PayWithPaystack
        onSelect={() => {}}
        isProcessing={false}
        isOpen={false}
        handler={() => {}}
        error={undefined}
        handleCloseError={() => {}}
      />
    </main>
  );
};

export default ViewCryptoContribution;
