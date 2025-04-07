import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/svg/auth/logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Typography } from "@material-tailwind/react";
import { FORGOT_PASSWORD } from "../../shared/redux/services/landing.services";
import FormInput from "../../components/common/FormInput";
import { ROUTES } from "../../shared/routes";

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
      navigate(`/verification-successfull?email=${email}`);
    } else {
      toast.error(response.data.msg);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log px-3 ">
      <section className="text-center lg:w-[49%]">
        <div className="px-[2em]">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto mb-4 h-[5em] w-[5em] cursor-pointer"
            onClick={home}
          />
          <Typography
            variant="h1"
            className="mb-4 text-3xl font-semibold text-text2"
          >
            Forgot Password ?
          </Typography>
          <div>
            <Typography className="font-medium text-howtext">
              Enter your email address an OTP would be sent to your account
            </Typography>
          </div>
        </div>
        <form onSubmit={forgotPassword} className="mt-[3em] w-full sm:px-[1em]">
          <FormInput
            label="Email Address"
            type="email"
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e-mail address"
            disabled={loading}
            required
          />

          <Button
            type="submit"
            className="relative mt-[2em] flex w-full items-center justify-center rounded-full bg-text2 p-4 text-center text-sm font-semibold normal-case text-text5"
            disabled={loading}
            loading={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
        <section className="flex justify-center py-4">
          <Typography className="text-text font-medium">
            Know your Password ?
            <span>
              <Link to={ROUTES.sign_in} className="ml-3 text-text2">
                Sign in now
              </Link>
            </span>
          </Typography>
        </section>
      </section>
    </main>
  );
};

export default ForgetPassword;
