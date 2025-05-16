import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button, Typography } from "@material-tailwind/react";
import { Filter } from "../../../../Assets/svg";
import FormInput from "../../../../components/common/FormInput";
import { Alert } from "@mui/material";
import contributionImg from "../../../../Assets/svg/dashboard/contribution/category-contribution.svg";
import { ContributionListSkeleton } from "../../../common/Loading";

interface Contribution {
  _id: string;
  savingsCategory: string;
  balance: number;
}

interface AutoSavingsProps {
  contributions: Contribution[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  filterType: string;
  isFilterOpen: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (value: string) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onNavigateToDetails: (contributionId: string) => void;
  setIsFilterOpen: (value: boolean) => void;
}

const AutoSavings: React.FC<AutoSavingsProps> = ({
  contributions,
  isLoading,
  error,
  currentPage,
  totalPages,
  searchTerm,
  filterType,
  isFilterOpen,
  onSearchChange,
  onFilterChange,
  onPrevPage,
  onNextPage,
  onNavigateToDetails,
  setIsFilterOpen,
}) => {
  const formatCurrency = (amount: number | undefined) => {
    if (!amount && amount !== 0) return "₦ 0";
    return `₦ ${amount.toLocaleString()}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isFilterOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest(".relative")) {
          setIsFilterOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen, setIsFilterOpen]);

  return (
    <section className="mt-0 w-full md:mt-4">
      <Typography
        variant="h1"
        className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl"
      >
        My Savings
      </Typography>

      <div className="mt-4 flex w-full items-center justify-between gap-4 md:mt-5">
        <div className="flex-1">
          <FormInput
            placeholder="Search Contribution"
            wrapperClassName="w-full"
            value={searchTerm}
            onChange={onSearchChange}
            className=" shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]"
          />
        </div>

        <div className="relative flex items-center">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter />
            <Typography className="hidden font-medium md:block">
              Filter by:
            </Typography>
          </div>

          {isFilterOpen && (
            <div className="absolute right-0 top-10 z-10 w-48 rounded-md bg-white p-2 shadow-lg">
              <div
                className={`cursor-pointer rounded-md p-2 hover:bg-gray-100 ${
                  filterType === "" ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => {
                  onFilterChange("");
                  setIsFilterOpen(false);
                }}
              >
                All Savings
              </div>
              <div
                className={`cursor-pointer rounded-md p-2 ${
                  filterType === "flexible" ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => {
                  onFilterChange("flexible");
                  setIsFilterOpen(false);
                }}
              >
                Flexible
              </div>
              <div
                className={`cursor-pointer rounded-md p-2 ${
                  filterType === "lock" ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => {
                  onFilterChange("lock");
                  setIsFilterOpen(false);
                }}
              >
                Lock
              </div>
              <div
                className={`cursor-pointer rounded-md p-2 ${
                  filterType === "strict" ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => {
                  onFilterChange("strict");
                  setIsFilterOpen(false);
                }}
              >
                Strict Lock
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <ContributionListSkeleton />
      ) : error ? (
        <Alert severity="error" className="mt-4">
          {error}
        </Alert>
      ) : contributions.length > 0 ? (
        <div className="mb-3 mt-4 flex h-auto flex-col gap-4 rounded-lg bg-text2 p-4 text-center md:mt-6 md:p-6">
          <div className="mb-3 flex items-center justify-between px-4">
            <span className="text-sm font-medium text-white md:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2 font-semibold">
              <button
                onClick={onPrevPage}
                disabled={currentPage <= 1}
                className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IoIosArrowBack size={20} />
              </button>
              <button
                onClick={onNextPage}
                disabled={currentPage >= totalPages}
                className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>
          <hr className="border-gray-500" />

          {contributions.map((contribution) => (
            <motion.div
              key={contribution._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigateToDetails(contribution._id)}
              className="mx-auto flex w-full max-w-3xl cursor-pointer flex-col gap-2 rounded-full border-2 border-gray-500 bg-white px-4 transition-all hover:bg-gray-50 lg:px-6"
            >
              <div className="flex justify-between text-sm font-medium text-gray-500 md:text-base">
                <Typography className="font-normal">Savings Name</Typography>
                <Typography className="font-normal">Savings Balance</Typography>
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
                    {contribution.savingsCategory}
                  </Typography>
                </div>
                <div>
                  <figure className="text-base font-semibold md:text-lg">
                    {formatCurrency(contribution.balance)}
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
  );
};

export default AutoSavings;
