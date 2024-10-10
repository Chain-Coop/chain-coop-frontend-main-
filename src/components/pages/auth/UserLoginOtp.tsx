import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../shared/redux/store";
import { VerifyUserAuth } from "../../../shared/redux/slices/landing.slices";
import { RESEND_LOGIN_OTP } from "../../../shared/redux/services/landing.services";
import { useNavigate, useLocation } from "react-router-dom";
import OTPInput from "react-otp-input";
import { Primary } from "../../common/Button";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLoginOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleOtpChange = (otpValue: any) => {
    setOtp(otpValue);

    if (otpValue.length === 6) {
      verifyUserData(otpValue);
    }
  };

  const verifyUserData = (otpValue: number) => {
    setLoading(true);
    let body = {
      otp: otpValue,
      email: email,
    };
    dispatch(VerifyUserAuth(body))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("account verified successfully");
        navigate(`/login`);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  };

  const ResendOtp = async () => {
    setLoading(true);
    const endpoint = `/auth/resend_otp`;
    try {
      const response = await RESEND_LOGIN_OTP(endpoint, { email });
      setLoading(false);
      toast.success(response.data.msg);
    } catch (error: any) {
      setLoading(false);
      toast.error(error);
    }
  };
  return (
    <main className="flex h-screen items-center justify-center bg-log font-sans">
      <section className="text-center  md:w-[55%]">
        <div className="px-[2em]">
          <div>
            <p className="font-medium text-howtext md:text-lg lg:text-base">
              Enter your OTP code to complete your registration
            </p>
          </div>
          <form
            onSubmit={async () => verifyUserData}
            className="flex justify-center rounded-lg border-gray-200  px-3 py-2 "
          >
            <div className="flex space-x-5" data-hs-pin-input="">
              <OTPInput
                value={otp}
                onChange={handleOtpChange}
                skipDefaultStyles={true}
                containerStyle={"gap-3 my-5"}
                numInputs={6}
                inputType="tel"
                renderSeparator={<span>*</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={
                  "block lg:h-[55px] lg:w-[55px] sm:h-[50px] sm:w-[35px] text-center border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:border-text2 focus:ring-text2 disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                }
              />
            </div>
          </form>

          <Primary
            onClick={ResendOtp}
            loading={loading}
            className="w-[12em] rounded-full flex justify-center m-auto text-center bg-text2 px-2 py-3 font-medium text-text5 sm:text-lg lg:mt-[2em]"
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
