import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RESEND_LOGIN_OTP } from "../../../shared/redux/services/landing.services";
import { Primary } from "../../common/Button";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import OtpInput from "../../../shared/utils/OtpInput";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit();
    }
  }, [otp]);

  const handleOtpChange = (otpValue: any) => {
    setOtp(otpValue);
  };

  const ResendOtp = async () => {
    setLoading(true);
    const endpoint = `/auth/resend_otp`;
    try {
      const response = await RESEND_LOGIN_OTP(endpoint, { email });
      setLoading(false);
      toast.success(response.data.msg);
    } catch (response: any) {
      setLoading(false);
      toast.error(response.data.msg);
    }
  };

  const handleSubmit = () => {
    navigate(`/new-password?otp=${otp}&email=${email}`);
    setLoading(false);
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log font-sans">
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

          <Primary
            onClick={ResendOtp}
            loading={loading}
            className="mt-[1em] w-[12em] rounded-full bg-text2 py-3 font-medium text-text5 sm:text-lg lg:mt-[2em]"
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
                className="inline-block"
              />
            ) : (
              "Resend OTP"
            )}
          </Primary>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
