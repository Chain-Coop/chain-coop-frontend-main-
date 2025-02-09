import React, { useState } from "react";
import { useAppDispatch } from "../../../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../../../shared/redux/store";
import { toast } from "react-toastify";
import { FundWallet } from "../../../../../../shared/redux/slices/transaction.slices";
import ReactLoading from "react-loading";
import { Button } from "@material-tailwind/react";

interface EmailAmountModalProps {
  closeModal: () => void;
}

const EmailAmountModal: React.FC<EmailAmountModalProps> = ({ closeModal }) => {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();

  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (numAmount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if (numAmount > 100000) {
      toast.error("Amount exceeds maximum limit");
      return;
    }

    setLoading(true);

    const body = {
      amount: numAmount,
    };

    dispatch(FundWallet(body))
      .unwrap()
      .then((response) => {
        setLoading(false);
        const paymentUrl = response?.transaction?.paymentUrl;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          toast.error("Invalid payment URL received");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        const errorMessage =
          error?.message || "An error occurred, please try again";
        toast.error(errorMessage);
      });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  const formatAmount = (value: string) => {
    if (!value) return "";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    return new Intl.NumberFormat("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  return (
    <main className="mx-auto max-w-full font-sans lg:w-[25em]">
      <div className="py-[3em]">
        <h2 className="mb-4 flex justify-center text-xl font-semibold">
          Pay with Paystack
        </h2>
        <form onSubmit={submitData}>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount (NGN)
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-2 text-gray-500">₦</span>
              <input
                type="text"
                id="amount"
                required
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="mt-1 block w-full rounded-md border border-gray-300 px-8 py-2 shadow-sm focus:border-text2 focus:outline-none focus:ring-text2 sm:text-sm"
              />
            </div>
            {amount && (
              <p className="mt-1 text-sm text-gray-500">
                You will be charged: ₦{formatAmount(amount)}
              </p>
            )}
          </div>
          <Button
            variant="text"
            type="submit"
            disabled={!amount || loading}
            className="mt-[1.5em] flex w-full justify-center bg-text2 py-2 text-white"
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              `Pay ₦${amount || "0.00"}`
            )}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default EmailAmountModal;
