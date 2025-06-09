import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";
import { AppDispatch } from "../../shared/redux/store";
import OtpInput from "../../shared/utils/OtpInput";
import { RootState } from "../../shared/redux/rootReducer";
import {
  ResendVerifyOtp,
  resetAuthState,
  VerifyUserPhoneNumber,
} from "../../shared/redux/slices/landing.slices";
import { ResendVerifyOtpRequest, VerifyPhoneRequest } from "../../shared/types";
import { clearMessage } from "../../shared/redux/slices/message.slices";
import { FaArrowLeft } from "react-icons/fa6";

const VerifyPhoneNumber = () => {
  const [code, setCode] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [isResending, setIsResending] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, verifyPhoneSuccess } = useSelector(
    (state: RootState) => state.landing,
  );

  const queryParams = new URLSearchParams(location.search);
  const rawPhoneNumber = queryParams.get("phoneNumber") || "";
  const userId = queryParams.get("userId");

  const formatPhoneNumber = (phone: string): string => {
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

  useEffect(() => {
    if (!phoneNumber || !userId) {
      toast.error("Invalid verification link. Please try registering again.");
      navigate("/create-account");
    }
  }, [phoneNumber, userId, navigate]);

  useEffect(() => {
    if (verifyPhoneSuccess) {
      toast.success("Phone number verified successfully");
      navigate("/login");
    }
    if (error) {
      toast.error(error);
      setCode("");
    }
  }, [verifyPhoneSuccess, error, navigate]);

  const handleOtpChange = (otpValue: string) => {
    setCode(otpValue);
    if (otpValue.length === 6 && phoneNumber && userId) {
      dispatch(
        VerifyUserPhoneNumber({
          otp: otpValue,
          userId,
          phoneNumber,
        } as VerifyPhoneRequest),
      );
    }
  };

  const handleResendOtp = () => {
    if (!phoneNumber) {
      toast.error("Phone number is missing. Please try registering again.");
      return;
    }
    setIsResending(true);
    dispatch(ResendVerifyOtp({ phoneNumber } as ResendVerifyOtpRequest))
      .unwrap()
      .then((response) => {
        toast.success(response.msg);
        startResendTimer();
      })
      .catch(() => {
        // Error handled by useEffect
      })
      .finally(() => {
        setIsResending(false);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <main className="flex h-screen items-center justify-center bg-log">
      <div
        className="absolute left-0 top-0 ml-[4em] mt-[4em] cursor-pointer sm:hidden lg:block"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft size={35} fill="#440080" />
      </div>
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
            onClick={handleResendOtp}
            loading={isLoading || isResending}
            disabled={isLoading || isResending || resendDisabled}
            className="m-auto mt-6 flex w-[12em] justify-center rounded-full bg-text2 px-2 py-3 text-center font-medium normal-case text-text5 disabled:opacity-50 sm:text-lg lg:mt-[2em]"
          >
            {isResending
              ? "Resending..."
              : resendDisabled
                ? `Send OTP (${resendTimer}s)`
                : "Send OTP"}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default VerifyPhoneNumber;
