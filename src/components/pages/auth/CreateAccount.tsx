import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../../shared/redux/slices/landing.slices";
import ToggleButton from "../../../shared/utils/ToggleButton";
import { EnterButton } from "../../common/Button";
import logo from "../../../Assets/svg/auth/logo.svg";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../../shared/redux/store";
import usePasswordToggle from "../../../shared/utils/usePasswordToggle";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import CustomSelect from "../../../shared/utils/CustomSelect";

const CreateAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, togglePasswordType] = usePasswordToggle();
  const [confirmPasswordType, toggleConfirmPasswordType] = usePasswordToggle();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const membershipOptions = [
    { value: "Explorer", label: "Explorer" },
    { value: "Pioneer", label: "Pioneer" },
  ];

  const home = (e: any) => {
    e.preventDefault();
    navigate("/login");
  };

  const registerUser = (e: any) => {
    e.preventDefault();
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
        navigate(`/account-otp?email=${email}`);
      })
      .catch((error: any) => {
        setLoading(false);
        const errorMessage = error;
        toast.error(errorMessage);
      });
  };

  return (
    <main className="h-vh flex items-center justify-center bg-log pt-[1em] font-sans">
      <section className="px-[1em] text-center lg:w-[48%]">
        <div>
          <img
            src={logo}
            alt="Logo"
            className="mx-auto mb-4 h-[5em] cursor-pointer"
            onClick={home}
          />
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
              required
              disabled={loading}
              placeholder="e-mail address"
              className="mb-5 h-[4em] w-full rounded-full border-[1px] px-4 text-sm  shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
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
              required
              disabled={loading}
              placeholder="username"
              className="mb-5 h-[4em] w-full  rounded-full border-[1px] px-4  text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
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
              required
              disabled={loading}
              placeholder="phone number"
              className="mb-5 h-[4em] w-full rounded-full  border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <div>
            <label
              htmlFor="membership-input"
              className="mb-3 flex font-semibold text-text1"
            >
              Membership Type
            </label>
            <CustomSelect
              value={membershipType}
              onChange={(value: any) => setMembershipType(value)}
              options={membershipOptions}
            />
          </div>

          <div>
            <label
              htmlFor="password-input"
              className="mb-3 flex font-semibold text-text1"
            >
              Password
            </label>
            <div className="relative flex items-center">
            <input
              id="password-input"
              type={passwordType} 
              placeholder="Password"
              value={password}
              required
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="input mb-5 h-[4em] w-full items-center rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
          />

              <button
                type="button"
                onClick={togglePasswordType}
                className="items-centerself-center absolute right-4 mb-3"
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
            disabled={loading}
            className="cursor-pointer flex text-center justify-center bg-text2 text-white"
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
              <Link to="/login">Sign in</Link>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default CreateAccount;
