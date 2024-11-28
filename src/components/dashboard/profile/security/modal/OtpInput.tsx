import React, { useState } from "react";
import OtpPin from "../../../../../shared/utils/OtpInput";
import { Primary } from "../../../../common/Button";

const OtpInput = ({ otp, setOtp, onClose, onOtpEntered }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    onOtpEntered();
  };

  return (
    <div className="py-[2em] text-center lg:w-[25em]">
      <h2 className="mb-2 text-2xl font-semibold">Reset Password</h2>
      <p className="mb-4 text-gray-600">Enter Your OTP code</p>

      <div className="mb-6 flex justify-center">
        <OtpPin length={6} value={otp} className="mt-[1em]" onChange={setOtp} />
      </div>

      <div className="space-y-3">
        <Primary
          onClick={handleContinue}
          className="m-auto w-[60%] rounded-full bg-text2 py-2 text-white"
          disabled={isLoading}
        >
          Continue
        </Primary>
      </div>
    </div>
  );
};

export default OtpInput;
