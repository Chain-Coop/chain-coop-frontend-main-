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
import { Button } from "@material-tailwind/react";

interface WhatsAppVerificationModalProps {
  reference: string;
  onClose: () => void;
  onBack: () => void;
  onVerificationSuccess: () => void;
}

const WhatsAppVerificationModal: React.FC<WhatsAppVerificationModalProps> = ({
  reference,
  onClose,
  onBack,
  onVerificationSuccess,
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
    <main className="w-full max-w-[30em] px-3 py-6 font-sans md:px-8 md:py-8">
      <section className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-2">
          <header className="text-center">
            <h2 className="text-lg font-bold leading-tight md:text-xl">
              Enter WhatsApp Verification Code
            </h2>
          </header>
          <article className="text-center">
            <p className="text-gray-600 sm:text-base">
              A 6 digit code has been sent to your WhatsApp
            </p>
          </article>
        </div>

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
      </section>

      <div className="mt-6 flex justify-center px-4">
        <Button
          variant="text"
          className="w-full max-w-md bg-text2 py-3 text-white transition-all hover:bg-text2/90"
          onClick={verifyCode}
          disabled={loading || code.length !== 6}
        >
          {loading ? (
            <div className="flex justify-center">
              <ReactLoading
                type="spin"
                color="#ffffff"
                height={20}
                width={20}
              />
            </div>
          ) : (
            "Verify"
          )}
        </Button>
      </div>
      <div className="mt-3">
        <button onClick={onBack} className="text-sm font-semibold text-red-500">
          Back
        </button>
      </div>
    </main>
  );
};

export default WhatsAppVerificationModal;
