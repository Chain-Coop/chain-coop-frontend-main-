import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Button, Typography } from "@material-tailwind/react";

export type ContributionTypeFilter = "all" | "auto" | "one-time";
export type LockTypeFilter = "all" | "Flexible" | "Lock" | "Strict";
export type StatusFilter = "all" | "active" | "inactive";

export interface ContributionFilters {
  contributionType: ContributionTypeFilter;
  lockType: LockTypeFilter;
  status: StatusFilter;
}

interface FilterContributionsProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: ContributionFilters;
  onApplyFilters: (filters: ContributionFilters) => void;
}

const FilterContributions: React.FC<FilterContributionsProps> = ({
  isOpen,
  onClose,
  currentFilters,
  onApplyFilters,
}) => {
  const [selectedContributionType, setSelectedContributionType] =
    useState<ContributionTypeFilter>(currentFilters.contributionType);
  const [selectedLockType, setSelectedLockType] = useState<LockTypeFilter>(
    currentFilters.lockType,
  );
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>(
    currentFilters.status,
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedContributionType(currentFilters.contributionType);
      setSelectedLockType(currentFilters.lockType);
      setSelectedStatus(currentFilters.status);
    }
  }, [isOpen, currentFilters]);

  const handleApply = () => {
    onApplyFilters({
      contributionType: selectedContributionType,
      lockType: selectedLockType,
      status: selectedStatus,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedContributionType("all");
    setSelectedLockType("all");
    setSelectedStatus("active");
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } },
  };

  const contributionOptions: {
    label: string;
    value: ContributionTypeFilter;
  }[] = [
    { label: "All Types", value: "all" },
    { label: "Auto Savings", value: "auto" },
    { label: "One-Time Savings", value: "one-time" },
  ];

  const lockOptions: { label: string; value: LockTypeFilter }[] = [
    { label: "All Locks", value: "all" },
    { label: "Flexible", value: "Flexible" },
    { label: "Lock", value: "Lock" },
    { label: "Strict", value: "Strict" },
  ];

  const statusOptions: { label: string; value: StatusFilter }[] = [
    { label: "Active Contributions", value: "active" },
    { label: "Inactive Contributions", value: "inactive" },
    { label: "All Contributions", value: "all" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md rounded-t-2xl bg-white p-6 shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" className="font-semibold text-gray-800">
                Filter Contributions
              </Typography>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <IoClose size={26} />
              </button>
            </div>

            <div className="mb-6">
              <Typography className="mb-3 text-base font-medium text-gray-700">
                Contribution Type
              </Typography>
              <div className="flex flex-wrap gap-2">
                {contributionOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setSelectedContributionType(option.value)}
                    variant={
                      selectedContributionType === option.value
                        ? "filled"
                        : "outlined"
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      selectedContributionType === option.value
                        ? "bg-text2 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Typography className="mb-3 text-base font-medium text-gray-700">
                Lock Type
              </Typography>
              <div className="flex flex-wrap gap-2">
                {lockOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setSelectedLockType(option.value)}
                    variant={
                      selectedLockType === option.value ? "filled" : "outlined"
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      selectedLockType === option.value
                        ? "bg-text2 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <Typography className="mb-3 text-base font-medium text-gray-700">
                Contribution Status
              </Typography>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setSelectedStatus(option.value)}
                    variant={
                      selectedStatus === option.value ? "filled" : "outlined"
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      selectedStatus === option.value
                        ? "bg-text2 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleReset}
                variant="outlined"
                className="flex-1 rounded-lg border border-gray-300 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Reset
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1 rounded-lg bg-text2 py-3 text-center font-semibold text-white transition-colors hover:bg-purple-700"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterContributions;
