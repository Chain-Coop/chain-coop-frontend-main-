import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface EarlyWithdrawalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amountAfterFee: number) => void;
  totalAmount: number;
  feePercentage: number;
  formattedEndDate?: string;
}

const EarlyWithdrawal: React.FC<EarlyWithdrawalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  feePercentage,
  formattedEndDate,
}) => {
  if (!isOpen) return null;

  const feeAmount = (totalAmount * feePercentage) / 100;
  const amountAfterFee = totalAmount - feeAmount;

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };
  const modalVariants = {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 22,
        duration: 0.32,
      },
    },
    exit: { opacity: 0, y: 40, scale: 0.98, transition: { duration: 0.15 } },
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleConfirmClick = () => {
    onConfirm(amountAfterFee);
  };

  return (
    <motion.div
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <motion.div
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl lg:p-8"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text2 md:text-2xl">
            Early Withdrawal Confirmation
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 text-sm text-gray-700 md:text-base">
          <p>
            Withdrawing from this 'Lock Savings' plan before the end date (
            {formattedEndDate && formattedEndDate !== "--/--/----"
              ? `${formattedEndDate}`
              : ""}
            ) will incur a fee of{" "}
            <span className="font-semibold">{feePercentage}%</span> of your
            current contribution balance.
          </p>
          <p>
            Current Balance:{" "}
            <span className="font-semibold">
              $
              {totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
          <p>
            Early Withdrawal Fee ({feePercentage}%):{" "}
            <span className="font-semibold text-red-600">
              -$
              {feeAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
          <p className="border-t border-gray-200 pt-3 font-bold text-text2">
            Amount after fee:{" "}
            <span className="font-semibold">
              $
              {amountAfterFee.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
          <p>Do you wish to proceed with the withdrawal?</p>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmClick}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          >
            Confirm Withdrawal
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EarlyWithdrawal;
