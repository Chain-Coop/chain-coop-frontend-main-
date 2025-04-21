import React from "react";
import { IoMdClose } from "react-icons/io";

interface SuccessModalProps {
  onClose: () => void;
}

const Success: React.FC<SuccessModalProps> = ({ onClose }) => {
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

        {/* Success Content */}
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold">
            Payment Successful
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Success;
