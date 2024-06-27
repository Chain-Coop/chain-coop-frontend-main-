import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../../shared/redux/slices/landing.slices";
import { EnterButton } from "../../common/Button";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import logo from "../../../Assets/svg/auth/logo.svg";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const home = (e) => {
    e.preventDefault();
    navigate("/");
  };

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
        toast.success("Welcome");
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error;
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
    <main className="flex min-h-screen items-center justify-center bg-log py-8 font-sans">
      <section className="w-full px-[12px] text-center lg:w-[45%]">
        <header className="m-auto text-center">
          <img
            src={logo}
            alt="Logo"
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
              placeholder="enter your e-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md focus:border-text2 focus:ring-text2"
            />
          </div>

          <div>
            <label htmlFor="password-input" className="mb-3 flex text-text2">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                id="password-input"
                value={password}
                type={passwordType}
                placeholder="Password"
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
            <a href="/forget-password" className="pointer font-normal italic">
              Forgot Password ?
            </a>
          </div>

          <EnterButton onClick={loginUserData} className="mt-[2em]">
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
