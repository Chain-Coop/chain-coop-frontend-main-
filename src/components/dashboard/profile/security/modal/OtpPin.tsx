//@ts-nocheck
import { useState } from "react";
import OtpInput from "../../../../../shared/utils/OtpInput";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

interface OtpPinProps {
  isOpen: boolean;
  onNext: (otp: string) => void;
  onClose?: () => void;
}

const OtpPin = ({ isOpen, onNext, onClose }: OtpPinProps) => {
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
    <Dialog
      open={isOpen}
      handler={onClose}
      animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}
      size="sm"
      className="overflow-y-auto p-7"
    >
      <DialogHeader className="flex flex-col gap-2 px-2 text-center sm:px-4">
        <Typography variant="h1" className="text-2xl font-semibold">
          Verify OTP
        </Typography>
        <Typography variant="small" className="font-semibold text-text2">
          Enter the six-digit OTP
        </Typography>
      </DialogHeader>
      <DialogBody className="flex flex-col items-center overflow-y-auto">
        <OtpInput
          length={6}
          value={otp}
          className="mt-[1em]"
          onChange={setOtp}
          gap={6}
        />
        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          onClick={handleSubmit}
          className="w-60 rounded-full bg-text2 text-white"
        >
          Next
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default OtpPin;
