import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreatePool } from "../../../../../shared/redux/slices/kyc.slices";
import { AppDispatch } from "../../../../../shared/redux/store";
import cryptoSavings from "../../../../../Assets/png/dashboard/cryptSavings.png";
import { useCryptoWallet } from "../../../../../shared/Hooks/useBalance";
import { toast } from "react-toastify";

interface FormData {
  tokenId: number;
  initialSaveAmount: string;
  goalAmount: string;
  reasonForSaving: string;
  duration: number;
}

const CryptoModal = ({ onClose }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { Balance } = useCryptoWallet();
  const [formData, setFormData] = useState<FormData>({
    tokenId: 3,
    initialSaveAmount: "",
    goalAmount: "",
    reasonForSaving: "",
    duration: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setError("");

    if (id === "duration") {
      const selectedDate = new Date(value).getTime();
      const now = new Date().getTime();
      const durationInSeconds = Math.floor((selectedDate - now) / 1000);

      setFormData((prevState) => ({
        ...prevState,
        duration: Math.max(0, durationInSeconds),
      }));
    } else if (id === "initialSaveAmount") {
      const depositAmount = parseFloat(value);
      const currentBalance = parseFloat(Balance || "0");

      if (depositAmount > currentBalance) {
        setError("Deposit amount cannot exceed your available balance");
      }

      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const depositAmount = parseFloat(formData.initialSaveAmount);
    const currentBalance = parseFloat(Balance || "0");

    if (depositAmount > currentBalance) {
      setError("Deposit amount cannot exceed your available balance");
      return;
    }

    setLoading(true);
    try {
      await dispatch(CreatePool(formData)).unwrap();
      onClose();
      toast.success("Savings Created Successfully");
    } catch (error) {
      console.error("Error creating pool:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    const depositAmount = parseFloat(formData.initialSaveAmount);
    const currentBalance = parseFloat(Balance || "0");

    return (
      formData.duration > 0 &&
      formData.initialSaveAmount !== "" &&
      formData.goalAmount !== "" &&
      formData.reasonForSaving !== "" &&
      depositAmount <= currentBalance
    );
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="w-full px-4 font-sans sm:px-6 md:px-8 lg:max-w-[28em] lg:px-2">
      <section className="gap flex flex-col">
        <div className="flex flex-col gap-1">
          <header className="text-center sm:px-4">
            <h2 className="text-xl font-bold leading-tight text-text2">
              Crypto Savings
            </h2>
          </header>

          <section>
            <div className="mt-2 flex justify-center">
              <img
                src={cryptoSavings}
                alt="savings-crypt"
                className="h-auto max-w-full"
              />
            </div>
          </section>

          <section className="mx-auto w-full sm:w-[90%] md:w-[85%] lg:w-[23em]">
            <div className="mb-4">
              <label htmlFor="tokenId" className="mb-3 flex">
                Token
              </label>
              <input
                type="text"
                id="tokenId"
                value="USDC"
                readOnly
                className="input mb-2 h-[3em] w-full cursor-not-allowed rounded-full border-[1px] bg-gray-50 px-4 text-sm shadow-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="initialSaveAmount" className="mb-3 flex">
                Deposit Amount
              </label>
              <input
                type="text"
                id="initialSaveAmount"
                value={formData.initialSaveAmount}
                onChange={handleChange}
                required
                placeholder="enter your deposit amount"
                className="input mb-2 h-[3em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
              {error && (
                <p className="mb-2 ml-4 text-sm text-red-500">{error}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="goalAmount" className="mb-1 flex">
                Target Amount
              </label>
              <input
                type="text"
                id="goalAmount"
                value={formData.goalAmount}
                onChange={handleChange}
                required
                placeholder="enter your target amount"
                className="input mb-2 h-[3em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="reasonForSaving" className="mb-1 flex">
                Saving Description
              </label>
              <input
                type="text"
                id="reasonForSaving"
                value={formData.reasonForSaving}
                onChange={handleChange}
                required
                placeholder="enter your savings description"
                className="input mb-3 h-[3em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="duration" className="mb-3 flex">
                Duration
              </label>
              <input
                type="date"
                id="duration"
                min={today}
                onChange={handleChange}
                className="input mb-3 h-[3em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
            </div>
          </section>
        </div>

        <div className="flex justify-center px-4 sm:px-0">
          <button
            onClick={handleSubmit}
            disabled={loading || !isFormValid()}
            className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-text2 px-6 py-2 text-center font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 sm:px-9"
          >
            {loading ? (
              <div className="flex items-center justify-center text-center">
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
                Creating Savings...
              </div>
            ) : (
              "Done"
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default CryptoModal;
