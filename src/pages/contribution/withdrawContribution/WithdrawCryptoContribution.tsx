import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import WithdrawExternalModal from "./modals/WithdrawExternalModal";

const WithdrawCryptoContribution: React.FC = () => {
  const location = useLocation();
  const { poolIndex, symbol, amount } = location.state || {};
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isExternalWalletModalOpen, setIsExternalWalletModalOpen] =
    useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === "crypto") {
      navigate(
        "/dashboard/contribution/withdraw_contribution/confirm_crypto_amount",
        {
          state: { poolIndex, symbol, amount },
        },
      );
    } else if (option === "external") {
      setIsExternalWalletModalOpen(true);
    }
  };

  const handleExternalModalSubmit = (data: { walletAddress: string }) => {
    console.log("Withdraw Data:", data);
  };

  return (
    <main className="">
      {/* Header */}
      <header className="relative sm:mt-[0] lg:mt-[2em]">
        <div className="absolute left-0 top-5 flex-shrink-0">
          <IoIosArrowBack
            className="cursor-pointer text-white"
            size={30}
            onClick={() => navigate(-1)}
          />
        </div>
        <DashboardHeader className="flex items-center justify-center">
          Select Withdraw Option
        </DashboardHeader>
      </header>

      {/* Options */}
      <section className="mt-6 px-0">
        <div
          className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 ${
            selectedOption === "crypto" ? "border-[#5E249D]" : "border-gray-300"
          }`}
          onClick={() => handleOptionSelect("crypto")}
        >
          <div>
            <h2 className="font-bold text-text1">Withdraw to Crypto Wallet</h2>
            <p className="text-sm text-gray-500">
              Funds will be moved to your existing wallet
            </p>
          </div>
          <motion.div
            className={`h-4 w-4 rounded-full border ${
              selectedOption === "crypto" ? "bg-[#5E249D]" : "border-gray-300"
            }`}
          />
        </div>

        <div
          className={`mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 ${
            selectedOption === "external" ? "border-text2" : "border-gray-300"
          }`}
          onClick={() => handleOptionSelect("external")}
        >
          <div>
            <h2 className="font-bold text-text1">
              Withdraw to External Wallet
            </h2>
            <p className="text-sm text-gray-500">
              Wallet address will be needed
            </p>
          </div>
          <motion.div
            className={`h-4 w-4 rounded-full border ${
              selectedOption === "external" ? "bg-text2" : "border-gray-300"
            }`}
          />
        </div>
      </section>

      {/* Continue Button */}
      <div className="w-full bg-white py-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!selectedOption}
          onClick={() => {
            if (selectedOption === "external") {
              setIsExternalWalletModalOpen(true);
            }
          }}
          className={`w-full rounded-lg py-3 text-sm font-semibold ${
            selectedOption ? "bg-text2 text-white" : "bg-[#C9A6E3] text-white"
          }`}
        >
          Continue
        </motion.button>
      </div>

      {/* External Wallet Modal */}
      <WithdrawExternalModal
        isOpen={isExternalWalletModalOpen}
        onClose={() => setIsExternalWalletModalOpen(false)}
        onSubmit={handleExternalModalSubmit}
      />
    </main>
  );
};

export default WithdrawCryptoContribution;
