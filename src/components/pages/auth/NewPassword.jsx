import { EnterButton } from "../../common/Button";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useEffect, useState } from "react";
import { RESET_PASSWORD } from "../../../shared/redux/services/landing.services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

const NewPassword = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
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
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password",
    );
  };

  const resetPasswordFunc = async (e) => {
    e.preventDefault();
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
      if (response.status === 200) {
        toast.success(response.data.msg);
        navigate("/login");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
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
          className="mt-[3em] w-full sm:px-[1em]"
        >
          <div>
            <label htmlFor="password-input" className="mb-3 flex text-text2">
              Enter New Password
            </label>
            <div className="relative flex items-center">
              <input
                id="password-input"
                name="password"
                type={passwordType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="create new password"
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
          </div>
          <div className="lg:mt-[1.5em]">
            <label
              htmlFor="confirm-password-input"
              className="mb-3 flex text-text2"
            >
              Re-Enter New Password
            </label>
            <div className="relative flex items-center">
              <input
                placeholder="confirm new password"
                id="confirm-password-input"
                type={confirmPasswordType}
                value={confirmPassword}
                name="confirmPassword"
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
          </div>
          <div className="mt-[1em] sm:px-[1em]">
            <EnterButton type="submit" className="mt-[2em]">
              {loading ? (
                <ReactLoading
                  color="#FFFFFF"
                  width={25}
                  height={25}
                  type="spin"
                />
              ) : (
                "Submit"
              )}
            </EnterButton>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewPassword;
