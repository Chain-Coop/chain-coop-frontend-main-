import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface WithdrawExternalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { walletAddress: string }) => void;
}

const WithdrawExternalModal: React.FC<WithdrawExternalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [walletAddress, setWalletAddress] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ walletAddress });
    onClose();
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
            Withdraw to External Wallet
          </h2>
        </div>

        {/* Description */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Wallet address is required to transfer funds
        </p>

        {/* Wallet Address Input */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-600">
            Wallet Address
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E249D]"
            />
            <button
              className="absolute right-3 top-3 text-[#5E249D]"
              onClick={() => navigator.clipboard.writeText(walletAddress)}
            >
              📋
            </button>
          </div>
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

export default WithdrawExternalModal;
