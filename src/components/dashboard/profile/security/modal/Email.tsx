import React, { useState } from "react";
import { Primary } from "../../../../common/Button";
import { FORGOT_PASSWORD } from "../../../../../shared/redux/services/landing.services";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const EmailStep = ({ email, setEmail, onClose, onEmailSent }:any) => {
  const [loading, setLoading] = useState(false);
  
  const handleOtpMail = async () => {
    try {
      setLoading(true);
      const endpoint = `/auth/forget_password`;
      console.log("sending")
      const response = await FORGOT_PASSWORD(endpoint, { email });
      console.log("proccessed",response)
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
    <main className="font-sans">
      <section className="flex flex-col gap-[1em] py-[2em]">
        <div className="text-center">
          <header>
            <h1 className="font-semibold text-lg">Reset Password</h1>
          </header>
        </div>
        
        <div className="mt-[1em]">
          <label
            htmlFor="email"
            className="flex-start flex text-lg font-semibold text-text2"
          >
            Enter your Email Address
          </label>
          <div className="relative flex items-center text-center">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-[10px] w-full rounded-full border-[1px] bg-white p-2 shadow-lg focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
        </div>

        <Primary 
          onClick={handleOtpMail}
          disabled={loading}
          className="m-auto mt-4 flex w-[60%] justify-center rounded-full bg-text2 px-3 py-2 text-lg text-white"
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
              "Reset"
            )}
        </Primary>
      </section>
    </main>
  );
};

export default EmailStep;