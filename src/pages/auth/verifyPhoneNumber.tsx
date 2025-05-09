import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";
import { AppDispatch } from "../../shared/redux/store";
import OtpInput from "../../shared/utils/OtpInput";
import { VerifyUserPhoneNumber } from "../../shared/redux/slices/landing.slices";
import { RESEND_VERIFY_OTP } from "../../shared/redux/services/landing.services";

const VerifyPhoneNumber = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const dispatch: AppDispatch = useDispatch();

  const startResendTimer = () => {
    setResendDisabled(true);
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const queryParams = new URLSearchParams(location.search);
  const rawPhoneNumber = queryParams.get("phoneNumber") || "";
  const userId = queryParams.get("userId");

  const formatPhoneNumber = (phone: string) => {
    const trimmedPhone = phone.trim();

    if (trimmedPhone.startsWith("+")) {
      return trimmedPhone;
    }

    if (/^\d{1,3}\d+$/.test(trimmedPhone)) {
      return `+${trimmedPhone}`;
    }

    return trimmedPhone;
  };

  const phoneNumber = formatPhoneNumber(rawPhoneNumber);

  const handleOtpChange = (otpValue: string) => {
    setCode(otpValue);
    if (otpValue.length === 6) {
      verifyUserData(otpValue);
    }
  };

  const verifyUserData = (otpValue: string) => {
    setIsVerifying(true);
    dispatch(
      VerifyUserPhoneNumber({
        otp: otpValue,
        userId,
        phoneNumber,
      }),
    )
      .unwrap()
      .then(() => {
        setIsVerifying(false);
        toast.success("Phone number verified successfully");
        navigate("/login");
      })
      .catch((error) => {
        setIsVerifying(false);
        setCode("");
        toast.error(error);
      });
  };

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
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const ResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await RESEND_VERIFY_OTP("/auth/resend_whatsapp_otp", {
        phoneNumber,
      });
      toast.success(response.data.msg);
      startResendTimer();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log">
      <section className="text-center md:w-[55%]">
        <div className="px-[2em]">
          <p className="font-medium text-howtext md:text-lg lg:text-base">
            Enter the OTP code sent to your registered phone number to complete
            your registration.
          </p>

          <div className="flex justify-center rounded-lg border-gray-200 px-3 py-2">
            <div className="flex space-x-5" data-hs-pin-input="">
              <OtpInput
                length={6}
                value={code}
                className="mt-[1em]"
                onChange={handleOtpChange}
              />
            </div>
          </div>

          {timeLeft > 0 && (
            <p className="mt-3 text-gray-600">
              Resend available in {formatTime(timeLeft)}
            </p>
          )}

          <Button
            onClick={ResendOtp}
            disabled={isVerifying || isResending || resendDisabled}
            className="m-auto mt-6 flex w-[12em] justify-center rounded-full bg-text2 px-2 py-3 text-center font-medium normal-case text-text5 disabled:opacity-50 sm:text-lg lg:mt-[2em]"
          >
            {isResending
              ? "Resending..."
              : resendDisabled
                ? `Resend OTP (${resendTimer}s)`
                : "Resend OTP"}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default VerifyPhoneNumber;
