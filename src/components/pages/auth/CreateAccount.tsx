import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../../shared/redux/slices/landing.slices";
import { EnterButton } from "../../common/Button";
import logo from "../../../Assets/svg/auth/logo.svg";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../../shared/redux/store";
import usePasswordToggle from "../../../shared/utils/usePasswordToggle";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { PhoneNumberInput } from "../../../shared/utils/Helpers";
import Select from "react-select";

// Password strength checker
const checkPasswordStrength = (
  password: string,
): { score: number; message: string } => {
  let score = 0;
  let message = "";

  if (password.length >= 8) score++;
  if (password.match(/[a-z]/)) score++;
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^a-zA-Z0-9]/)) score++;

  switch (score) {
    case 0:
    case 1:
      message = "Very Weak";
      break;
    case 2:
      message = "Weak";
      break;
    case 3:
      message = "Medium";
      break;
    case 4:
      message = "Strong";
      break;
    case 5:
      message = "Very Strong";
      break;
    default:
      message = "Very Weak";
  }

  return { score, message };
};

const CreateAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordType, togglePasswordType] = usePasswordToggle();
  const [confirmPasswordType, toggleConfirmPasswordType] = usePasswordToggle();
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const membershipOptions = [
    { value: "Explorer", label: "Explorer" },
    { value: "Pioneer", label: "Pioneer" },
  ];

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      height: "4em",
      borderRadius: "9999px",
      borderColor: "#E5E7EB",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      "&:hover": {
        borderColor: "#440080",
      },
    }),
    option: (base: any, state: { isSelected: any }) => ({
      ...base,
      backgroundColor: state.isSelected ? "#440080" : "white",
      "&:hover": {
        backgroundColor: state.isSelected ? "#440080" : "#F3F4F6",
      },
    }),
  };

  useEffect(() => {
    if (password) {
      setPasswordStrength(checkPasswordStrength(password));
    }
  }, [password]);

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword || confirmPassword === "");
  }, [password, confirmPassword]);

  const home = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  const getPasswordStrengthColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      case 5:
        return "bg-green-600";
      default:
        return "bg-gray-200";
    }
  };

  const registerUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid) {
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (passwordStrength.score < 3) {
      toast.error("Please choose a stronger password!");
      return;
    }

    setLoading(true);

    const body = {
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      membershipType,
      password,
    };

    dispatch(RegisterUser(body))
      .unwrap()
      .then(() => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setUsername("");
        setPhoneNumber("");
        setMembershipType("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        navigate(`/account-otp?email=${email}`);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error);
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
        <form className="flex flex-col gap-6" onSubmit={registerUser}>
          <div>
            <label
              htmlFor="firstName"
              className="text- textPrimary mb-2 flex text-base font-semibold
"
            >
              First Name
            </label>
            <input
              type="firstName"
              id="firstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              disabled={loading}
              placeholder="first name"
              className="h-[4em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="text- textPrimary mb-2 flex text-base font-semibold
"
            >
              Last Name
            </label>
            <input
              type="lastName"
              id="lastName"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              disabled={loading}
              placeholder="last name"
              className="h-[4em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>

          <div>
            <label
              htmlFor="email-input"
              className="text- textPrimary mb-2 flex text-base font-semibold
"
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
              className="h-[4em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>

          <div>
            <label
              htmlFor="username-input"
              className="text- textPrimary mb-2 flex font-semibold
"
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
              className="h-[4em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber-input"
              className="text- textPrimary mb-2 flex font-sans font-semibold
"
            >
              Phone Number
            </label>
            <PhoneNumberInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              disabled={loading}
              onValidityChange={setIsPhoneValid}
            />
          </div>

          <div>
            <label
              htmlFor="membership-input"
              className="text- textPrimary mb-2 flex font-semibold
"
            >
              Membership Type
            </label>
            <Select
              value={membershipOptions.find(
                (option) => option.value === membershipType,
              )}
              onChange={(option: any) => setMembershipType(option?.value || "")}
              options={membershipOptions}
              styles={customSelectStyles}
              isDisabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password-input"
              className="text- textPrimary mb-2 flex font-semibold
"
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
                className="input h-[4em] w-full items-center rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
              <button
                type="button"
                onClick={togglePasswordType}
                className="absolute right-4"
              >
                {passwordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="mb-1 flex h-1 overflow-hidden rounded-full bg-gray-200">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div
                      key={index}
                      className={`flex-1 ${
                        index <= passwordStrength.score
                          ? getPasswordStrengthColor(passwordStrength.score)
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p
                  className={`text-sm ${
                    passwordStrength.score <= 2
                      ? "text-red-500"
                      : passwordStrength.score === 3
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  Password Strength: {passwordStrength.message}
                </p>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm-password-input"
              className="text- textPrimary mb-2 flex font-semibold
"
            >
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                id="confirm-password-input"
                type={confirmPasswordType}
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                disabled={loading}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`input h-[4em] w-full items-center rounded-full border-[1px] px-4 text-sm shadow-md focus:outline-none ${
                  !passwordsMatch && confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "focus:border-text2 focus:ring-text2"
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordType}
                className="absolute right-4"
              >
                {confirmPasswordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
            {!passwordsMatch && confirmPassword && (
              <p className="mt-2 text-sm text-red-500">
                Passwords do not match
              </p>
            )}
          </div>

          <EnterButton
            type="submit"
            disabled={
              loading ||
              !isPhoneValid ||
              !passwordsMatch ||
              passwordStrength.score < 3
            }
            className="mt-2 flex cursor-pointer justify-center bg-text2 text-center text-white"
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
          <p
            className="text- textPrimary font-sans font-semibold
"
          >
            Have an account?
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
