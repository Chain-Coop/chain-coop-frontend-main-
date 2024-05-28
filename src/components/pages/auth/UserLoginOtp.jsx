import { useState } from "react";
import { Pin } from "../../common/Button";
import { VerifyUserAuth } from "../../../shared/redux/slices/landing.slices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { RESEND_LOGIN_OTP } from "../../../shared/redux/services/landing.services";
import { useDispatch } from "react-redux";
import OTPInput from "react-otp-input";

const UserLoginOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [otp, setOtp] = useState("");

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);

    if (otpValue.length === 6) {
      verifyUserData(otpValue);
    }
  };

  const verifyUserData = (otpValue) => {
    setLoading(true);
    console.log("OTP Values:", otp);
    let body = {
      otp: otpValue,
      email: email,
    };
    console.log("body", body);

    dispatch(VerifyUserAuth(body))
      .unwrap()
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/create-pin");
      })
      .catch((err) => {
        toast.error(err.message || "Invalid OTP, please try again");
        setLoading(false);
      });
  };

  const ResendOtp = async () => {
    setLoading(true);
    const endpoint = `/auth/resend_otp`;
    try {
      await RESEND_LOGIN_OTP(endpoint, { email });
      setLoading(false);
      toast.success("OTP sent successfully");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("Network error. Please check your internet connection");
      }
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
            onSubmit={verifyUserData}
            className="flex justify-center rounded-lg border-gray-200  px-3 py-2 "
          >
            <div className="flex space-x-5" data-hs-pin-input="">
              <OTPInput
                value={otp}
                onChange={handleOtpChange}
                skipDefaultStyles={true}
                containerStyle={"gap-3 my-5"}
                numInputs={6}
                inputStyle={
                  "block lg:h-[55px] lg:w-[55px] sm:h-[50px] sm:w-[35px] text-center border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:border-text2 focus:ring-text2 disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                }
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </form>
          <Pin
            text="Resend OTP"
            loading={loading}
            onClick={ResendOtp}
            className="font-sans font-medium sm:text-lg"
          />
        </div>
      </section>
    </main>
  );
};

export default UserLoginOtp;
