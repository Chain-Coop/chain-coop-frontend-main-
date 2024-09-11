import React from "react";
import usePasswordToggle from "../../../../../shared/utils/usePasswordToggle";
import {  Primary } from "../../../../common/Button";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const NewPassword = () => {
  const [passwordType, togglePasswordType] = usePasswordToggle();
  const [confirmPasswordType, toggleConfirmPasswordType] = usePasswordToggle();
  const [confirmNewPasswordType, toggleConfirmNewPasswordType] =
    usePasswordToggle();

  return (
    <main className="font-sans">
      <section className="flex flex-col gap-[1em] py-[3em]">
        <div>
          <label
            htmlFor="password"
            className="flex-start flex text-lg font-semibold text-text2"
          >
            Enter Old Password
          </label>
          <div className="relative flex items-center text-center">
            <input
              id="password"
              name="password"
              type={passwordType}
              className="mt-[10px] w-full rounded-full  border-[1px] bg-white p-3 shadow-lg focus:border-text2 focus:outline-none focus:ring-text2"
            />
            <button
              type="button"
              onClick={togglePasswordType}
              className="absolute right-4 mt-[1em] self-center"
            >
              {confirmNewPasswordType === "password" ? (
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
            className="flex-start flex text-lg font-semibold text-text2"
          >
            Enter New Password
          </label>
          <div className="relative flex items-center text-center">
            <input
              name="confirmPassword"
              id="confirmPassword"
              type={confirmPasswordType}
              className="mt-[10px] w-full rounded-full  border-[1px] bg-white p-3 shadow-lg focus:border-text2 focus:outline-none focus:ring-text2"
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

        <Primary className="m-auto mt-8 flex w-[60%] justify-center rounded-full bg-text2 px-3 py-3 text-lg text-white">
          Reset
        </Primary>
      </section>
    </main>
  );
};

export default NewPassword;
