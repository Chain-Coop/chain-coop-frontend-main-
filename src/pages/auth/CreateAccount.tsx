import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { Button, Typography } from "@material-tailwind/react";
import Select from "react-select";
import logo from "../../Assets/svg/auth/logo.svg";
import usePasswordToggle from "../../shared/utils/usePasswordToggle";
import { AppDispatch } from "../../shared/redux/store";
import { RootState } from "../../shared/redux/rootReducer";
import {
  checkPasswordStrength,
  getPasswordStrengthColor,
  membershipOptions,
} from "../../shared/utils/Helpers";
import {
  RegisterUser,
  resetAuthState,
} from "../../shared/redux/slices/landing.slices";
import { clearMessage } from "../../shared/redux/slices/message.slices";
import FormInput from "../../components/common/FormInput";
import { PhoneNumberInput } from "../../components/common/phoneNumberInput";
import { ROUTES } from "../../shared/routes";
import { RegisterUserRequest } from "../../shared/types";

const CreateAccount = () => {
  const [formData, setFormData] = useState<RegisterUserRequest>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phoneNumber: "",
    membershipType: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
  });
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordType, togglePasswordType] = usePasswordToggle();
  const [confirmPasswordType, toggleConfirmPasswordType] = usePasswordToggle();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, registerSuccess } = useSelector(
    (state: RootState) => state.landing,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(checkPasswordStrength(formData.password));
    } else {
      setPasswordStrength({ score: 0, message: "" });
    }
  }, [formData.password]);

  useEffect(() => {
    setPasswordsMatch(
      formData.password === confirmPassword || confirmPassword === "",
    );
  }, [formData.password, confirmPassword]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof RegisterUserRequest)[] = [
      "firstName",
      "lastName",
      "email",
      "username",
      "phoneNumber",
      "membershipType",
      "password",
    ];
    if (requiredFields.some((field) => !formData[field])) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!isPhoneValid) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    if (passwordStrength.score < 3) {
      toast.error("Please choose a stronger password.");
      return;
    }

    try {
      const response = await dispatch(RegisterUser(formData)).unwrap();
      toast.success("Signup successful! Please verify your email.");
      navigate(
        `/verify-email?email=${encodeURIComponent(formData.email)}&phoneNumber=${encodeURIComponent(formData.phoneNumber)}&userId=${response.user._id}`,
      );
    } catch (err) {
      // Error handled by useEffect
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: RegisterUserRequest) => ({ ...prev, [name]: value }));
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      height: "3rem",
      borderRadius: "9999px",
      borderColor: "#E5E7EB",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      "&:hover": {
        borderColor: "#440080",
      },
    }),
    option: (base: any, state: { isSelected: boolean }) => ({
      ...base,
      backgroundColor: state.isSelected ? "#440080" : "white",
      "&:hover": {
        backgroundColor: state.isSelected ? "#440080" : "#F3F4F6",
      },
    }),
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
            alt="Chain Co-op Logo"
            className="mx-auto mb-4 w-20 cursor-pointer"
            onClick={handleHomeClick}
          />
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            Create Your Account
          </h1>
          <Typography className="text-center font-medium text-gray-600">
            Start building your investment portfolio and track your growth.
          </Typography>
        </header>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
          noValidate
        >
          <FormInput
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            disabled={isLoading}
            required
          />
          <FormInput
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            disabled={isLoading}
            required
          />
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />
          <FormInput
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Choose a username"
            disabled={isLoading}
            required
          />
          <div>
            <label
              htmlFor="phoneNumber-input"
              className="mb-2 block text-start text-sm font-semibold text-gray-700"
            >
              Phone Number
            </label>
            <PhoneNumberInput
              value={formData.phoneNumber}
              onChange={(value: string) =>
                setFormData((prev: RegisterUserRequest) => ({
                  ...prev,
                  phoneNumber: value,
                }))
              }
              disabled={isLoading}
              onValidityChange={setIsPhoneValid}
            />
            {formData.phoneNumber && !isPhoneValid && (
              <p className="mt-1 text-sm text-red-500">
                Please enter a valid WhatsApp phone number
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="membershipType-input"
              className="mb-2 block text-start text-sm font-semibold text-gray-700"
            >
              Membership Type
            </label>
            <Select
              id="membershipType-input"
              value={membershipOptions.find(
                (option) => option.value === formData.membershipType,
              )}
              onChange={(option: any | null) =>
                setFormData((prev: RegisterUserRequest) => ({
                  ...prev,
                  membershipType: option?.value || "",
                }))
              }
              options={membershipOptions}
              styles={customSelectStyles}
              isDisabled={isLoading}
              placeholder="Select membership type"
            />
          </div>
          <FormInput
            label="Password"
            type={passwordType}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            disabled={isLoading}
            autoComplete="new-password"
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
            helperText={
              formData.password && (
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
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            disabled={isLoading}
            required
            error={
              !passwordsMatch && confirmPassword ? "Passwords do not match" : ""
            }
            rightElement={
              <button
                type="button"
                onClick={toggleConfirmPasswordType}
                aria-label="Toggle confirm password visibility"
              >
                {confirmPasswordType === "password" ? (
                  <MdOutlineVisibilityOff size={20} />
                ) : (
                  <MdOutlineVisibility size={20} />
                )}
              </button>
            }
          />
          <Button
            type="submit"
            className="relative mt-[2em] flex w-full items-center justify-center rounded-full bg-text2 p-4 text-center text-sm font-semibold normal-case text-text5"
            disabled={
              isLoading ||
              !isPhoneValid ||
              !passwordsMatch ||
              passwordStrength.score < 3 ||
              !formData.firstName ||
              !formData.lastName ||
              !formData.email ||
              !formData.username ||
              !formData.phoneNumber ||
              !formData.membershipType ||
              !formData.password
            }
            loading={isLoading}
          >
            Sign Up
          </Button>
          <div className="mt-4 flex justify-center text-sm">
            <p className="text-textPrimary font-semibold">
              Have an account?
              <span className="ml-2 font-medium text-text2">
                <Link to={ROUTES.sign_in}>Sign in</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CreateAccount;
