import React, { useState } from "react";
import { brandPrimary } from "../../../../common/Button";

interface PaymentPlanProps {
  onContinue: (selectedPlan: string) => void;
}

const PaymentPlan: React.FC<PaymentPlanProps> = ({ onContinue }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleContinueClick = () => {
    if (selectedOption === "installment") {
      onContinue("Installment");
    }
  };

  return (
    <main className="py-9 font-sans">
      <header className="flex flex-col text-center">
        <h1 className="text-xl font-bold text-text2">Payment Plan</h1>
        <p className="text-lg font-medium text-text2">
          Choose your payment option
        </p>
      </header>
      <section className="mt-[2em]">
        <div className="flex flex-col gap-[2.5em]">
          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="installment"
              name="paymentOption"
              value="installment"
              checked={selectedOption === "installment"}
              className="cursor-pointer"
              onChange={handleOptionChange}
            />
            <label
              htmlFor="installment"
              className="flex flex-1 items-center justify-between"
            >
              <h2 className="font-medium">Installment Payment</h2>
            </label>
          </div>
        </div>
      </section>
      <Primary
        className="mt-[3em] w-full bg-text2 py-3 text-white"
        onClick={handleContinueClick}
      >
        Continue
      </Primary>
    </main>
  );
};

export default PaymentPlan;
