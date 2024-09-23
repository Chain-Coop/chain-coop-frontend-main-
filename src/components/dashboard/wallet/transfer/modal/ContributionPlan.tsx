import React, { useState } from "react";
import { Primary } from "../../../../common/Button";

interface ContributionPlanProps {
  onConfirm: (selectedPlan: string) => void;
}

const ContributionPlan: React.FC<ContributionPlanProps> = ({ onConfirm }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      onConfirm(selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1));
    }
  };

  return (
    <main className="font-sans py-9">
      <header className="flex flex-col gap-2 text-center">
        <h2 className="text-lg font-semibold">Contribution Plan</h2>
        <p className="font-medium">Select a plan for your contribution</p>
      </header>
      <section className="mt-[2em]">
        <div className="flex flex-col gap-[1.5em]">
          {["Daily", "Weekly", "Monthly", "Yearly"].map((option) => (
            <div key={option} className="flex items-center gap-4">
              <input
                type="radio"
                id={option.toLowerCase()}
                name="paymentOption"
                value={option.toLowerCase()}
                checked={selectedOption === option.toLowerCase()}
                className="cursor-pointer"
                onChange={handleOptionChange}
              />
              <label
                htmlFor={option.toLowerCase()}
                className="flex flex-1 items-center justify-between"
              >
                <h2 className="font-medium">{option}</h2>
              </label>
            </div>
          ))}
        </div>
      </section>
      <Primary
        className="mt-[3em] w-full bg-text2 py-3 text-white"
        onClick={handleConfirm}
        disabled={!selectedOption}
      >
        Confirm
      </Primary>
    </main>
  );
};

export default ContributionPlan;