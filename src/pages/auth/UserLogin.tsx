import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../Assets/svg/auth/logo.svg";
import { toast } from "react-toastify";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { Button, Typography } from "@material-tailwind/react";
import usePasswordToggle from "../../shared/utils/usePasswordToggle";
import { AppDispatch } from "../../shared/redux/store";
import { LoginUser } from "../../shared/redux/slices/landing.slices";
import FormInput from "../../components/common/FormInput";
import { ROUTES } from "../../shared/routes";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordType, togglePasswordType] = usePasswordToggle();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const home = (e: any) => {
    e.preventDefault();
    navigate("/");
  };

  const loginUserData = (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    let body = {
      email: email,
      password: password,
    };

    dispatch(LoginUser(body))
      .unwrap()
      .then((response) => {
        setLoading(false);
        if (response.landing.isVerified) {
          if (response.landing.role === "user") {
            navigate("/dashboard");
          } else {
            toast.error("You do not have access to this dashboard.");
          }
        } else {
          const { _id: userId, phoneNumber } = response.landing;
          navigate(
            `/verify-phone-number?userId=${userId}&phoneNumber=${phoneNumber}`,
          );
        }
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-log py-8">
      <section className="w-full px-[12px] text-center lg:w-[45%]">
        <header className="m-auto text-center">
          <img
            src={logo}
            alt="chain_co-op_logo"
            className="mx-auto mb-3 w-[5em] cursor-pointer"
            onClick={home}
          />
          <h1 className="mb-4 text-3xl font-bold text-text2">Welcome Back</h1>
          <div className="w-full lg:px-[5em]">
            <Typography className="text-center font-medium text-howtext">
              Let's get you logged in to get back to building your investment
              portfolio and track your growth.
            </Typography>
          </div>
        </header>
        <form onSubmit={loginUserData} className="flex flex-col gap-5">
          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
          />

          <FormInput
            label="Password"
            type={passwordType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="new-password"
            disabled={loading}
            rightElement={
              <button type="button" onClick={togglePasswordType}>
                {passwordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            }
          />

          <div className="flex justify-end">
            <Link
              to={ROUTES.forget_password}
              className="pointer font-normal italic"
            >
              Forgot Password ?
            </Link>
          </div>

          <Button
            type="submit"
            className="relative mt-[2em] flex w-full items-center justify-center rounded-full bg-text2 p-4 text-center text-sm font-semibold normal-case text-text5"
            disabled={loading}
            loading={loading}
          >
            Log in
          </Button>

          <div className="mt-4 flex justify-center">
            <p>
              {`Don't have an account?`}
              <Link
                to={ROUTES.sign_up}
                className="ml-2 cursor-pointer font-medium text-text2"
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default UserLogin;
