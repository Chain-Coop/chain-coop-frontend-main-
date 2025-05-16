import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";
import { AppDispatch } from "../../shared/redux/store";
import {
  ResendEmailOtp,
  resetAuthState,
  VerifyUserAuth,
} from "../../shared/redux/slices/landing.slices";
import { ResendEmailOtpRequest, VerifyEmailRequest } from "../../shared/types";
import { clearMessage } from "../../shared/redux/slices/message.slices";
import OtpInput from "../../shared/utils/OtpInput";
import { RootState } from "../../shared/redux/rootReducer";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string>("");
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [submittedOtp, setSubmittedOtp] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, verifyEmailSuccess } = useSelector(
    (state: RootState) => state.landing,
  );

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const phoneNumber = queryParams.get("phoneNumber");
  const userId = queryParams.get("userId");

  useEffect(() => {
    dispatch(resetAuthState());
    dispatch(clearMessage());

    return () => {
      dispatch(resetAuthState());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!email || !phoneNumber || !userId) {
      toast.error("Invalid verification link. Please try registering again.");
      navigate("/create-account");
    }
  }, [email, phoneNumber, userId, navigate]);

  useEffect(() => {
    if (otp.length === 6 && !submittedOtp && email) {
      setSubmittedOtp(true);
      dispatch(resetAuthState());
      dispatch(VerifyUserAuth({ otp, email } as VerifyEmailRequest));
    }
  }, [otp, submittedOtp, email, dispatch]);

  useEffect(() => {
    if (verifyEmailSuccess) {
      toast.success("Email verified successfully");
      navigate(
        `/verify-phone-number?phoneNumber=${encodeURIComponent(phoneNumber!)}&userId=${userId!}`,
      );
      dispatch(resetAuthState());
    }
    if (error && submittedOtp) {
      toast.error(error);
      setOtp("");
      setSubmittedOtp(false);
    }
  }, [
    verifyEmailSuccess,
    error,
    navigate,
    phoneNumber,
    userId,
    submittedOtp,
    dispatch,
  ]);

  useEffect(() => {
    const countdown =
      resendTimer > 0 &&
      setInterval(() => setResendTimer(resendTimer - 1), 1000);
    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [resendTimer]);

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email is missing. Please try registering again.");
      return;
    }

    dispatch(resetAuthState());

    dispatch(ResendEmailOtp({ email } as ResendEmailOtpRequest))
      .unwrap()
      .then((response) => {
        toast.success(response.msg);
        setResendTimer(30);
        setOtp("");
        setSubmittedOtp(false);
      })
      .catch(() => {});
  };

  const getButtonText = () => {
    if (isLoading && !submittedOtp) return "Sending OTP...";
    if (resendTimer > 0) return `Resend OTP (${resendTimer}s)`;
    return "Resend OTP";
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log">
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
            onClick={handleResendOtp}
            disabled={isLoading || resendTimer > 0}
            className="m-auto mt-6 flex w-[12em] justify-center rounded-full bg-text2 px-2 py-3 text-center font-medium normal-case text-text5 disabled:opacity-50 sm:text-lg lg:mt-[2em]"
          >
            {getButtonText()}
          </Button>

          {isLoading && (
            <p className="mt-2 text-sm text-gray-600">
              {submittedOtp ? "Verifying OTP..." : "Processing..."}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default VerifyEmail;
