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
    onOtpEntered();
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
      className="bg-[#E9E9E9] p-4"
    >
      <DialogHeader className="flex flex-col justify-center">
        <Typography variant="h4" className="font-semibold">
          Reset Password
        </Typography>
        <Typography color="gray" className="font-normal">
          Enter Your OTP code
        </Typography>
      </DialogHeader>

      <DialogBody>
        <div className="mb-6 flex justify-center">
          <OtpPin length={6} value={otp} className="mt-4" onChange={setOtp} />
        </div>

        {error && (
          <Typography color="red" className="text-center text-sm">
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
          className="w-[60%] rounded-full bg-text2 py-3 text-sm font-normal normal-case"
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default OtpInput;
