import React, { useState } from "react";
import { Primary } from "../../../../../common/Button";
import { useAppDispatch } from "../../../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../../../shared/redux/store";
import { toast } from "react-toastify";
import { FundWallet } from "../../../../../../shared/redux/slices/transaction.slices";
import ReactLoading from "react-loading";

interface EmailAmountModalProps {
  closeModal: () => void;
}

const EmailAmountModal: React.FC<EmailAmountModalProps> = ({
  closeModal,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();
 
  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!amount || isNaN(parseFloat(amount))) {
      toast.error("Please input a valid amount");
      return;
    }
  
    setLoading(true);
      const amountInKobo = Math.round(parseFloat(amount) * 100);

    let body = {
      amount: amountInKobo,
    };
  
    dispatch(FundWallet(body))
      .unwrap()
      .then((response) => {
        setLoading(false);
        const paymentUrl = response?.landing?.paymentUrl;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        }
      })
      .catch((error: any) => {
        setLoading(false);
        const errorMessage = error?.message || "An error occurred, please try again";
        toast.error(errorMessage);
      });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  return (
    <main className="font-sans">
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
            <input
              type="text"
              id="amount"
              required
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-text2 focus:outline-none focus:ring-text2 sm:text-sm"
            />
          </div>
          <Primary
            type="submit"
            className="mt-[1.5em] w-full bg-text2 py-2 text-white"
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              "Pay with Paystack"
            )}
          </Primary>
        </form>
      </div>
    </main>
  );
};

export default EmailAmountModal;