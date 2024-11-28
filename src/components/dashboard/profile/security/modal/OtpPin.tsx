import React, { useState } from "react";
import OtpInput from "../../../../../shared/utils/OtpInput";

const OtpPin = ({ onNext, onClose }: any) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    onNext(otp);
  };

  return (
    <main className="font-sans lg:w-[25em]">
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
              <OtpInput
                length={6}
                value={otp}
                className="mt-[1em]"
                onChange={setOtp}
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
