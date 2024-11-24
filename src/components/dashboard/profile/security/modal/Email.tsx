import React, { useState, useEffect } from "react";
import { Primary } from "../../../../common/Button";
import { FORGOT_PASSWORD } from "../../../../../shared/redux/services/landing.services";
import ReactLoading from "react-loading";
import useUserProfile from "../../../../../shared/Hooks/useUserProfile";

const EmailStep = ({ onClose, onEmailSent }: any) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { profileDetails } = useUserProfile();

  useEffect(() => {
    setEmail(profileDetails?.email);
  }, [profileDetails?.email]);

  const handleOtpMail = async () => {
    try {
      setLoading(true);
      const endpoint = `/auth/forget_password`;
      const response = await FORGOT_PASSWORD(endpoint, { email });
      if (response.status === 200) {
        onEmailSent();
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
    } finally {
      setLoading(false);
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
          <div className="relative flex items-center text-center">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              readOnly
              onChange={(e) => setEmail(e.target.value)}
              className="mt-[10px] w-auto rounded-full border-[1px] bg-gray-200 px-[1.5em] py-2 shadow-lg focus:outline-none focus:ring-text2"
              style={{ width: `${email.length + 4}ch` }}
            />
          </div>
        </div>

        <Primary
          onClick={handleOtpMail}
          disabled={loading}
          className="m-auto mt-4 flex w-[70%] justify-center rounded-full bg-text2 px-3 py-2 text-lg text-white"
        >
          {loading ? (
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
