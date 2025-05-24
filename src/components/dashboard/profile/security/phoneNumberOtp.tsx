import { useState, useEffect } from "react";
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
import OtpPin from "../../../../shared/utils/OtpInput";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../shared/redux/store";
import { toast } from "react-toastify";
import {
  VerifyUserPhoneNumber,
  ResendVerifyOtp,
} from "../../../../shared/redux/slices/landing.slices";
import { useUserProfile } from "../../../../shared/Hooks/useUserProfile";

interface PhoneNumberOtpProps {
  otp: string;
  setOtp: (otp: string) => void;
  onClose: () => void;
  onOtpEntered: () => void;
  isOpen: boolean;
}

const PhoneNumberOtp: React.FC<PhoneNumberOtpProps> = ({
  otp,
  setOtp,
  onClose,
  onOtpEntered,
  isOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const { profileDetails } = useUserProfile();
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setResendDisabled(false);
      setTimeLeft(60);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, timeLeft]);

  const handleContinue = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await dispatch(
        VerifyUserPhoneNumber({
          otp,
          userId: profileDetails?.id || "",
          phoneNumber: profileDetails?.phoneNumber || "",
        }),
      ).unwrap();
      if (response) {
        toast.success("OTP verified successfully");
        onOtpEntered();
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error: any) {
      const errorMessage = error || "Invalid OTP. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!profileDetails?.phoneNumber) {
      setError("Phone number is required");
      return;
    }

    setIsOtpSending(true);
    setError("");
    try {
      await dispatch(
        ResendVerifyOtp({ phoneNumber: profileDetails.phoneNumber }),
      ).unwrap();
      toast.success(`OTP sent to ${profileDetails.phoneNumber}`);
      setResendDisabled(true);
      setTimeLeft(60);
    } catch (error: any) {
      const errorMessage = error || "Failed to send OTP";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsOtpSending(false);
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
          disabled={isLoading || isOtpSending}
          ripple={false}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <IoMdClose size={24} className="m-auto text-gray-700" />
        </IconButton>
        <Typography variant="h4" className="text-xl font-semibold sm:text-2xl">
          Verify Phone Number
        </Typography>
        <Typography
          color="gray"
          className="mt-1 text-sm font-normal sm:text-base"
        >
          Enter the OTP sent to {profileDetails?.phoneNumber || "your phone"}
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
        <div className="mt-4 text-center">
          <button
            onClick={handleResendOtp}
            disabled={resendDisabled || isOtpSending || isLoading}
            className={`text-sm text-text2 ${
              resendDisabled || isOtpSending
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            type="button"
          >
            {resendDisabled
              ? `Resend OTP in ${timeLeft}s`
              : isOtpSending
                ? "Sending..."
                : "Resend OTP"}
          </button>
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          variant="filled"
          onClick={handleContinue}
          disabled={isLoading || isOtpSending || otp.length !== 6}
          loading={isLoading}
          className="flex w-full justify-center rounded-full bg-text2 text-sm font-normal normal-case sm:w-[60%] sm:py-3"
        >
          Verify OTP
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PhoneNumberOtp;
