import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GeneratePinOTP } from "../../../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../../../shared/redux/store";
import usePasswordToggle from "../../../../../shared/utils/usePasswordToggle";

const GeneratePin = ({ onClose }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, togglePasswordType] = usePasswordToggle();
  const dispatch: AppDispatch = useDispatch();

  const handleGenerateOTP = async () => {
    setIsLoading(true);
    try {
      await dispatch(GeneratePinOTP()).unwrap();
      onClose();
    } catch (message) {
      console.error("Failed to generate OTP", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="font-sans">
      <section className="flex flex-col gap-[1em] py-[2em]">
        <div className="text-center">
          <header>
            <h1 className="text-2xl font-semibold">Change Card Pin</h1>
          </header>
          <section className="mt-[1.5em]">
            <p>Have you forgotten or lost your pin.</p>
            <p>Click on the link below to generate an OTP to change pin.</p>
          </section>
        </div>
        <div className="mt[1.5em] flex justify-center">
          <button
            onClick={handleGenerateOTP}
            disabled={isLoading}
            className={`text-center text-lg font-semibold text-text2 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </div>
            ) : (
              "Generate OTP"
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default GeneratePin;
