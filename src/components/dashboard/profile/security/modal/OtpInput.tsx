import React, { useState } from "react";
import OtpPin from "../../../../../shared/utils/OtpInput";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

interface OtpInputProps {
  otp: string;
  setOtp: (otp: string) => void;
  onClose: () => void;
  onOtpEntered: () => void;
  isOpen: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  otp,
  setOtp,
  onClose,
  onOtpEntered,
  isOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setIsLoading(true);
    onOtpEntered();
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
      className="bg-[#E9E9E9] p-4 sm:p-6"
    >
      <DialogHeader className="flex flex-col justify-center text-center">
        <Typography variant="h4" className="text-xl font-semibold sm:text-2xl">
          Reset Password
        </Typography>
        <Typography
          color="gray"
          className="mt-1 text-sm font-normal sm:text-base"
        >
          Enter Your OTP code
        </Typography>
      </DialogHeader>

      <DialogBody>
        <div className="mb-4 flex justify-center sm:mb-6">
          <OtpPin
            length={6}
            value={otp}
            className="mt-2 sm:mt-4"
            onChange={setOtp}
            gap={1}
          />
        </div>

        {error && (
          <Typography color="red" className="text-center text-xs sm:text-sm">
            {error}
          </Typography>
        )}
      </DialogBody>

      <DialogFooter className="flex justify-center">
        <Button
          variant="filled"
          onClick={handleContinue}
          disabled={isLoading}
          loading={isLoading}
          className="w-full rounded-full bg-text2 text-sm font-normal normal-case sm:w-[60%] sm:py-3 lg:py-2"
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default OtpInput;
