import { formatPayStackAmount } from "../../../../../../shared/utils/format";
import React, { useState } from "react";
import { Primary } from "../../../../../common/Button";

interface EmailAmountModalProps {
  amount: number | string;
  setAmount: (value: number) => void;
  handlePaystackPayment: (e: React.FormEvent) => void;
  closeModal: () => void;
}

const EmailAmountModal: React.FC<EmailAmountModalProps> = ({
  amount,
  setAmount,
  handlePaystackPayment,
  closeModal,
}) => {
  const [inputValue, setInputValue] = useState<string>(
    amount ? amount.toString() : "",
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(formatPayStackAmount(value));

    setAmount(Number(value.replace(/,/g, "")));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePaystackPayment(e);
  };

  return (
    <main className="font-sans">
      <div className="py-[3em]">
        <h2 className="mb-4 flex justify-center text-xl font-semibold">
          Pay with Paystack
        </h2>
        <form onSubmit={handleSubmit}>
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
              value={inputValue}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-text2 focus:outline-none focus:ring-text2 sm:text-sm"
            />
          </div>
          <Primary
            type="submit"
            className="mt-[1.5em] w-full bg-text2 py-2 text-white"
          >
            Pay with Paystack
          </Primary>
        </form>
      </div>
    </main>
  );
};

export default EmailAmountModal;
