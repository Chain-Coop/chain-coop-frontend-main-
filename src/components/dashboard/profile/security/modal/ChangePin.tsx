import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../shared/redux/store";
import { CreateTransactionPin } from "../../../../../shared/redux/slices/transaction.slices";
import ReactLoading from "react-loading";
import { Alert } from "@mui/material";
import OtpInput from "../../../../../shared/utils/OtpInput";

interface ChangePinProps {
  otp: string;
  onClose: () => void;
  onSuccess: () => void;
}

const ChangePin: React.FC<ChangePinProps> = ({ otp, onClose, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSubmit = () => {
    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    if (pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    setLoading(true);

    dispatch(
      CreateTransactionPin({
        otp: parseInt(otp),
        newpin: pin,
      }),
    )
      .unwrap()
      .then(() => {
        onSuccess();
      })
      .catch((error: any) => {
        setError(error || "Failed to create PIN");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="font-sans lg:w-[25em]">
      <section className="flex flex-col gap-[1em] py-[1.5em]">
        <div className="flex flex-col text-center">
          <header>
            <h1 className="text-2xl font-semibold">Create New PIN</h1>
          </header>

          <div className="mt-[1.7em] flex flex-col gap-[1em]">
            <OtpInput
              value={pin}
              onChange={setPin}
              showVisibilityToggle
              label="Enter New PIN"
            />

            <OtpInput
              value={confirmPin}
              onChange={setConfirmPin}
              showVisibilityToggle
              label="Re-enter PIN"
            />

            {error && <Alert severity="error">{error}</Alert>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`relative m-auto mt-[1em] flex w-[55%] justify-center 
                         rounded-full p-[10px] font-medium
                         ${
                           loading
                             ? "cursor-not-allowed bg-text2 text-white"
                             : "bg-text2 text-text5"
                         }`}
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
                "Create PIN"
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChangePin;
