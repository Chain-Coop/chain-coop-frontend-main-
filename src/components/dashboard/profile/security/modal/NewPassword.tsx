import React from "react";
import usePasswordToggle from "../../../../../shared/utils/usePasswordToggle";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const NewPassword = () => {
  const [passwordType, togglePasswordType] = usePasswordToggle();
  const [confirmPasswordType, toggleConfirmPasswordType] = usePasswordToggle();

  return (
    <main className="font-sans">
      <div>
        <label htmlFor="password" className="flex-start flex font-medium">
          Old Password
        </label>
        <div className="relative flex items-center text-center">
          <input
            id="password"
            name="password"
            type={passwordType}
            className="mt-[1em] w-full rounded-full border-[2px] bg-white p-3 shadow-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordType}
            className="absolute right-4 mt-[1em] self-center"
          >
            {passwordType === "password" ? (
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
          className="flex-start flex font-medium"
        >
          New Password
        </label>
        <div className="relative flex items-center text-center">
          <input
            name="confirmPassword"
            id="confirmPassword"
            type={confirmPasswordType}
            className="mt-[1em] w-full rounded-full border-[2px] bg-white p-3 shadow-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordType}
            className="absolute right-4 mt-[1em] self-center"
          >
            {confirmPasswordType === "password" ? (
              <MdOutlineVisibilityOff />
            ) : (
              <MdOutlineVisibility />
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default NewPassword;
