import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";
import { AppDispatch } from "../../shared/redux/store";
import OtpInput from "../../shared/utils/OtpInput";
import { kycWhatsAppOtp, VerifykycWhatsAppOtp } from "../../shared/redux/slices/kyc.slices";

const VerifyPhoneNumber = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [code, setCode] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);

  const handleOtpChange = (otpValue: string) => {
    setCode(otpValue);
    if (otpValue.length === 6) {
      verifyUserData(otpValue);
    }
  };

  const verifyUserData = (otpValue: string) => {
    setIsVerifying(true);
    dispatch(VerifykycWhatsAppOtp({ code: otpValue }))
      .unwrap()
      .then(() => {
        setIsVerifying(false);
        toast.success("phone number verified successfully");
        navigate("/login");
      })
      .catch((error) => {
        setIsVerifying(false);
        setCode("");
        toast.error(error);
      });
  };

  const [timeLeft, setTimeLeft] = useState(360);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const ResendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (timeLeft > 0) return;

    setIsResending(true);
    try {
      const response = await dispatch(kycWhatsAppOtp()).unwrap();
      toast.success(response.message);
      setTimeLeft(360);
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
