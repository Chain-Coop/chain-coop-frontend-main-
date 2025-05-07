import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../Assets/svg/auth/logo.svg";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Select from "react-select";
import { Button, Typography } from "@material-tailwind/react";
import usePasswordToggle from "../../shared/utils/usePasswordToggle";
import { AppDispatch } from "../../shared/redux/store";
import FormInput from "../../components/common/FormInput";
import { ROUTES } from "../../shared/routes";
import { RegisterUser } from "../../shared/redux/slices/landing.slices";
import { PhoneNumberInput } from "../../components/common/phoneNumberInput";

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
      toast.error("Please enter a valid phone number");
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
      .then((response: any) => {
        const userId = response?.landing?.user?._id;
        setFirstName("");
        setLastName("");
        setEmail("");
        setUsername("");
        setPhoneNumber("");
        setMembershipType("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);

        navigate(
          `/verify-email?email=${email}&phoneNumber=${encodeURIComponent(phoneNumber)}&userId=${userId}`,
        );
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    <main className="h-vh flex items-center justify-center bg-log pt-[1em] ">
      <section className="px-[1em] text-center lg:w-[48%]">
        <div>
          <img
            src={logo}
            alt="Logo"
            className="mx-auto mb-4 h-[5em] cursor-pointer"
            onClick={home}
          />
          <Typography
            variant="h1"
            className="mb-4 text-3xl font-bold text-text2"
          >
            Create Your Account
          </Typography>
          <Typography className="font-medium text-howtext">
            Start building your investment portfolio and track your growth
          </Typography>
        </div>

        <form className="flex flex-col gap-6" onSubmit={registerUser}>
          <FormInput
            label="First Name"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="first name"
            disabled={loading}
            required
          />

          <FormInput
            label="Last Name"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="last name"
            disabled={loading}
            required
          />

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

          <FormInput
            label="Username"
            type="text"
            id="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            disabled={loading}
            required
          />

          <div>
            <label
              htmlFor="phoneNumber-input"
              className="text- textPrimary mb-2 flex font-semibold"
            >
              Phone Number
            </label>
            <PhoneNumberInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              disabled={loading}
              onValidityChange={setIsPhoneValid}
            />
            {phoneNumber && !isPhoneValid && (
              <p className="mt-1 text-sm text-red-500">
                Please enter a valid whatsapp phone number
              </p>
            )}
          </div>
          <FormInput
            label="Membership Type"
            customInput={
              <Select
                value={membershipOptions.find(
                  (option) => option.value === membershipType,
                )}
                onChange={(option) => setMembershipType(option?.value || "")}
                options={membershipOptions}
                styles={customSelectStyles}
                isDisabled={loading}
              />
            }
          />

          <FormInput
            label="Password"
            type={passwordType}
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={loading}
            autoComplete="new-password"
            required
            rightElement={
              <button type="button" onClick={togglePasswordType}>
                {passwordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            }
            helperText={
              password && (
                <>
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
                </>
              )
            }
          />

          <FormInput
            label="Confirm Password"
            type={confirmPasswordType}
            id="confirm-password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            disabled={loading}
            required
            error={
              !passwordsMatch && confirmPassword ? "Passwords do not match" : ""
            }
            rightElement={
              <button type="button" onClick={toggleConfirmPasswordType}>
                {confirmPasswordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            }
          />

          <Button
            type="submit"
            className="relative mt-[2em] flex w-full items-center justify-center rounded-full bg-text2 p-4 text-center text-sm font-semibold normal-case text-text5"
            disabled={
              loading ||
              !isPhoneValid ||
              !passwordsMatch ||
              passwordStrength.score < 3 ||
              !membershipType
            }
            loading={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </Button>
        </form>
        <div
          className="absolute left-0 top-0 ml-[4em] mt-[4em] cursor-pointer sm:hidden lg:block"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={35} fill="#440080" />
        </div>

        <div className="flex justify-center py-5">
          <p
            className="text- textPrimary  font-semibold
"
          >
            Have an account?
            <span className="ml-2  font-medium text-text2">
              <Link to={ROUTES.sign_in}>Sign in</Link>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default CreateAccount;
