import React, { useState, useEffect } from "react";
import useUserProfile from "../../../../../../../shared/Hooks/useUserProfile";
import OtpPin from "../../../../../../../shared/utils/OtpInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../shared/redux/store";
import {
  kycPhoneOtp,
  VerifykycPhoneOtp,
} from "../../../../../../../shared/redux/slices/kyc.slices";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Alert } from "@mui/material";

interface TierOneThirdDialogProps {
  open: boolean;
  reference: string;
  onClose: () => void;
  onSwitchToWhatsapp: () => void;
  onVerificationSuccess: () => void;
}

const TierOneThirdDialog: React.FC<TierOneThirdDialogProps> = ({
  open,
  onClose,
  onSwitchToWhatsapp,
  onVerificationSuccess,
  reference,
}) => {
  const { profileDetails } = useUserProfile();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(360);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await dispatch(
        VerifykycPhoneOtp({
          code: code,
          reference: reference,
        }),
      ).unwrap();
      onVerificationSuccess();
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (timeLeft > 0) return;

    setResendLoading(true);
    try {
      const response = await dispatch(kycPhoneOtp()).unwrap();
      toast.success(response.message);
      setTimeLeft(360);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="md" className="py-4">
      <DialogHeader className="justify-center">
        <Typography variant="h5">Phone Number Authentication</Typography>
      </DialogHeader>

      <DialogBody className="flex flex-col gap-6">
        <Typography className="text-center text-gray-600">
          A 6 digit sms code has been sent to this number
          <span className="font-semibold">{profileDetails.phoneNumber}</span>,
          Kindly enter the code
        </Typography>

        <div className="flex flex-col items-center gap-4">
          <OtpPin
            length={6}
            value={code}
            className="w-full max-w-md"
            onChange={(value) => setCode(value)}
          />

          <div>
            <div className="flex items-center justify-between">
              <Typography
                variant="small"
                className="font-semibold text-gray-500"
              >
                Time remaining: {formatTime(timeLeft)}
              </Typography>
              <Button
                variant="text"
                size="sm"
                onClick={getOtp}
                loading={resendLoading}
                disabled={timeLeft > 0 || resendLoading}
                className={`flex justify-center ${
                  timeLeft > 0 ? "cursor-default text-gray-400" : "text-text2"
                } hover:bg-transparent`}
              >
                <span className="text-sm font-semibold">
                  {timeLeft > 0 ? "Resend Code" : "Resend Code"}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {error && <Alert severity="error">{error}</Alert>}
      </DialogBody>

      <DialogFooter className="flex flex-col gap-2">
        <Button
          fullWidth
          loading={loading}
          onClick={verifyCode}
          disabled={loading || code.length !== 6}
          className="flex w-72 justify-center bg-text2 text-sm normal-case"
        >
          {!loading && "Verify"}
        </Button>

        <Typography className="text-center font-normal">
          Didn't receive code?{" "}
          <span
            onClick={onSwitchToWhatsapp}
            className="cursor-pointer font-medium text-text2"
          >
            Use a Whatsapp number instead
          </span>
        </Typography>
      </DialogFooter>
    </Dialog>
  );
};

export default TierOneThirdDialog;
