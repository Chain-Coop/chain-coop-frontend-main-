import React, { useState } from "react";
import { Primary } from "../../../../common/Button";

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
    <main className="font-sans py-9">
      <header className="flex text-center flex-col">
        <h1 className="text-text2 text-xl font-bold">Payment Plan</h1>
        <p className="font-medium text-lg text-text2">Choose your payment option</p>
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
            <label htmlFor="installment" className="flex-1 flex justify-between items-center">
              <h2 className="font-medium">Installment Payment</h2>
            </label>
          </div>
        </div>
      </section>
      <Primary className="mt-[3em] w-full bg-text2 py-3 text-white" onClick={handleContinueClick}>
        Continue
      </Primary>
    </main>
  );
};

export default PaymentPlan;
