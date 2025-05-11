import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { Button, Typography } from "@material-tailwind/react";
import logo from "../../Assets/svg/auth/logo.svg";
import { LoginRequest } from "../../shared/types";
import usePasswordToggle from "../../shared/utils/usePasswordToggle";
import { AppDispatch } from "../../shared/redux/store";
import { clearMessage } from "../../shared/redux/slices/message.slices";
import FormInput from "../../components/common/FormInput";
import { ROUTES } from "../../shared/routes";
import { RootState } from "../../shared/redux/rootReducer";
import {
  LoginUser,
  resetAuthState,
} from "../../shared/redux/slices/landing.slices";

const UserLogin = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [passwordType, togglePasswordType] = usePasswordToggle();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, loginSuccess, loginData } = useSelector(
    (state: RootState) => state.landing,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loginSuccess && loginData) {
      sessionStorage.setItem("authToken", loginData.token);

      sessionStorage.setItem(
        "userData",
        JSON.stringify({
          userId: loginData._id,
          email: loginData.email,
          role: loginData.role,
          isVerified: loginData.isVerified,
        }),
      );

      toast.success("Login successful!");

      if (loginData.isVerified) {
        if (loginData.role === "user") {
          navigate("/dashboard");
        } else {
          toast.error("You do not have access to this dashboard.");
        }
      } else {
        navigate(
          `/verify-phone-number?userId=${loginData._id}&phoneNumber=${loginData.phoneNumber}`,
        );
      }
    }

    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, [loginSuccess, loginData, error, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await dispatch(LoginUser(formData)).unwrap();
    } catch (err) {
      // Error handled by useEffect
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 py-8">
      <section className="w-full px-4 text-center lg:w-2/5">
        <div
          className="absolute left-4 top-4 cursor-pointer lg:left-8 lg:top-8"
          onClick={handleHomeClick}
        >
          <FaArrowLeft size={24} className="text-blue-600" />
        </div>
        <header className="mx-auto text-center">
          <img
            src={logo}
            alt="chain_co-op_logo"
            className="mx-auto mb-3 w-[5em] cursor-pointer"
            onClick={handleHomeClick}
          />
          <h1 className="mb-4 text-3xl font-bold text-text2">Welcome Back</h1>
          <div className="w-full lg:px-[5em]">
            <Typography className="text-center font-medium text-howtext">
              Let's get you logged in to get back to building your investment
              portfolio and track your growth.
            </Typography>
          </div>
        </header>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
          noValidate
        >
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />
          <FormInput
            label="Password"
            type={passwordType}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            autoComplete="new-password"
            disabled={isLoading}
            required
            rightElement={
              <button
                type="button"
                onClick={togglePasswordType}
                aria-label="Toggle password visibility"
              >
                {passwordType === "password" ? (
                  <MdOutlineVisibilityOff size={20} />
                ) : (
                  <MdOutlineVisibility size={20} />
                )}
              </button>
            }
          />
          <div className="flex justify-end">
            <Link
              to={ROUTES.forget_password}
              className="pointer font-normal italic text-text2"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="relative mt-[2em] flex w-full items-center justify-center rounded-full bg-text2 p-4 text-center text-sm font-semibold normal-case text-text5"
            disabled={isLoading || !formData.email || !formData.password}
            loading={isLoading}
          >
            Log in
          </Button>
          <div className="mt-4 flex justify-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to={ROUTES.sign_up}
                className="font-medium text-text2 hover:underline"
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
