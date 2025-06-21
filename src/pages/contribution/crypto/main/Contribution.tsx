import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import { useTotalContributionBalanceCrypto } from "../../../../shared/Hooks/useBalance";
import { useAllUserPools } from "../../../../shared/Hooks/useUserProfile";
import {
  GetAllUserPools,
  SearchUserPools,
} from "../../../../shared/redux/slices/web3.slices";
import ToggleButton from "../../../../shared/utils/ToggleButton";
import { motion } from "framer-motion";
import { Typography, Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { Flexibile, Lock, Strict } from "../../../../Assets/svg";
import FundSavingsModal from "../../../../components/dashboard/contribution/modals/FundContribution";
import UpdateSavingsModal from "../../../../components/dashboard/contribution/modals/UpdateContribution";
import MySavingsList from "../../../../components/dashboard/contribution/MySavingsList";
import FilterSavings, {
  SavingsFilters,
} from "../../../../components/dashboard/contribution/modals/FilterSavings";
import { Pool } from "../../../../shared/types/types";

const UNIFIED_CRYPTO_PURPOSE_PATH =
  "/dashboard/contribution/crypto/unified-crypto-purpose";

const CryptoSavings: React.FC = () => {
  const navigate = useNavigate();

  const {
    balance: totalContributionCrypto,
    formattedBalance: formattedTotalContributionCrypto,
    loading: totalContributionLoading,
    isContributionVisible,
    setIsContributionVisible,
  } = useTotalContributionBalanceCrypto(30000);

  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [activeFilters, setActiveFilters] = useState<SavingsFilters>({
    contributionType: "all",
    lockType: "all",
    status: "active",
  });

  const { userPools: rawUserPoolsData, loading: rawPoolsLoading } =
    useAllUserPools() || {};

  const poolsToDisplay = Array.isArray(rawUserPoolsData)
    ? rawUserPoolsData
    : rawUserPoolsData &&
        typeof rawUserPoolsData === "object" &&
        Array.isArray(rawUserPoolsData.data)
      ? rawUserPoolsData.data
      : [];

  const [selectedContribution, setSelectedContribution] = useState<{
    poolIndex: string;
    tokenToSaveWith: string;
    poolType?: "oneTime" | "periodic";
  } | null>(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

  const [contributionType, setContributionType] = useState<
    "auto" | "one-time" | null
  >(null);

  const [hoveredSavingsType, setHoveredSavingsType] = useState<string | null>(
    null,
  );

  const handleContributionTypeChange = (type: "auto" | "one-time") => {
    setContributionType(type);
  };

  const handleApplyFilters = useCallback((newFilters: SavingsFilters) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const filteredPools = useMemo(() => {
    return poolsToDisplay.filter((pool: Pool) => {
      if (
        !pool ||
        typeof pool !== "object" ||
        typeof pool.isActive === "undefined"
      ) {
        return false;
      }

      const contributionMatch =
        activeFilters.contributionType === "all" ||
        pool.poolType === activeFilters.contributionType;

      const lockMatch =
        activeFilters.lockType === "all" ||
        pool.lockType === activeFilters.lockType;

      const statusMatch =
        activeFilters.status === "all" ||
        (activeFilters.status === "active" && pool.isActive === true) ||
        (activeFilters.status === "inactive" && pool.isActive === false);

      return contributionMatch && lockMatch && statusMatch;
    });
  }, [poolsToDisplay, activeFilters]);

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

  const dispatch = useDispatch<AppDispatch>();
  const {
    userPools = [],
    loading: userPoolsLoading,
    isWalletActivated,
  } = useAllUserPools() || {};

  const [searchTerm, setSearchTerm] = useState("");

  const hasFetchedInitialPools = React.useRef(false);
  useEffect(() => {
    if (isWalletActivated && !hasFetchedInitialPools.current) {
      //console.log("CryptoSavings: Wallet active, fetching initial pools.");
      dispatch(GetAllUserPools());
      hasFetchedInitialPools.current = true;
    }
  }, [dispatch, isWalletActivated]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim() === "" && searchTerm.trim() !== "") {
      //("Search cleared, fetching all pools.");
      dispatch(GetAllUserPools());
    }
  };

  const handleSearchSubmit = (
    event?: React.FormEvent | React.KeyboardEvent,
  ) => {
    if (
      event &&
      typeof (event as React.FormEvent).preventDefault === "function"
    ) {
      (event as React.FormEvent).preventDefault();
    }
    const termToSearch = searchTerm.trim();
    if (termToSearch) {
      dispatch(SearchUserPools(termToSearch));
    } else {
      dispatch(GetAllUserPools());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit(event);
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
        <section className="mt-6 w-full md:mt-8">
          <article className="text-center text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border-[2px] border-gray-200 bg-white p-8 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] sm:p-16"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <p className="text-xs font-medium sm:text-sm lg:text-base">
                  Total Contribution Balance
                </p>
                <ToggleButton
                  isVisible={isContributionVisible}
                  onToggle={(newVisibility) => {
                    setIsContributionVisible(newVisibility);
                  }}
                />
              </div>

              <div className="mt-4 w-full rounded-md sm:mt-6">
                {totalContributionLoading ? (
                  <div className="h-6 animate-pulse rounded bg-gray-200 sm:h-8"></div>
                ) : isContributionVisible ? (
                  <p className="text-xl font-bold lg:text-2xl">
                    $
                    {Number(formattedTotalContributionCrypto).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}
                  </p>
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
                    to={UNIFIED_CRYPTO_PURPOSE_PATH}
                    state={{
                      lockedType: 0, // Flexible
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
                    to={UNIFIED_CRYPTO_PURPOSE_PATH}
                    state={{
                      lockedType: 1, // Lock
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
                    to={UNIFIED_CRYPTO_PURPOSE_PATH}
                    state={{
                      lockedType: 2, // Strict Lock
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
                      <Strict />
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

        {/* MySavingsList */}
        <MySavingsList
          userPools={poolsToDisplay}
          poolsLoading={rawPoolsLoading}
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
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchKeyDown={handleKeyDown}
        />
      </main>

      {/* Filter Modal */}
      <FilterSavings
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentFilters={activeFilters}
        onApplyFilters={handleApplyFilters}
      />

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
