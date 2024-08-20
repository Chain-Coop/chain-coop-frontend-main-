import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD } from "../../../shared/redux/services/landing.services";
import { EnterButton } from "../../common/Button";
import logo from "../../../Assets/svg/auth/logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const home = (e: any) => {
    e.preventDefault();
    navigate("/login");
  };

  const forgotPassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = `/auth/forget_password`;
    const response = await FORGOT_PASSWORD(endpoint, { email });
    setLoading(false);
    if (response.status === 200) {
      toast.success(response.data.msg);
      navigate(`/verification-successfull?email=${email}`);
    } else {
      toast.error(response.data.msg);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log font-sans">
      <section className="text-center lg:w-[49%]">
        <div className="px-[2em]">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto mb-4 h-[5em] w-[5em] cursor-pointer"
            onClick={home}
          />
          <h1 className="mb-4 text-3xl font-semibold text-text2">
            Forgot Password ?
          </h1>
          <div>
            <p className="font-medium text-howtext">
              Enter your email address an OTP would be sent to your account
            </p>
          </div>
        </div>
        <form onSubmit={forgotPassword} className="mt-[3em] w-full sm:px-[1em]">
          <div className="box1">
            <label className="mb-3 flex text-text2">Email</label>
            <input
              type="string"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e-mail"
              className="mb-5 h-[4em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <EnterButton disabled={loading} onClick={forgotPassword}>
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              "Submit"
            )}
          </EnterButton>
        </form>
        <section className="flex justify-center">
          <p className="text-text font-medium">
            Know your Password ?
            <span>
              <Link to="/login" className="ml-3 text-text2">
                Sign in now
              </Link>
            </span>
          </p>
        </section>
      </section>
    </main>
  );
};

export default ForgetPassword;
