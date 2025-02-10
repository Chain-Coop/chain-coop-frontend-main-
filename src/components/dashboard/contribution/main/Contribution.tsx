import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContributionBalance } from "../../../../shared/Hooks/useBalance";
import { useUserContributionHistory } from "../../../../shared/Hooks/useUserProfile";
import ToggleButton from "../../../../shared/utils/ToggleButton";
import contributionImg from "../../../../Assets/svg/dashboard/contribution/category-contribution.svg";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { motion } from "framer-motion";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import Modal from "../../../common/Modal";
import { Button, Typography } from "@material-tailwind/react";
import { ROUTES } from "../../../../shared/routes";
import { SavingsPlan } from "./modals/SavingsPlan";

type Contribution = {
  _id: string;
  contributionId?: string;
  savingsCategory: string;
  balance: number;
  contributionPlan?: string;
  startDate?: string;
  nextContributionDate?: string;
  amount?: number;
};

const ContributionListSkeleton: React.FC = () => (
  <div className="mt-[1em] flex h-auto w-full flex-col gap-[1em] rounded-lg bg-text2 px-2 py-[3em] text-center">
    {Array.from({ length: 3 }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="flex w-[90%] animate-pulse flex-col gap-2 rounded-full bg-white px-[1.5em] py-2"
      >
        <div className="flex justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div className="h-6 w-24 rounded bg-gray-200"></div>
          </div>
          <div className="h-6 w-32 rounded bg-gray-200"></div>
        </div>
      </motion.div>
    ))}
  </div>
);

const Contribution: React.FC = () => {
  const navigate = useNavigate();
  const { formattedBalance, isLoading: isBalanceLoading } =
    useContributionBalance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingsType, setSavingsType] = useState<"naira" | "crypto">("naira");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    getContributions,
    isLoading: isContributionsLoading,
    error,
  } = useUserContributionHistory(page, limit);

  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  const totalPages = getContributions?.totalPages || 1;
  const currentPage = parseInt(getContributions?.currentPage || "1");
  const contributions = getContributions?.contributions || [];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const navigateToContributionDetails = (contributionId: string) => {
    if (!contributionId) return;
    navigate(`/dashboard/contribution/contribution_details`, {
      state: { contributionId },
    });
  };

  const handleSavingsTypeChange = (type: "naira" | "crypto") => {
    setSavingsType(type);
    if (type === "crypto") {
      navigate("/dashboard/contribution/crypto_contribution");
    }
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatCurrency = (amount: number) => {
    if (!amount && amount !== 0) return "₦ 0";
    return `₦ ${amount.toLocaleString()}`;
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-2 min-h-screen w-full font-sans"
    >
      <header>
        <DashboardHeader className="flex w-full items-center justify-center text-2xl md:text-3xl lg:mt-[2em] lg:text-xl">
          Contribution Plan
        </DashboardHeader>
      </header>

      <main className="lg:px-4">
        <section className="w-full px-4 md:mt-8 lg:mt-10">
          <article className="text-center text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-3xl border-[2px] border-gray-200 bg-white p-8 shadow-md md:mx-8 lg:mx-auto lg:max-w-2xl"
            >
              <div className="flex justify-end py-3">
                <Button
                  onClick={toggleModal}
                  className="text-md flex w-auto transform  items-center gap-2 rounded-lg border-[3px] border-gray-200 bg-[#E3D9E6] px-6 py-2 font-semibold text-text2 transition-all duration-300 hover:scale-105
                  active:scale-95 md:py-3 lg:py-2"
                >
                  Naira Savings
                  <IoIosArrowDown />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 font-sans">
                <Typography
                  variant="small"
                  className="text-sm font-medium md:text-base"
                >
                  Total Contribution Balance
                </Typography>
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

              <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
                {isBalanceLoading ? (
                  <div className="h-8 animate-pulse rounded bg-gray-200"></div>
                ) : isContributionVisible ? (
                  <Typography className="font-bold sm:text-xl lg:text-xl">
                    {formattedBalance}
                  </Typography>
                ) : (
                  <Typography className="text-2xl font-bold">
                    *********
                  </Typography>
                )}
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
              </div>
            </motion.div>

            <section className="mt-6 md:mt-8">
              <div className="grid w-[80%] grid-cols-1 gap-4 md:grid-cols-2">
                <Link
                  to={ROUTES.flexibleContributionType}
                  state={{ savingsType: "Flexible" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full border-[3px] border-gray-300 bg-inherit px-2 py-2 text-base font-semibold text-memt1 shadow-lg transition-all hover:bg-gray-50 md:px-4 md:py-3 md:text-lg"
                  >
                    Flexible Savings
                  </motion.button>
                </Link>

                <Link
                  to={ROUTES.lockContributionType}
                  state={{ savingsType: "Lock" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full border-[3px] border-gray-300 bg-inherit px-2 py-2 text-base font-semibold text-memt1 shadow-lg transition-all hover:bg-gray-50 md:px-4 md:py-3 md:text-lg"
                  >
                    Lock Savings
                  </motion.button>
                </Link>

                <Link
                  to={ROUTES.strictLockContributionType}
                  state={{ savingsType: "Strict" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full border-[3px] border-gray-300 bg-inherit px-2 py-2 text-base font-semibold text-memt1 shadow-lg transition-all hover:bg-gray-50 md:px-4 md:py-3 md:text-lg"
                  >
                    Strict Lock Savings
                  </motion.button>
                </Link>
              </div>
              <hr className="mx-auto mt-8 w-full max-w-2xl" />
            </section>
          </article>
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl px-4 md:mt-10 lg:mt-12">
          <header>
            <Typography variant="h1" className="text-xl font-bold md:text-2xl">
              My Savings
            </Typography>
          </header>

          {isContributionsLoading ? (
            <ContributionListSkeleton />
          ) : contributions?.length > 0 ? (
            <div className="mb-3 mt-4 flex h-auto flex-col gap-4 rounded-lg bg-text2 p-4 text-center md:mt-6 md:p-6">
              <div className="mb-3 flex items-center justify-between px-4">
                <span className="text-sm font-medium text-white md:text-base">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2 font-semibold">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <IoIosArrowBack size={20} />
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <IoIosArrowForward size={20} />
                  </button>
                </div>
              </div>
              <hr className="border-gray-500" />

              {contributions.map((contribution: Contribution) => (
                <motion.div
                  key={contribution._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    navigateToContributionDetails(contribution._id)
                  }
                  className="mx-auto flex w-full max-w-3xl cursor-pointer flex-col gap-2 rounded-full border-2 border-gray-500 bg-white px-4 py-2 transition-all hover:bg-gray-50 md:px-6 md:py-3"
                >
                  <div className="flex justify-between text-sm font-medium text-gray-500 md:text-base">
                    <Typography className="font-normal">
                      Savings Name
                    </Typography>
                    <Typography className="font-normal">
                      Savings Balance
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 md:w-10">
                        <motion.img
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          src={contributionImg}
                          alt="Contribution category icon"
                          className="w-full"
                        />
                      </div>
                      <Typography className="text-base font-semibold md:text-lg">
                        {contribution?.savingsCategory}
                      </Typography>
                    </div>
                    <div>
                      <figure className="text-base font-semibold md:text-lg">
                        {formatCurrency(contribution?.balance)}
                      </figure>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex h-[12em] w-full flex-col items-center justify-center gap-4 rounded-lg bg-text2 p-6 text-center md:mt-6 md:p-8"
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
    </motion.main>
  );
};

export default Contribution;
