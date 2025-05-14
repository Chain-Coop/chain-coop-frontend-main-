import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface WithdrawInternalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { amount: string }) => void;
  poolIndex: number | string;
}

const WithdrawInternalModal: React.FC<WithdrawInternalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  poolIndex,
}) => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ amount });
    onClose();
    navigate(
      "/dashboard/contribution/withdraw_contribution/confirm_crypto_amount",
      {
        state: { amount, poolIndex },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <IoIosArrowBack
            size={24}
            className="cursor-pointer text-[#5E249D]"
            onClick={onClose}
          />
          <h2 className="flex-1 text-center text-lg font-bold text-[#5E249D]">
            Withdraw to Internal Wallet
          </h2>
        </div>

        {/* Amount Input */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-600">
            Enter Amount
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$1000"
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E249D]"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full rounded-lg bg-[#5E249D] py-3 text-sm font-semibold text-white hover:bg-[#4a1d7d]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default WithdrawInternalModal;
