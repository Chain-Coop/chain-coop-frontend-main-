import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import FormInput from "../../components/common/FormInput";
import { ResetPassword } from "../../shared/redux/slices/landing.slices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../shared/redux/store";
import { FaArrowLeft } from "react-icons/fa6";

const NewPassword = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    if (email !== null) {
      setEmail(email);
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

    try {
      const resultAction = await dispatch(
        ResetPassword({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
      );

      if (ResetPassword.fulfilled.match(resultAction)) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        const errorMsg =
          (resultAction.payload as string) || "Failed to reset password";
        toast.error(errorMsg);
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log px-[1em] ">
      <div
        className="absolute left-0 top-0 ml-[4em] mt-[4em] cursor-pointer sm:hidden lg:block"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft size={35} fill="#440080" />
      </div>
      <section className="relative w-full text-center lg:w-[45%]">
        <header className="px-[2em]">
          <h1 className="mb-4 text-3xl font-bold text-text2">Reset Password</h1>
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
