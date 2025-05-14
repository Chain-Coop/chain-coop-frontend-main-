import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../shared/redux/store";
import OtpPin from "../../../../../shared/utils/OtpInput";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { VerifyUserAuth } from "../../../../../shared/redux/slices/landing.slices";
import { toast } from "react-toastify";

interface OtpInputProps {
  otp: string;
  setOtp: (otp: string) => void;
  onClose: () => void;
  onOtpEntered: () => void;
  isOpen: boolean;
  email: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  otp,
  setOtp,
  onClose,
  onOtpEntered,
  isOpen,
  email,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.landing);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setError("");

    try {
      const response = await dispatch(VerifyUserAuth({ otp, email })).unwrap();
      if (response.landing.msg === "Your account has been activated") {
        onOtpEntered();
      } else {
        const errorMsg =
          response.landing.msg || "Invalid OTP. Please try again.";
        setError(errorMsg);
        setOtp("");
        toast.error(errorMsg);
      }
    } catch (error: any) {
      const errorMsg = error?.msg || "Failed to verify OTP. Please try again.";
      setError(errorMsg);
      setOtp("");
      toast.error(errorMsg);
    }
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
      className="bg-[#E9E9E9] p-4 sm:p-6"
      dismiss={{ enabled: false }}
    >
      <DialogHeader className="relative flex flex-col justify-center text-center">
        <IconButton
          variant="text"
          color="gray"
          onClick={onClose}
          className="absolute left-2 top-2 h-10 w-10 p-2"
          ripple={false}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <IoMdClose size={24} className="m-auto text-gray-700" />
        </IconButton>

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
          className="flex w-full justify-center rounded-full bg-text2 text-sm font-normal normal-case sm:w-[60%] sm:py-3 lg:py-2"
        >
          Continue
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default OtpInput;
