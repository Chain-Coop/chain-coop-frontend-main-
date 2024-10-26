import React, { useState } from "react";
import OTPInput from "react-otp-input";
import ReactLoading from "react-loading";
import { Primary } from "../../../../common/Button";

const OtpInput = ({ otp, setOtp, onClose, onOtpEntered }:any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePinChange = (value:any) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setOtp(numericValue);
    setError("");
  };

  const handleContinue = () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    onOtpEntered(); 
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>
      <p className="text-gray-600 mb-4">
        Enter Your OTP code
      </p>
      
      <div className="mb-6 flex justify-center">
        <OTPInput
          value={otp}
          onChange={handlePinChange}
          numInputs={6}
          renderSeparator={<span className="mx-2">-</span>}
          renderInput={(props) => (
            <input
              {...props}
              className="!w-11 !h-11 text-center bg-gray-100 border-gray-200 rounded-md text-xl"
              type="text"
              inputMode="numeric"
            />
          )}
        />
      </div>

      <div className="space-y-3">
        <Primary
          onClick={handleContinue}
          className="w-full py-2 rounded-full bg-text2 text-white"
          disabled={isLoading}
        >
          Continue
        </Primary>
      </div>
    </div>
  );
};

export default OtpInput;