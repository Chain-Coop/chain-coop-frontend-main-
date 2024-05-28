import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginUser } from "../../../shared/redux/slices/landing.slices";
import { EnterButton } from "../../common/Button";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import logo from "../../../../public/images/svg/auth/logo.svg";

const UserLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUserData = (e) => {
    e.preventDefault();

    setLoading(true);
    let body = {
      email: email,
      password: password,
    };

    dispatch(LoginUser(body))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Login successful");
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage =
          error.response?.data?.message || "Invalid credentials";
        toast.error(errorMessage);
      });
    if (rememberMe) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      sessionStorage.setItem("rememberMe", rememberMe);
    } else {
      sessionStorage.removeItem("emailOrUsername");
      sessionStorage.removeItem("password");
      sessionStorage.removeItem("rememberMe");
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("string");
    } else {
      setPasswordType("password");
    }
  };

  const isSubmitDisabled = () => {
    return !(email.trim() && password.trim());
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedPassword = sessionStorage.getItem("password");
    const storedRememberMe = sessionStorage.getItem("rememberMe");

    if (storedRememberMe === "true") {
      setEmail(storedEmail || "");
      setPassword(storedPassword || "");
      setRememberMe(true);
    }
  }, []);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-log py-8 font-sans ">
      <section className="string-center lg:w-[45%]">
        <header className="text-center lg:px-[7em]">
          <img src={logo} alt="Logo" className="mx-auto mb-3 w-[5em]" />
          <h1 className="mb-4 text-3xl font-bold text-text2">Welcome Back</h1>
          <div>
            <p className="text-center font-medium text-howtext">
              {`Let's get you logged in to get back to building your investment
              portfolio and track your growth.`}
            </p>
          </div>
        </header>
        <form onSubmit={loginUserData}>
          <div className="form mt-[2em] w-full">
            <div className="box1 sm:px-[1em]">
              <label htmlFor="email" className="mb-3 flex text-text2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="enter your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md focus:border-text2 focus:ring-text2"
              />
            </div>
          </div>
          <div className="form w-full">
            <div className="sm:px-[1em]">
              <label htmlFor="password-input" className="mb-3 flex text-text2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={passwordType}
                  id="password-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md focus:border-text2 focus:ring-text2"
                />
                <button
                  type="button"
                  className="absolute right-4 mb-3 flex"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between sm:px-[1em]">
            <div className="flex gap-3">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={toggleRememberMe}
                className="relative checked:border-text2 checked:bg-text2"
              />

              <span className="text-text2">Remember Me</span>
            </div>
            <a href="/forget-password" className="pointer font-normal italic">
              Forget Password
            </a>
          </div>

          <div className="mt-[2em] sm:px-[1em]">
            <EnterButton
              type="submit"
              text="Login"
              loading={loading}
              disabled={loading || isSubmitDisabled()}
            />
          </div>
          <div className="flex justify-center">
            <p className="font-sans">
              {`Don't have an account?`}
              <a
                href="/sign-up"
                className="pointer ml-2 font-medium text-text2"
              >
                Sign Up Now
              </a>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default UserLogin;
