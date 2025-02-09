import React, { useState } from "react";
import usePasswordToggle from "../../../../../shared/utils/usePasswordToggle";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { RESET_PASSWORD } from "../../../../../shared/redux/services/landing.services";
import ReactLoading from "react-loading";
import { Alert } from "@mui/material";
import { Button } from "@material-tailwind/react";

const NewPassword = ({ email, otp, onSuccess }: any) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordType, toggleNewPasswordType] = usePasswordToggle();
  const [confirmPasswordType, toggleConfirmPasswordType] = usePasswordToggle();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetPasswordFunc = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = `/auth/reset_password`;

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await RESET_PASSWORD(endpoint, {
        email: email,
        otp: otp,
        password: newPassword,
        confirmPassword: confirmNewPassword,
      });
      setLoading(false);
      if (response?.status === 200) {
        setError("");
        onSuccess();
      } else {
        setError(response.data.msg || "Error resetting password");
      }
    } catch (error) {
      setLoading(false);
      setError("Error resetting password");
    }
  };

  return (
    <main className="w-[25em] py-[1em] font-sans">
      <section>
        <header>
          <h1 className="text-center text-2xl font-semibold">Reset Password</h1>
        </header>
        <form
          onSubmit={resetPasswordFunc}
          className="mt-[1.5em] flex flex-col gap-[1.5em]"
        >
          <div>
            <label
              htmlFor="newPassword"
              className="text-lg font-semibold text-text2"
            >
              Enter New Password
            </label>
            <div className="relative mt-2 flex items-center">
              <input
                id="newPassword"
                type={newPasswordType}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-full border-[1px] bg-white p-3 shadow-lg focus:border-text2 focus:outline-none focus:ring-text2"
              />
              <button
                type="button"
                onClick={toggleNewPasswordType}
                className="absolute right-4 self-center"
              >
                {newPasswordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-lg font-semibold text-text2"
            >
              Confirm Password
            </label>
            <div className="relative mt-2 flex items-center">
              <input
                id="confirmPassword"
                type={confirmPasswordType}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full rounded-full border-[1px] bg-white p-3 shadow-lg focus:border-text2 focus:outline-none focus:ring-text2"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordType}
                className="absolute right-4 self-center"
              >
                {confirmPasswordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
          </div>

          {error && (
            <Alert severity="error" className="mt-4">
              {error}
            </Alert>
          )}

          <Button
            variant="text"
            type="submit"
            disabled={loading}
            className="m-auto mt-8 flex w-[60%] justify-center rounded-full bg-text2 px-3 py-3 text-lg text-white"
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
                className="inline-block"
              />
            ) : (
              "Reset"
            )}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default NewPassword;
