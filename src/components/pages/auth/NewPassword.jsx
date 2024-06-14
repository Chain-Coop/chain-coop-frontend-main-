import { EnterButton } from "../../common/Button";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useEffect, useState } from "react";
import { RESET_PASSWORD } from "../../../shared/redux/services/landing.services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

const NewPassword = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setEmail(queryParams.get("email"));
    setOtp(queryParams.get("otp"));
  }, [location]);

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "string" : "password");
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "string" : "password",
    );
  };

  const handleChange2 = (event) => {
    const value = event.target.value;

    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (hasSpecialCharacter) {
      setSpecial(true);
    } else {
      setSpecial(false);
    }

    setPassword(value);
  };

  const validatePassword = () => {
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasSpecialCharacter || password.length < 8) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one special character",
      );
    } else {
      setPasswordError(null);
    }
  };

  const validate = () => {
    return password !== confirmPassword || password.length < 8 || !special;
  };

  // const resetPasswordFunc = async (e) => {
  //   e.preventDefault();

  //   validatePassword();

  //   if (password !== confirmPassword) {
  //     setConfirmPasswordError("Passwords do not match");
  //     return;
  //   } else {
  //     setConfirmPasswordError(null);
  //   }

  //   setLoading(true);
  //   const endpoint = `/auth/reset_password`;
  //   try {
  //     const response = await RESET_PASSWORD(endpoint, {
  //       email: email,
  //       otp: otp,
  //       password: password,
  //       confirmPassword: confirmPassword,
  //     });
  //     setLoading(false);
  //     console.log(response);
  //     if (response.status === 200) {
  //       toast.success("Password Reset Successfully");
  //       navigate("/login");
  //     } else {
  //       toast.error(response.data.msg);
  //     }
  //   } catch (e) {
  //     setLoading(false);
  //     toast.error(`Network error, kindly check your internet connection`);
  //   }
  // };

  const resetPasswordFunc = async (e) => {
    e.preventDefault();
    validatePassword();
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError(null);
    }
    setLoading(true);
    const endpoint = `/auth/reset_password`;
    try {
      const response = await RESET_PASSWORD(endpoint, {
        email: email,
        otp: otp,
        password: password,
        confirmPassword: confirmPassword,
      });
      setLoading(false);
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.msg);
        navigate("/login");
      } else {
        toast.error(response.data.msg);
      }
    } catch (respo) {
      setLoading(false);
      toast.error(error.response?.data?.msg);
    }
  };

  
  return (
    <main className="flex h-screen items-center justify-center bg-log font-sans">
      <section className="text-center sm:w-full lg:w-[45%]">
        <header className="px-[2em]">
          <h1 className="mb-4 font-sans text-3xl font-bold text-text2">
            Reset Password
          </h1>
        </header>
        <form
          onSubmit={resetPasswordFunc}
          className="form mt-[3em] w-full sm:px-[1em]"
        >
          <div>
            <label htmlFor="password-input" className="mb-3 flex text-text2">
              Enter New Password
            </label>
            <div className="relative flex items-center">
              <input
                placeholder="create new password"
                id="password-input"
                type={passwordType}
                onChange={handleChange2}
                onBlur={validatePassword}
                value={password}
                name="password"
                className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
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
            {passwordError && (
              <div className="mt-2 text-sm text-red-500">{passwordError}</div>
            )}
          </div>
          <div className="box1 lg:mt-[1.5em]">
            <label htmlFor="password-input" className="mb-3 flex text-text2">
              Re-Enter New Password
            </label>
            <div className="relative flex items-center">
              <input
                placeholder="confirm new password"
                id="password-input"
                type={confirmPasswordType}
                value={confirmPassword}
                name="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
              />
              <button
                type="button"
                className="absolute right-4 mb-3 flex"
                onClick={toggleConfirmPassword}
              >
                {confirmPasswordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
            {confirmPasswordError && (
              <div className="mt-2 text-sm text-red-500">
                {confirmPasswordError}
              </div>
            )}
          </div>
          <div className="mt-[1em] sm:px-[1em]">
            <EnterButton
              disabled={validate()}
              onClick={resetPasswordFunc}
              text="Create"
              loading={loading}
              className="sm:text-lg sm:font-semibold lg:font-normal"
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewPassword;
