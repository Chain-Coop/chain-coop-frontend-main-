import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { Primary } from "../../../../common/Button";

const OtpInput = ({ otp, setOtp, onClose, onOtpEntered }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePinChange = (value: any) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setOtp(numericValue);
    setError("");
  };

  const handleContinue = () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    onOtpEntered();
  };

  return (
    <div className="w-[25em] py-[2em] text-center">
      <h2 className="mb-2 text-2xl font-semibold">Reset Password</h2>
      <p className="mb-4 text-gray-600">Enter Your OTP code</p>

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
