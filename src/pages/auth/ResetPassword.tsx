import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { RESEND_LOGIN_OTP } from "../../shared/redux/services/landing.services";
import OtpInput from "../../shared/utils/OtpInput";
import { useDispatch } from "react-redux";
import { VerifyUserAuth } from "../../shared/redux/slices/landing.slices";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit();
    }
  }, [otp]);

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [timer]);

  const ResendOtp = async () => {
    if (timer > 0) return;
    setLoading(true);
    const endpoint = `/auth/resend_otp`;
    try {
      const response = await RESEND_LOGIN_OTP(endpoint, { email });
      toast.success(response.data.msg);
      setTimer(30);
    } catch (response: any) {
      toast.error(response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setVerifying(true);
    try {
      const resultAction = await dispatch(
        VerifyUserAuth({
          email,
          otp,
        }) as any,
      );

      if (VerifyUserAuth.fulfilled.match(resultAction)) {
        navigate(`/new-password?otp=${otp}&email=${email}`);
        toast.success("OTP verification successful");
      } else {
        toast.error(resultAction.payload || "Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const getButtonText = () => {
    if (loading) return "Sending OTP...";
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
              onClick={ResendOtp}
              className="w-[12em] rounded-full bg-text2 py-3 font-medium normal-case text-text5 sm:text-lg"
              disabled={loading || timer > 0}
            >
              {getButtonText()}
            </Button>
            {verifying && (
              <p className="mt-2 text-sm text-gray-600">Verifying OTP...</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
