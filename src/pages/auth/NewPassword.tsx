import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { RESET_PASSWORD } from "../../shared/redux/services/landing.services";
import FormInput from "../../components/common/FormInput";

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
    const email = queryParams.get("email");
    const otp = queryParams.get("otp");

    if (email !== null) {
      setEmail(email);
    }
    if (otp !== null) {
      setOtp(otp);
    }
  }, [location]);

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password",
    );
  };

  const resetPasswordFunc = async (e: any) => {
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
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data?.msg);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log px-[1em] ">
      <section className="w-full text-center lg:w-[45%]">
        <header className="px-[2em]">
          <h1 className="mb-4  text-3xl font-bold text-text2">
            Reset Password
          </h1>
        </header>
        <form
          onSubmit={resetPasswordFunc}
          className="mt-[3em] w-full sm:px-[1em]"
        >
          <FormInput
            label="Enter New Password"
            id="password-input"
            name="password"
            type={passwordType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="create new password"
            required
            labelClassName="text-text2"
            rightElement={
              <button type="button" onClick={togglePassword} className="flex">
                {passwordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            }
          />

          <FormInput
            label="Re-Enter New Password"
            id="confirm-password-input"
            name="confirmPassword"
            type={confirmPasswordType}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm new password"
            required
            wrapperClassName="lg:mt-[1.5em]"
            labelClassName="text-text2"
            rightElement={
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="flex"
              >
                {confirmPasswordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            }
          />

          <div className="mt-[1em] sm:px-[1em]">
            <Button
              type="submit"
              className="relative mt-[2em] flex w-full items-center justify-center rounded-full bg-text2 p-4 text-center text-sm font-semibold normal-case text-text5"
              disabled={loading}
              loading={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewPassword;
