import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import OtpInput from "../../shared/utils/OtpInput";
import { useDispatch, useSelector } from "react-redux";
import {
  ResendEmailOtp,
  resetAuthState,
  VerifyUserAuth,
} from "../../shared/redux/slices/landing.slices";
import { ResendEmailOtpRequest } from "../../shared/types";
import { AppDispatch } from "../../shared/redux/store";
import { RootState } from "../../shared/redux/rootReducer";

const ResetPassword = () => {
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState("");
  const [submittedOtp, setSubmittedOtp] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, verifyEmailSuccess, error } = useSelector(
    (state: RootState) => state.landing,
  );

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  useEffect(() => {
    dispatch(resetAuthState());
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (otp.length === 6 && !submittedOtp) {
      setSubmittedOtp(true);
      handleSubmit();
    }
  }, [otp]);

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [timer]);

  useEffect(() => {
    if (verifyEmailSuccess) {
      navigate(`/new-password?email=${email}`);
      toast.success("OTP verification successful");
      dispatch(resetAuthState());
    }
  }, [verifyEmailSuccess, email, navigate, dispatch]);

  useEffect(() => {
    if (error && submittedOtp) {
      toast.error(error || "Invalid OTP. Please try again.");
      setOtp("");
      setSubmittedOtp(false);
    }
  }, [error]);

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
        setTimer(30);
        setOtp("");
        setSubmittedOtp(false);
      })
      .catch((err) => {
        // Error already handled by Redux and useEffect
      });
  };

  const handleSubmit = () => {
    dispatch(resetAuthState());

    dispatch(
      VerifyUserAuth({
        email: email || "",
        otp,
      }),
    );
  };

  const getButtonText = () => {
    if (isLoading) return "Sending OTP...";
    if (timer > 0) return `Resend OTP (${timer}s)`;
    return "Resend OTP";
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log">
      <section className="text-center md:w-[55%]">
        <div className="px-[2em]">
          <h1 className="mb-4 text-3xl font-bold text-text2">Reset Password</h1>
          <div>
            <p className="font-medium text-howtext md:text-lg lg:text-base">
              Enter your OTP code
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex justify-center rounded-lg border-gray-200 px-3 py-2"
          >
            <div className="flex space-x-5" data-hs-pin-input="">
              <OtpInput
                length={6}
                value={otp}
                className="mt-[1em]"
                onChange={setOtp}
              />
            </div>
          </form>

          <div className="mt-[1em] h-16 lg:mt-[2em]">
            <Button
              onClick={handleResendOtp}
              className="w-[12em] rounded-full bg-text2 py-3 font-medium normal-case text-text5 sm:text-lg"
              disabled={isLoading || timer > 0}
            >
              {getButtonText()}
            </Button>
            {isLoading && (
              <p className="mt-2 text-sm text-gray-600">
                {submittedOtp ? "Verifying OTP..." : "Processing..."}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
