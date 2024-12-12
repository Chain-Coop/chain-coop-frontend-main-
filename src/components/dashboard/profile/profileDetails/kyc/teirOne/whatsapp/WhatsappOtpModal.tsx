import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../shared/redux/store";
import { Primary } from "../../../../../../common/Button";
import ReactLoading from "react-loading";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { kycPhoneOtp } from "../../../../../../../shared/redux/slices/kyc.slices";

interface WhatsAppVerificationModalProps {
  onClose: () => void;
  onBack: () => void;
}

const WhatsAppVerificationModal: React.FC<WhatsAppVerificationModalProps> = ({
  onClose,
  onBack,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const getOtp = (e: any) => {
    e.preventDefault();

    setLoading(true);

    dispatch(kycPhoneOtp())
      .unwrap()
      .then((response) => {
        setLoading(false);
        toast.success(response.message);
        // onSuccess();
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    <main className="w-full max-w-[28em] px-2 font-sans md:px-5">
      <section className="flex flex-col gap-3 py-10 md:py-8">
        <div className="mt-[1em] flex flex-col gap-1">
          <header className="text-center sm:px-4">
            <h2 className="text-base font-bold leading-tight sm:text-lg md:text-lg">
              Update your Phone Number
            </h2>
          </header>
          <article className="px-2 text-center sm:px-3">
            <p className="text-sm font-medium text-gray-600">
              Upload your phone number for verification process.
            </p>
          </article>
        </div>

        <div className="mt-[1em] flex justify-center">
          <button
            onClick={getOtp}
            disabled={loading}
            className={`text-center text-lg font-semibold text-text2 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </div>
            ) : (
              "Generate OTP"
            )}
          </button>
        </div>
        <button
          onClick={onBack}
          className="mt-2 text-sm font-semibold text-text2 hover:text-text2/80"
        >
          Back to SMS verification
        </button>
      </section>
    </main>
  );
};

export default WhatsAppVerificationModal;
