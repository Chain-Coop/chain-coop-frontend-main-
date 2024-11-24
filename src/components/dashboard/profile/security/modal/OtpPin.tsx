import React, { useState } from "react";
import OTPInput from "react-otp-input";

const OtpPin = ({ onNext, onClose }: any) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handlePinChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setOtp(numericValue);
    setError("");
  };

  const handleSubmit = () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    onNext(otp);
  };

  return (
    <main className="w-[25em] font-sans">
      <section className="flex flex-col gap-[1em] py-[2em]">
        <div className="flex flex-col gap-[1em] text-center">
          <header>
            <h1 className="text-2xl font-semibold">Verify OTP</h1>
            <p className="text-center font-semibold text-text2">
              Enter the six-digit OTP digit
            </p>
          </header>

          <div className="mt-[1em] flex flex-col  items-center justify-center">
            <div className="mb-6 flex justify-center">
              <OTPInput
                value={otp}
                onChange={handlePinChange}
                numInputs={6}
                renderSeparator={<span className="mx-2">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="!h-11 !w-11 rounded-md border-gray-200 bg-gray-100 text-center text-xl"
                    type="text"
                    inputMode="numeric"
                  />
                )}
              />
            </div>

            {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
          </div>

          <button
            onClick={handleSubmit}
            className="relative m-auto flex w-[55%] justify-center rounded-full bg-text2 p-[11px] font-medium text-text5"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default OtpPin;
