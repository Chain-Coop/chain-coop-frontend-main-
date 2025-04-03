import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import Success from "./Success";

interface PinModalProps {
  pin: string;
  setPin: (pin: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const Pin: React.FC<PinModalProps> = ({ pin, setPin, onSubmit, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSend = () => {
    setShowSuccess(true);
    //onSubmit();
    setPin("");
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      {/* PIN Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute left-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={20} />
          </button>

          {/* Modal Title */}
          <h2 className="mb-4 text-center text-xl font-bold">
            My Chain Co-op Pin
          </h2>
          <p className="mb-4 text-center text-sm text-gray-500">
            Enter your transaction pin
          </p>

          {/* PIN Input Fields */}
          <div className="flex justify-center gap-2">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="password"
                maxLength={1}
                value={pin[index] || ""}
                onChange={(e) => {
                  const newPin = pin.split("");
                  newPin[index] = e.target.value;
                  setPin(newPin.join(""));
                }}
                className="h-12 w-12 rounded-md border border-gray-300 text-center text-lg focus:border-text2 focus:outline-none"
              />
            ))}
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            className="mt-6 w-full rounded-2xl bg-text2 py-2 text-white"
          >
            Send
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && <Success onClose={handleCloseSuccess} />}
    </>
  );
};

export default Pin;
