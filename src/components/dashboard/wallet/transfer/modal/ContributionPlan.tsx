import React, { useState } from "react";
import { Primary } from "../../../../common/Button";
import { useNavigate } from "react-router";

const ContributionPlan: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const navigate = useNavigate();

  const confirmTransaction = () => {
    navigate("/dashboard/contribution/confirm_Transaction");
  };

  return (
    <main className="font-sans py-9">
      <header className="flex text-center flex-col">
        <p className="font-medium text-lg">Select your contribution plan</p>
      </header>
      <section className="mt-[2em]">
        <div className="flex flex-col gap-[1.5em]">
          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="daily"
              name="paymentOption"
              value="daily"
              checked={selectedOption === "daily"}
               className="cursor-pointer"
              onChange={handleOptionChange}
            />
            <label htmlFor="daily" className="flex-1 flex justify-between items-center">
              <h2 className="font-medium">Daily</h2>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="weekly"
              name="paymentOption"
              value="weekly"
              checked={selectedOption === "weekly"}
               className="cursor-pointer"
              onChange={handleOptionChange}
            />
            <label htmlFor="weekly" className="flex-1 flex justify-between items-center">
              <h2 className="font-medium">Weekly</h2>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="yearly"
              name="paymentOption"
              value="yearly"
              checked={selectedOption === "yearly"}
               className="cursor-pointer"
              onChange={handleOptionChange}
            />
            <label htmlFor="yearly" className="flex-1 flex justify-between items-center">
              <h2 className="font-medium">Yearly</h2>
            </label>
          </div>
        </div>
      </section>
      <Primary onClick={confirmTransaction} className="mt-[3em] w-full bg-text2 py-3 text-white">
        Continue
      </Primary>
    </main>
  );
};

export default ContributionPlan;
