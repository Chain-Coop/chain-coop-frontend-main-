import React from "react";
import { IoMdClose } from "react-icons/io";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const ConnectWallet: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute left-3 top-3 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={20} />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center">
          {/* Wallet Icon */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">

          </div>

          {/* Title */}
          <h2 className="mb-2 text-sm font-bold text-gray-800">
            Connect your wallet to fund your savings
          </h2>

          {/* Connect Button */}
          <button
            onClick={onConnect}
            className="mt-4 w-full rounded-lg bg-purple-600 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
