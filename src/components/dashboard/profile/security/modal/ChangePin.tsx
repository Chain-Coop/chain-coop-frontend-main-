import React, { useState } from "react";
import { useAppDispatch } from "../../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../../shared/redux/store";
import { CreateTransactionPin } from "../../../../../shared/redux/slices/transaction.slices";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import usePasswordToggle from "../../../../../shared/utils/usePasswordToggle";

const ChangePin = ({ otp, onClose }: any) => {
  const dispatch: AppDispatch = useAppDispatch();

  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [passwordType, togglePasswordType] = usePasswordToggle();

  const handleSubmit = () => {
    if (newPin !== confirmPin) {
      setError("Pins do not match");
      return;
    }

    if (newPin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    dispatch(
      CreateTransactionPin({
        otp: parseInt(otp),
        newpin: newPin,
      }),
    )
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          onClose();
        }
      })
      .catch((error) => {
        console.log("err", error);
        setError(error.message || "Failed to create PIN");
      });
  };

  return (
    <main className="font-sans">
      <section className="flex flex-col gap-[1em] py-[2em]">
        <div className="flex flex-col text-center">
          <header>
            <h1 className="text-2xl font-semibold">Create New PIN</h1>
          </header>

          {error && <div className="mb-3 text-red-500">{error}</div>}
          <div className="mt-[1.7em] flex flex-col gap-[1em]">
            <div>
              <label htmlFor="password-input" className="mb-3 flex text-text2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password-input"
                  type={passwordType}
                  value={newPin}
                  required
                  onChange={(e) => setNewPin(e.target.value)}
                  className="input mb-5 h-[4em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
                />
                <button
                  type="button"
                  onClick={togglePasswordType}
                  className="absolute right-4 mb-3 self-center"
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
                htmlFor="confirmPin"
                className="mb-3 flex font-semibold text-text2"
              >
                Confirm PIN
              </label>
              <input
                type="password"
                id="confirmPin"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                maxLength={4}
                required
                className="input h-[3em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="relative m-auto mt-[2em] flex w-[55%] justify-center rounded-full bg-text2 p-[10px] font-medium text-text5"
            >
              Create PIN
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChangePin;
