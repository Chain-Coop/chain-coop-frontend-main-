import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";
import { AppDispatch } from "../../shared/redux/store";
import { VerifyUserAuth } from "../../shared/redux/slices/landing.slices";
import { RESEND_LOGIN_OTP } from "../../shared/redux/services/landing.services";
import OtpInput from "../../shared/utils/OtpInput";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
    if (otpValue.length === 6) {
      verifyUserData(otpValue);
    }
  };

  const verifyUserData = (otpValue: string) => {
    setIsVerifying(true);
    dispatch(VerifyUserAuth({ otp: otpValue, email }))
      .unwrap()
      .then(() => {
        setIsVerifying(false);
        toast.success("e-mail verified successfully");
        navigate("/verify-phone-number");
      })
      .catch((error) => {
        setIsVerifying(false);
        setOtp("");
        toast.error(error);
      });
  };

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

  const ResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await RESEND_LOGIN_OTP("/auth/resend_otp", { email });
      toast.success(response.data.msg);
      startResendTimer();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log ">
      <section className="text-center md:w-[55%]">
        <div className="px-[2em]">
          <p className="font-medium text-howtext md:text-lg lg:text-base">
            Enter the OTP code sent to your mail to complete your registration.
          </p>

          <div className="flex justify-center rounded-lg border-gray-200 px-3 py-2">
            <div className="flex space-x-5" data-hs-pin-input="">
              <OtpInput
                length={6}
                value={otp}
                className="mt-[1em]"
                onChange={handleOtpChange}
              />
            </div>
          </div>

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

export default VerifyEmail;
