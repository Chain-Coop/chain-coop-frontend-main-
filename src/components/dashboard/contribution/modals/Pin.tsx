import React, { useState, useRef } from "react";
import { Button } from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import Success from "./Success";

interface PinModalProps {
  pin: string;
  setPin: (pin: string) => void;
  formData: any;
  onSubmit: (formData: any, pin: string) => void;
  onClose: () => void;
}

const Pin: React.FC<PinModalProps> = ({
  pin,
  setPin,
  formData,
  onSubmit,
  onClose,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleSend = () => {
    if (pin.length !== 4) {
      alert("Please enter a valid 4-digit PIN.");
      return;
    }

    onSubmit(formData, pin);
    setPin("");
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newPin = pin.split("");
    newPin[index] = value;
    setPin(newPin.join(""));

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
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

          <h2 className="mb-4 text-center text-xl font-bold">
            My Chain Co-op Pin
          </h2>
          <p className="mb-4 text-center text-sm text-gray-500">
            Enter your transaction pin
          </p>

          <div className="flex justify-center gap-2">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="password"
                maxLength={1}
                value={pin[index] || ""}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el!)}
                className="h-12 w-12 rounded-md border border-gray-300 text-center text-lg focus:border-text2 focus:outline-none"
              />
            ))}
          </div>

          <Button
            onClick={handleSend}
            className="mt-6 w-full rounded-2xl bg-text2 py-2 text-white"
          >
            Send
          </Button>
        </div>
      </div>

      {showSuccess && <Success onClose={handleCloseSuccess} />}
    </>
  );
};

export default Pin;
