import React from "react";
import { Primary } from "../../../../../common/Button";

const EmailAmountModal = ({
  amount,
  setAmount,
  handlePaystackPayment,
}: any) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handlePaystackPayment(e);
  };

  return (
    <main className="font-sans">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Pay with Paystack</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount (NGN)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <Primary
            type="submit"
            className="mt-[2em] w-full bg-text2 py-2 text-white"
          >
            Pay with Paystack
          </Primary>
        </form>
      </div>
    </main>
  );
};

export default EmailAmountModal;
