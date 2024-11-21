import React, { useState } from "react";

const OtpPin = ({ onNext, onClose }: any) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e: any) => {
    setOtp(e.target.value);
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      onNext(otp);
    } else {
      alert("Please enter a 6-digit OTP");
    }
  };

  return (
    <main className="font-sans">
      <section className="flex flex-col gap-[1em] py-[2em]">
        <div className="flex flex-col gap-[1em] text-center">
          <header>
            <h1 className="text-2xl font-semibold">Verify OTP</h1>
          </header>

          <div className="mt-[1.5em]">
            <label htmlFor="otp" className="mb-3 flex font-semibold text-text2">
              Enter the six-digit OTP digit
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
              required
              className="input mb-5 h-[3em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
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
