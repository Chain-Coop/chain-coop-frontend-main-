import React, { useState } from "react";
import { Primary } from "../../../../common/Button";

interface ContributionPlanProps {
  onConfirm: (contributionPlan: string, amount: number) => void;
}

const ContributionPlan: React.FC<ContributionPlanProps> = ({ onConfirm }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const getAmount = () => {
    switch (selectedOption) {
      case "tier1":
        return 5000;
      case "tier2":
        return 10000;
      case "tier3":
        return 25000;
      default:
        return 0; 
    }
  };

  const handleConfirmClick = () => {
    const amount = getAmount();
    onConfirm(selectedOption, amount);
  };

  return (
    <main className="font-sans py-9">
      <header className="flex flex-col gap-2 text-center">
        <h2 className="text-lg font-semibold">Contribution Plan</h2>
        <p className="font-medium">Select a tier for your monthly contribution</p>
      </header>
      <section className="mt-[2em]">
        <div className="flex flex-col gap-[1.5em]">
          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="tier1"
              name="paymentOption"
              value="tier1"
              checked={selectedOption === "tier1"}
              className="cursor-pointer"
              onChange={handleOptionChange}
            />
            <label
              htmlFor="tier1"
              className="flex flex-1 items-center justify-between"
            >
              <h2 className="font-medium">Tier 1</h2>
              <figure
                className={`${
                  selectedOption === "tier1"
                    ? "text-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                NGN 5,000.00 Monthly
              </figure>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="tier2"
              name="paymentOption"
              value="tier2"
              checked={selectedOption === "tier2"}
              className="cursor-pointer"
              onChange={handleOptionChange}
            />
            <label
              htmlFor="tier2"
              className="flex flex-1 items-center justify-between"
            >
              <h2 className="font-medium">Tier 2</h2>
              <figure
                className={`${
                  selectedOption === "tier2"
                    ? "text-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                NGN 10,000.00 Monthly
              </figure>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="tier3"
              name="paymentOption"
              value="tier3"
              checked={selectedOption === "tier3"}
              className="cursor-pointer"
              onChange={handleOptionChange}
            />
            <label
              htmlFor="tier3"
              className="flex flex-1 items-center justify-between"
            >
              <h2 className="font-medium">Tier 3</h2>
              <figure
                className={`${
                  selectedOption === "tier3"
                    ? "text-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                NGN 25,000.00 Monthly
              </figure>
            </label>
          </div>
        </div>
      </section>
      <Primary
        onClick={handleConfirmClick}
        className="mt-[3em] w-full bg-text2 py-3 text-white"
      >
        Confirm
      </Primary>
    </main>
  );
};

export default ContributionPlan;
