import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Primary } from "../../../../common/Button";
import ReactLoading from "react-loading";
import useUserProfile from "../../../../../shared/Hooks/useUserProfile";
import { ResetPassword } from "../../../../../shared/redux/slices/landing.slices";
import { AppDispatch } from "../../../../../shared/redux/store";

const EmailStep = ({ onClose, onEmailSent }: any) => {
  const [email, setEmail] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { profileDetails } = useUserProfile();
  const { isLoading, error, success } = useSelector(
    (state: any) => state.landing,
  );

  useEffect(() => {
    setEmail(profileDetails?.email);
  }, [profileDetails?.email]);

  useEffect(() => {
    if (success) {
      onEmailSent();
    }
  }, [success, onEmailSent]);

  const handleOtpMail = async () => {
    try {
      await dispatch(ResetPassword({ email }));
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  return (
    <main className="w-auto font-sans">
      <section className="flex flex-col gap-[1em] py-[2em]">
        <div className="text-center">
          <header>
            <h1 className="text-xl font-semibold">Reset Password</h1>
          </header>
        </div>

        <div className="mt-[1em]">
          <label
            htmlFor="email"
            className="flex-start flex text-lg font-semibold text-text2"
          >
            Email Address
          </label>
          <div className="relative flex items-center">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              readOnly
              onChange={(e) => setEmail(e.target.value)}
              className="mt-[10px] w-full min-w-[300px] max-w-[400px] rounded-full border-[1px] bg-gray-200 px-[1.5em] py-2 shadow-lg focus:outline-none focus:ring-text2"
            />
          </div>
        </div>

        {error && <p className="text-center text-red-500">{error}</p>}

        <Primary
          onClick={handleOtpMail}
          disabled={isLoading}
          className="m-auto mt-4 flex w-[70%] justify-center rounded-full bg-text2 px-3 py-2 text-lg text-white"
        >
          {isLoading ? (
            <div className="flex gap-[1em]">
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
                className="inline-block"
              />
              <p>please wait...</p>
            </div>
          ) : (
            "Reset"
          )}
        </Primary>
      </section>
    </main>
  );
};

export default EmailStep;
