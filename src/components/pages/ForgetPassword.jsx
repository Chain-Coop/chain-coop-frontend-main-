import logo from "../../../public/images/svg/icon.svg";
import { EnterButton } from "../common/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FORGOT_PASSWORD } from "../../shared/redux/services/landing.services";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgotPasswordFunc = async () => {
    setLoading(true);
    const endpoint = `/auth/forget_password`;
    try {
      const response = await FORGOT_PASSWORD(endpoint, { email });
      setLoading(false);
      if (response.data.msg === "Password reset OTP sent to your email") {
        toast.success("OTP sent successfully");
        navigate(`/verification-successfull?email=${email}`);
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("Network error. Please check your internet connection");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      await forgotPasswordFunc();
    } else {
      toast.error("Please enter your email");
    }
  };

  const validate = () => {
    return !email;
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log font-sans">
      <section className="text-center lg:w-[49%]">
        <div className="px-[2em]">
          <img src={logo} alt="Logo" className="mx-auto mb-4 h-[4em] w-[4em]" />
          <h1 className="mb-4 text-3xl font-semibold text-text2">
            Forgot Password ?
          </h1>
          <div>
            <p className="font-medium text-howtext">
              Enter your email address an OTP would be sent to your account
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-[3em] w-full sm:px-[1em]">
          <div className="box1">
            <label className="mb-3 flex text-text2">Email</label>
            <input
              type="string"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e-mail"
              className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
            />
          </div>
          <div className="sm:px-[1em] ">
            <EnterButton
              text="Submit"
              loading={loading}
              className="sm:text-lg "
            />
          </div>
        </form>
        <section className="flex justify-center">
          <p className="text-text font-medium">
            Know your Password ?
            <span>
              <a href="/login" className="ml-3 text-text2">
                Sign in now
              </a>
            </span>
          </p>
        </section>
      </section>
    </main>
  );
};

export default ForgetPassword;
