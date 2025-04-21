import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../shared/redux/store";
import OtpPin from "../../../../../../../shared/utils/OtpInput";
import ReactLoading from "react-loading";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import {
  kycWhatsAppOtp,
  VerifykycWhatsAppOtp,
} from "../../../../../../../shared/redux/slices/kyc.slices";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

interface WhatsAppVerificationModalProps {
  reference: string;
  onClose: () => void;
  onBack: () => void;
  onVerificationSuccess: () => void;
  open: boolean;
}

const WhatsAppVerificationModal: React.FC<WhatsAppVerificationModalProps> = ({
  reference,
  onClose,
  onBack,
  onVerificationSuccess,
  open,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(360);

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
        VerifykycWhatsAppOtp({
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

  const resendCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (timeLeft > 0) return;

    setResendLoading(true);
    try {
      const response = await dispatch(kycWhatsAppOtp()).unwrap();
      toast.success(response.message);
      setTimeLeft(360);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogHeader className="justify-center">
        <Typography
          variant="h2"
          className="text-lg font-bold leading-tight md:text-xl"
        >
          Enter WhatsApp Verification Code
        </Typography>
      </DialogHeader>

      <DialogBody className="flex flex-col gap-4 md:gap-6">
        <article className="text-center">
          <Typography variant="small" className="text-gray-600 sm:text-base">
            A 6 digit code has been sent to your WhatsApp
          </Typography>
        </article>

        <div className="flex flex-col items-center gap-4">
          <OtpPin
            length={6}
            value={code}
            className="w-full max-w-md"
            onChange={(value) => setCode(value)}
          />

          <div className="w-full max-w-md px-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-500 md:text-base">
                Time remaining: {formatTime(timeLeft)}
              </p>
              <button
                onClick={resendCode}
                disabled={timeLeft > 0 || resendLoading}
                className={`text-sm font-semibold md:text-base ${
                  timeLeft > 0
                    ? "cursor-not-allowed text-gray-400"
                    : "cursor-pointer text-text2 hover:text-text2/80"
                }`}
              >
                {resendLoading ? (
                  <ReactLoading
                    type="spin"
                    color="#000000"
                    height={16}
                    width={16}
                  />
                ) : (
                  "Resend Code"
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <Alert severity="error" className="mt-2">
            {error}
          </Alert>
        )}

        <div className="mt-6 flex justify-center px-4">
          <Button
            variant="text"
            loading={loading}
            className="w-full max-w-md bg-text2 py-3 normal-case text-white transition-all hover:bg-text2/90"
            onClick={verifyCode}
            disabled={loading || code.length !== 6}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </DialogBody>

      <DialogFooter className="justify-center">
        <button onClick={onBack} className="text-sm font-semibold text-red-500">
          Back
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default WhatsAppVerificationModal;
