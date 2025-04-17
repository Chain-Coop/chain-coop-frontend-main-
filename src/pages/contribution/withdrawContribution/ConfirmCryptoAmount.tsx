import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import PinModal from "../../../components/common/PinModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../shared/redux/store";
import { WithdrawUserPool } from "../../../shared/redux/slices/web3.slices";
import Success from "../../../components/common/Success";

const ConfirmCryptoAmount: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { amount, poolIndex, symbol } = location.state || {
    amount: "0.00",
    poolIndex: null,
    symbol: null,
  };

  const poolId_bytes = poolIndex;

  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = () => {
    setIsPinModalOpen(true);
  };

  const handlePinSubmit = async (enteredPin: string) => {
    setLoading(true);
    setError("");

    setTimeout(async () => {
      if (enteredPin === "1234") {
        try {
          console.log("Dispatching WithdrawUserPool with:", {
            poolId_bytes,
            amount,
          });

          await dispatch(WithdrawUserPool({ poolId_bytes, amount })).unwrap();

          setLoading(false);
          setIsPinModalOpen(false);
          setIsSuccessModalOpen(true);
          console.log("Pool updated successfully!");
        } catch (err: any) {
          setLoading(false);
          setError(err.message || "Failed to withdraw pool. Please try again.");
        }
      } else {
        setLoading(false);
        setError("Invalid PIN. Please try again.");
      }
    }, 2000);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/dashboard/contribution");
  };

  return (
    <main className="pb-[1.5em]">
      {/* Header */}
      <header className="relative sm:mt-[0] lg:mt-[2em]">
        <div className="absolute left-5 top-5 flex-shrink-0">
          <IoIosArrowBack
            className="cursor-pointer text-white"
            size={30}
            onClick={() => navigate(-1)}
          />
        </div>
        <DashboardHeader className="flex items-center justify-center">
          Confirm Amount
        </DashboardHeader>
      </header>

      {/* Amount Section */}
      <section className="mt-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">${amount}</h2>
        <div className="mt-6 rounded-lg p-4">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-600">
              Amount to Crypto Wallet
            </p>
            <p className="text-sm font-semibold text-gray-800">{symbol} {amount}</p>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-600">
              Contribution Plan
            </p>
            <p className="text-sm font-semibold text-gray-800">Daily</p>
          </div>
        </div>
      </section>

      {/* Confirm Button */}
      <div className="mt-5 flex w-full items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          className="h-[52px] w-[60%] rounded bg-text2 py-3 font-black text-white hover:bg-[#4a1d7d]"
        >
          Fund ${amount}
        </motion.button>
      </div>

      {/* Pin Modal */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSubmit={handlePinSubmit}
        header="Enter PIN"
        title="Enter your 4-digit PIN to confirm"
        loading={loading}
        error={error}
        pin={pin}
        onPinChange={(value) => setPin(value)}
      />

      {/* Success Modal */}
      <Success
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title="Withdrawal Successful"
      />
    </main>
  );
};

export default ConfirmCryptoAmount;
