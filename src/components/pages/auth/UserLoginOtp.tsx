import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../shared/redux/store";
import { VerifyUserAuth } from "../../../shared/redux/slices/landing.slices";
import { RESEND_LOGIN_OTP } from "../../../shared/redux/services/landing.services";
import { useNavigate, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "../../../shared/utils/OtpInput";
import { brandPrimary } from "../../common/Button";

const UserLoginOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

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
    setLoading(true);
    dispatch(VerifyUserAuth({ otp: otpValue, email }))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Account verified successfully");
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  };

  const ResendOtp = async () => {
    setLoading(true);
    try {
      const response = await RESEND_LOGIN_OTP("/auth/resend_otp", { email });
      setLoading(false);
      toast.success(response.data.msg);
    } catch (error: any) {
      setLoading(false);
      toast.error(error);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log font-sans">
      <section className="text-center md:w-[55%]">
        <div className="px-[2em]">
          <p className="font-medium text-howtext md:text-lg lg:text-base">
            Enter your OTP code to complete your registration
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

          <Primary
            onClick={ResendOtp}
            loading={loading}
            className="m-auto flex w-[12em] justify-center rounded-full bg-text2 px-2 py-3 text-center font-medium text-text5 sm:text-lg lg:mt-[2em]"
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
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

export default UserLoginOtp;
