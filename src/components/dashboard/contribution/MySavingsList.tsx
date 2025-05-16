import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ContributionListSkeleton } from "../../common/Loading";
import { Pool } from "../../../shared/types/types";
import { NavigateFunction } from "react-router-dom";

interface MySavingsListProps {
  userPools: Pool[];
  poolsLoading: boolean;
  filteredPools: Pool[];
  currentItems: Pool[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  handleOpenModalBasedOnType: (pool: Pool) => void;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  navigate: NavigateFunction;
  setIsFilterModalOpen: (isOpen: boolean) => void;
  handleApplyFilters: (filters: any) => void;
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event?: React.FormEvent | React.KeyboardEvent) => void;
  onSearchKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const MySavingsList: React.FC<MySavingsListProps> = ({
  userPools,
  poolsLoading,
  filteredPools,
  currentItems,
  currentPage,
  totalPages,
  itemsPerPage,
  handleOpenModalBasedOnType,
  goToPrevPage,
  goToNextPage,
  navigate,
  setIsFilterModalOpen,
  handleApplyFilters,
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onSearchKeyDown,
}) => {
  const getEmptyStateMessage = () => {
    const hasSearchTerm = searchTerm.trim() !== "";
    const hasOriginalPools = Array.isArray(userPools) && userPools.length > 0;
    const hasFilteredPools =
      Array.isArray(filteredPools) && filteredPools.length > 0;

    if (hasSearchTerm && !hasFilteredPools) {
      return "Savings not found";
    } else if (!hasSearchTerm && !hasOriginalPools) {
      return "No Savings Yet";
    } else if (!hasSearchTerm && hasOriginalPools && !hasFilteredPools) {
      return "No Savings Match Filters";
    } else if (hasSearchTerm && !hasOriginalPools) {
      return "Savings not found";
    }
    return "No Savings Available";
  };

  return (
    <section className="mt-6 w-full sm:mt-8 lg:mt-10">
      <header className="flex flex-col items-start justify-between gap-4">
        <h1 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">My Savings</h1>
        <div className="flex items-center gap-2 w-full">
          <div className="relative block w-full">
            <input
              className="border-2 w-full rounded-full border-[#F5F0F0] py-3.5 shadow-xl pl-8 pr-3 placeholder:text-sm"
              type="search"
              placeholder="Search Contributions"
              value={searchTerm}
              onChange={onSearchChange}
              onKeyDown={onSearchKeyDown}
            />
            <IoSearchOutline
              className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => onSearchSubmit()}
            />
          </div>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="rounded-lg flex gap-1 items-center border-[#F5F0F0] p-2 text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Filter savings"
          >
            <IoFilterOutline size={22} />
            <p className="hidden md:block">Filter</p>
          </button>
        </div>
      </header>

      {poolsLoading ? (
        <ContributionListSkeleton />
      ) : Array.isArray(filteredPools) && filteredPools.length > 0 ? (
        <div className="p3 mb-10 mt-4 flex h-auto flex-col gap-3 rounded-2xl bg-text2 px-3 py-5 text-center sm:mt-6 sm:gap-4 md:px-7 md:py-10">
          {filteredPools.length > itemsPerPage && (
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

          {currentItems.map((pool: Pool) => (
            <motion.div
              key={pool.poolId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="mx-auto flex w-full max-w-3xl cursor-pointer flex-col gap-2 rounded-xl border border-gray-300 bg-white p-3 transition-all hover:bg-gray-50 sm:gap-3 sm:p-4 md:rounded-3xl"
            >
              <div className="flex justify-between text-xs font-medium text-gray-500 sm:text-sm">
                <p>Savings Token: {pool?.tokenSymbol}</p>
                <div className="flex flex-col md:flex-row gap-2 text-right">
                  <p className="text-sm font-semibold text-text2">
                    Type: {pool?.poolType === "periodic" ? "Auto" : "One-Time"}
                  </p>
                  <p className="text-sm font-semibold text-text2">
                    Lock:{" "}
                    {pool?.lockType === 0
                      ? "Flexible"
                      : pool?.lockType === 1
                        ? "Lock"
                        : pool?.lockType === 2
                          ? "Strict Lock"
                          : "Unknown"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-bold">{pool?.reason}</p>
                <p className="text-sm font-semibold">
                  Deposited Amount:{" "}
                  <span className="font-bold text-text2">
                    ${pool?.initialAmount}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  Duration:{" "}
                  <span className="text-gray-500">{pool?.duration} days</span>
                </p>
                <p className="text-xs font-semibold sm:text-sm">
                  Current Balance:{" "}
                  <span className="text-gray-800">${pool?.totalAmount}</span>
                </p>
              </div>

              <hr className="my-1" />

              <div className="flex justify-between">
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={() => handleOpenModalBasedOnType(pool)}
                    disabled={!pool.isActive}
                    className={`rounded-lg bg-[#ECE6F2] px-2 py-1 text-xs font-semibold text-text2 transition-all hover:scale-105 active:scale-95 sm:px-3 sm:text-sm ${
                      !pool.isActive ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {pool.poolType === "periodic" ? "Update" : "Fund"}
                  </button>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      "/dashboard/contribution/crypto_contribution_details",
                      {
                        state: pool,
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
            {getEmptyStateMessage()}
          </Typography>

          {getEmptyStateMessage() === "No Savings Match Filters" ||
          getEmptyStateMessage() === "Savings not found" ? (
            <button
              onClick={() =>
                handleApplyFilters({
                  contributionType: "all",
                  lockType: "all",
                  status: "active",
                })
              }
              className="mt-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-text2 transition-colors hover:bg-gray-100"
            >
              {getEmptyStateMessage() === "Savings not found"
                ? "Clear Search & Filters"
                : "Clear Filters"}
            </button>
          ) : null}
        </motion.div>
      )}
    </section>
  );
};

export default React.memo(MySavingsList);
