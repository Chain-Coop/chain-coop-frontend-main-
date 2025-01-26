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
                <button
                  onClick={toggleModal}
                  className="flex w-auto transform items-center  gap-2 rounded-lg border-[3px] border-gray-200 bg-[#E3D9E6] px-6 py-2 text-lg font-semibold text-text2 transition-all duration-300 hover:scale-105
                  active:scale-95 md:py-3 lg:py-2"
                >
                  Naira Savings
                  <IoIosArrowDown />
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 font-sans">
                <p className="text-sm font-medium md:text-base">
                  Total Contribution Balance
                </p>
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
                  <p className="font-bold sm:text-xl lg:text-xl">
                    {formattedBalance}
                  </p>
                ) : (
                  <p className="text-2xl font-bold">*********</p>
                )}
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
              </div>
            </motion.div>

            <section className="mt-6 md:mt-8">
              <div className="grid w-[80%] grid-cols-1 gap-4 md:grid-cols-2">
                <Link
                  to="/dashboard/contribution/contribution_curency_type"
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
                  to="/dashboard/contribution/lock/contribution_curency_type"
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
                  to="/dashboard/contribution/strict_lock/contribution_curency_type"
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
            <h1 className="text-xl font-bold md:text-2xl">My Savings</h1>
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
                    <p>Savings Name</p>
                    <p>Savings Balance</p>
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
                      <p className="text-base font-semibold md:text-lg">
                        {contribution?.savingsCategory}
                      </p>
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
              className="mt-4 flex h-auto w-full flex-col gap-4 rounded-lg bg-text2 p-6 text-center md:mt-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-how1 md:text-2xl">
                No Savings Yet
              </h2>
            </motion.div>
          )}
        </section>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        className="mx-auto w-full max-w-sm rounded-lg bg-white"
      >
        <div className="w-full px-4 py-6 sm:px-6">
          <header>
            <h1 className="text-center text-lg font-semibold text-gray-500 sm:text-xl">
              Choose Savings Plan
            </h1>
          </header>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3
                className={`font-semibold ${savingsType === "naira" ? "text-[#000080]" : "text-gray-600"}`}
              >
                Naira Savings
              </h3>
              <input
                type="radio"
                className="h-4 w-4 cursor-pointer accent-[#000080]"
                name="savingsType"
                checked={savingsType === "naira"}
                onChange={() => handleSavingsTypeChange("naira")}
              />
            </div>
            <hr className="border-gray-200" />
            <div className="flex items-center justify-between">
              <h3
                className={`font-semibold ${savingsType === "crypto" ? "text-[#000080]" : "text-gray-600"}`}
              >
                Crypto Savings
              </h3>
              <input
                type="radio"
                className="h-4 w-4 cursor-pointer accent-[#000080]"
                name="savingsType"
                checked={savingsType === "crypto"}
                onChange={() => handleSavingsTypeChange("crypto")}
              />
            </div>
          </div>
        </div>
      </Modal>
    </motion.main>
  );
};

export default Contribution;
