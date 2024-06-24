import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../../shared/redux/slices/landing.slices";
import { EnterButton } from "../../common/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import logo from "../../../Assets/svg/auth/logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

const CreateAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const registerUser = (e) => {
    e.preventDefault();
    if (isSubmitDisabled() || loading) {
      return;
    }
    setLoading(true);

    const body = {
      email: email,
      username: username,
      phoneNumber: phoneNumber,
      membershipType: membershipType,
      password: password,
    };
    dispatch(RegisterUser(body))
      .unwrap()
      .then(() => {
        setEmail("");
        setUsername("");
        setPhoneNumber("");
        setMembershipType("");
        setPassword("");
        setLoading(false);
        toast.success(
          "Registration successful, enter the OTP sent to your email"
        );
        navigate(`/account-otp?email=${email}`);
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error;
        toast.error(errorMessage);
      });
  };

  const isSubmitDisabled = () => {
    return !(
      email.trim() &&
      username.trim() &&
      phoneNumber.trim() &&
      membershipType.trim() &&
      password.trim().length >= 8 &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("string");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <main className="h-vh flex items-center justify-center bg-log pt-[1em] font-sans">
      <section className="px-[1em] text-center lg:w-[48%]">
        <div>
          <img src={logo} alt="Logo" className="mx-auto mb-4 h-[5em]" />
          <h1 className="mb-4 text-3xl font-bold text-text2">
            Create Your Account
          </h1>
          <p className="font-medium text-howtext">
            Start building your investment portfolio and track your growth
          </p>
        </div>
        <form onSubmit={registerUser}>
          <div className="mt-[1em]">
            <label
              htmlFor="email-input"
              className="mb-3 flex text-base font-semibold text-text1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email-input"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="e-mail address"
              className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md focus:border-text2 focus:ring-text2"
            />
          </div>

          <div>
            <label
              htmlFor="username-input"
              className="mb-3 flex font-semibold text-text1"
            >
              Username
            </label>
            <input
              type="text"
              id="username-input"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="username"
              className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber-input"
              className="mb-3 flex font-sans font-semibold text-text1"
            >
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber-input"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              placeholder="phone number"
              className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
            />
          </div>

          <div>
            <label
              htmlFor="membership-input"
              className="mb-3 flex font-semibold text-text1"
            >
              Membership Type
            </label>
            <select
              id="membership-input"
              name="membershipType"
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
              className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
            >
              <option value="">--- Select your membership type ---</option>
              <option value="patron">Patron</option>
              <option value="investor members">Investor Members</option>
            </select>
          </div>

          <div>
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
          <EnterButton
            type="submit"
            className={`mt-[2em] ${isSubmitDisabled() ? "cursor-not-allowed bg-[#8b5cf6] text-gray-500" : "cursor-pointer bg-text2 text-white"}`}
            disabled={isSubmitDisabled() || loading}
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              "Sign up"
            )}
          </EnterButton>
        </form>

        <div
          className="absolute left-0 top-0 ml-[4em] mt-[4em] cursor-pointer sm:hidden lg:block"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={35} fill="#440080" />
        </div>

        <div className="mb-[1em] flex justify-center">
          <p className="font-sans font-semibold text-text1">
            Have an account ?
            <span className="ml-2 font-sans font-medium text-text2">
              <a href="/login">Sign in</a>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default CreateAccount;
