import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import { UpdateUserPool } from "../../../../shared/redux/slices/web3.slices";
import Success from "../../../../components/common/Success";
import { motion, AnimatePresence } from "framer-motion";

interface FundSavingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contribution: {
    poolIndex: string;
    tokenToSaveWith: string;
  };
}

const FundSavingsModal: React.FC<FundSavingsModalProps> = ({
  isOpen,
  onClose,
  contribution,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [amount, setAmount] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!amount) {
      setError("Please enter an amount.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await dispatch(
        UpdateUserPool({
          poolId_bytes: contribution.poolIndex,
          tokenAddressToSaveWith: contribution.tokenToSaveWith,
          amount,
        }),
      ).unwrap();

      setIsSuccessOpen(true);
      setAmount("");
    } catch (err: any) {
      setError(err.message || "Failed to update the pool. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30, duration: 0.35 },
    },
    exit: { opacity: 0, scale: 0.7, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {/* Main Fund Savings Modal */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
      >
        <div className="w-[90%] rounded-2xl bg-white p-6 lg:h-[452px] lg:w-[634px] lg:p-20">
          {/* Header */}
          <div className="flex items-center gap-0">
            <IoIosArrowBack
              size={24}
              className="cursor-pointer text-text2"
              onClick={onClose}
            />
            <h2 className="flex-1 text-center text-xl font-semibold text-text2 md:text-3xl">
              Fund Savings
            </h2>
          </div>

          {/* Description */}
          <p className="mt-4 text-center text-sm text-text1 md:text-lg">
            The deposit amount will be credited automatically from your Chain
            Co-op crypto wallet.
          </p>

          {/* Amount Input */}
          <div className="mt-6">
            <label className="block text-sm font-bold text-text1 md:text-lg">
              Enter Amount
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$1000"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-text2"
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-6 w-full rounded-lg py-3 text-base font-bold text-white md:text-xl ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-text2 hover:bg-[#4a1d7d]"
            }`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </motion.div>

      {/* Success Modal */}
      <Success
        isOpen={isSuccessOpen}
        onClose={handleSuccessClose}
        title="Funding Successful"
      />
    </AnimatePresence>
  );
};

export default FundSavingsModal;
