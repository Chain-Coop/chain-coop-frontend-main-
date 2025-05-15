import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/svg/auth/logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Typography } from "@material-tailwind/react";
import FormInput from "../../components/common/FormInput";
import { ROUTES } from "../../shared/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  ForgotPassword,
  resetAuthState,
} from "../../shared/redux/slices/landing.slices";
import { AppDispatch } from "../../shared/redux/store";
import { RootState } from "../../shared/redux/rootReducer";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, forgotPasswordSuccess, error } = useSelector(
    (state: RootState) => state.landing,
  );

  useEffect(() => {
    if (forgotPasswordSuccess) {
      navigate(`/verification-successfull?email=${email}`);
      dispatch(resetAuthState());
    }
  }, [forgotPasswordSuccess, email, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const home = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  const forgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetAuthState());
    dispatch(ForgotPassword({ email }));
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
            disabled={isLoading}
            required
          />

          <Button
            type="submit"
            className="relative mt-[2em] flex w-full items-center justify-center rounded-full bg-text2 p-4 text-center text-sm font-semibold normal-case text-text5"
            disabled={isLoading}
            loading={isLoading}
          >
            Submit
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
