import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

export type ContributionTypeFilter = "all" | "periodic" | "oneTime";
export type LockTypeFilter = "all" | 0 | 1 | 2;

export interface SavingsFilters {
  contributionType: ContributionTypeFilter;
  lockType: LockTypeFilter;
}

interface FilterSavingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: SavingsFilters;
  onApplyFilters: (filters: SavingsFilters) => void;
}

const FilterSavings: React.FC<FilterSavingsProps> = ({
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

  useEffect(() => {
    if (isOpen) {
      setSelectedContributionType(currentFilters.contributionType);
      setSelectedLockType(currentFilters.lockType);
    }
  }, [isOpen, currentFilters]);

  const handleApply = () => {
    onApplyFilters({
      contributionType: selectedContributionType,
      lockType: selectedLockType,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedContributionType("all");
    setSelectedLockType("all");
    // Optionally apply immediately or wait for explicit apply
    // onApplyFilters({ contributionType: 'all', lockType: 'all' });
    // onClose();
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
    { label: "Auto Savings", value: "periodic" },
    { label: "One-Time Savings", value: "oneTime" },
  ];

  const lockOptions: { label: string; value: LockTypeFilter }[] = [
    { label: "All Locks", value: "all" },
    { label: "Flexible", value: 0 },
    { label: "Lock", value: 1 },
    { label: "Strict Lock", value: 2 },
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
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Filter Savings
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <IoClose size={26} />
              </button>
            </div>

            {/* Contribution Type Filter */}
            <div className="mb-6">
              <h3 className="mb-3 text-base font-medium text-gray-700">
                Contribution Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {contributionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedContributionType(option.value)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      selectedContributionType === option.value
                        ? "bg-text2 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lock Type Filter */}
            <div className="mb-8">
              <h3 className="mb-3 text-base font-medium text-gray-700">
                Lock Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {lockOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedLockType(option.value)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      selectedLockType === option.value
                        ? "bg-text2 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 rounded-lg border border-gray-300 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-1 rounded-lg bg-text2 py-3 text-center font-semibold text-white transition-colors hover:bg-purple-700"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterSavings;
