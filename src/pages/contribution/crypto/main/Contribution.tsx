import React, { useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCryptoWallet } from "../../../../shared/Hooks/useBalance";
import { useAllUserPools } from "../../../../shared/Hooks/useBalance";
import ToggleButton from "../../../../shared/utils/ToggleButton";
import { motion } from "framer-motion";
import { Typography, Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { SavingsPlan } from "../../../../components/dashboard/contribution/modals/SavingsPlan";
import { Flexibile, Lock, StrictLocak } from "../../../../Assets/svg";
import FundSavingsModal from "../../../../components/dashboard/contribution/modals/FundContribution";
import UpdateSavingsModal from "../../../../components/dashboard/contribution/modals/UpdateContribution";
import MySavingsList from "../../../../components/dashboard/contribution/MySavingsList";
import FilterSavings, {
  SavingsFilters,
} from "../../../../components/dashboard/contribution/modals/FilterSavings";
import { Pool } from "../../../../shared/types/types";
import { IoIosArrowDown } from "react-icons/io";

const CryptoSavings: React.FC = () => {
  const navigate = useNavigate();
  const {
    Balance,
    loading: cryptoBalanceLoading,
    isWalletVisible,
    setIsWalletVisible,
  } = useCryptoWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingsType, setSavingsType] = useState<"naira" | "crypto">("crypto");
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { userPools = [], loading: poolsLoading } = useAllUserPools() || {};
  const [selectedContribution, setSelectedContribution] = useState<{
    poolIndex: string;
    tokenToSaveWith: string;
    poolType?: "oneTime" | "periodic";
  } | null>(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SavingsFilters>({
    contributionType: "all",
    lockType: "all",
  });

  const handleOpenModalBasedOnType = useCallback((pool: Pool) => {
    setSelectedContribution({
      poolIndex: pool.poolId,
      tokenToSaveWith: pool.tokenAddress,
      poolType: pool.poolType,
    });

    if (pool.poolType === "periodic") {
      setIsUpdateModalOpen(true);
    } else {
      setIsFundModalOpen(true);
    }
  }, []);

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

  const handleApplyFilters = useCallback((newFilters: SavingsFilters) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const filteredPools = useMemo(() => {
    const poolsArray = Array.isArray(userPools) ? userPools : [];
    return (poolsArray as Pool[]).filter((pool) => {
      if (!pool || typeof pool !== "object") return false;

      const contributionMatch =
        activeFilters.contributionType === "all" ||
        pool.poolType === activeFilters.contributionType;

      const lockMatch =
        activeFilters.lockType === "all" ||
        pool.lockType === activeFilters.lockType;

      return contributionMatch && lockMatch;
    });
  }, [userPools, activeFilters]);

  const { currentItems, totalPages } = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const items = Array.isArray(filteredPools)
      ? filteredPools.slice(indexOfFirstItem, indexOfLastItem)
      : [];
    const pages =
      Array.isArray(filteredPools) && filteredPools.length > 0
        ? Math.ceil(filteredPools.length / itemsPerPage)
        : 1;
    return { currentItems: items, totalPages: pages };
  }, [filteredPools, currentPage, itemsPerPage]);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage,
    );
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }, []);

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
            {/* Top Balance Section */}
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

            {/* Savings Options Links */}
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

                  <Link
                    to={
                      contributionType === "auto"
                        ? "/dashboard/contribution/lock/crypto_purpose"
                        : "/dashboard/contribution/one_time_plan/lock/crypto_purpose"
                    }
                    state={{
                      lockedType: 1,
                      contributionType: contributionType,
                    }}
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

        {/* Render the new MySavingsList component */}
        <MySavingsList
          userPools={userPools}
          poolsLoading={poolsLoading}
          filteredPools={filteredPools}
          currentItems={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          handleOpenModalBasedOnType={handleOpenModalBasedOnType}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          navigate={navigate}
          setIsFilterModalOpen={setIsFilterModalOpen}
          handleApplyFilters={handleApplyFilters}
        />
      </main>

      {/* Filter Modal */}
      <FilterSavings
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentFilters={activeFilters}
        onApplyFilters={handleApplyFilters}
      />

      {/* SavingsPlan Modal */}
      <SavingsPlan
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        savingsType={savingsType}
        onSavingsTypeChange={handleSavingsTypeChange}
      />
      {/* FundSavingsModal */}
      {selectedContribution && (
        <FundSavingsModal
          isOpen={isFundModalOpen}
          onClose={() => setIsFundModalOpen(false)}
          contribution={selectedContribution}
        />
      )}

      {/* UpdateSavingsModal */}
      {selectedContribution && (
        <UpdateSavingsModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          contribution={selectedContribution}
        />
      )}
    </motion.main>
  );
};

export default CryptoSavings;
