import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../shared/redux/store";
import { LoginUser } from "../../../shared/redux/slices/landing.slices";
import { useDispatch } from "react-redux";
import { EnterButton } from "../../common/Button";
import logo from "../../../Assets/svg/auth/logo.svg";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import usePasswordToggle from "../../../shared/utils/usePasswordToggle";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
        if (response.landing.role === "user") {
          navigate("/dashboard");
        } else {
          toast.error("You do not have access to this dashboard.");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        const errorMessage = error;
        toast.error(errorMessage);
      });
  
    if (rememberMe) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      sessionStorage.setItem("rememberMe", "true");
    } else {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("password");
      sessionStorage.removeItem("rememberMe");
    }
  };
  
  

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-log py-8 font-sans">
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
            <p className="text-center font-medium text-howtext">
              {`Let's get you logged in to get back to building your investment
              portfolio and track your growth.`}
            </p>
          </div>
        </header>
        <form onSubmit={loginUserData}>
          <div className="mt-[2em]">
            <label htmlFor="email" className="mb-3 flex text-text2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              disabled={loading}
              required
              placeholder="enter your e-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="input mb-5 h-[4em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>

          <div>
            <label htmlFor="password-input" className="mb-3 flex text-text2">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                id="password-input"
                type={passwordType}
                value={password}
                placeholder="Password"
                required
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className="input mb-5 h-[4em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
              <button
                type="button"
                onClick={togglePasswordType}
                className="absolute right-4 mb-3 self-center"
              >
                {passwordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-3">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={toggleRememberMe}
                className="relative checked:border-text2 checked:bg-text2"
              />

              <span className="text-text2">Remember Me</span>
            </div>
            <Link to="/forget-password" className="pointer font-normal italic">
              Forgot Password ?
            </Link>
          </div>

          <EnterButton
            onClick={loginUserData}
            className="mt-[2em] flex justify-center text-center"
            disabled={loading}
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              "Log in"
            )}
          </EnterButton>

          <div className="flex justify-center">
            <p>
              {`Don't have an account?`}
              <Link
                to="/sign-up"
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
