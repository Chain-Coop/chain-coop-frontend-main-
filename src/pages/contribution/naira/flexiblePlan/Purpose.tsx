import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { SavingOn } from "../../../../data/Data";
import prevFormIcon from "../../../../Assets/svg/dashboard/ajo/prev_form.svg";

const Purpose = () => {
  const [savingsCategory, setSavingsCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currency, savingsType, contributionType } = location.state || {};
  const [error, setError] = useState("");

  const handleNext = () => {
    if (savingsCategory === "Others" && !otherCategory) {
      setError("Please enter a custom savings category");
    } else if (!savingsCategory) {
      setError("Please select a savings category");
    } else {
      setError("");
      const finalCategory =
        savingsCategory === "Others" ? otherCategory : savingsCategory;
      navigate("/dashboard/contribution/plan", {
        state: {
          purpose: finalCategory,
          currency,
          savingsType,
          contributionType,
        },
      });
    }
  };

  const handleCategorySelect = (category: any) => {
    setSavingsCategory(category);
    if (category !== "Others") {
      setOtherCategory("");
    }
  };

  return (
    <main className="pb-[1.5em] ">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Flexible Savings
      </DashboardHeader>
      <div>
        <header className="mt-[1.5em] flex flex-col gap-2 lg:mt-[3em]">
          <h1 className="text-2xl font-bold">Flexible Savings</h1>
          <p>You can save and withdraw anytime you want.</p>
        </header>

        {SavingOn?.map((purpose, index) => (
          <div
            key={index}
            className={`mt-8 flex w-full items-center justify-between rounded-lg px-4 py-[9px] 
              transition-all duration-300 ease-in-out
              ${hoveredCategory === index ? "scale-[1.02] transform bg-[#DED3EA] shadow-lg" : "bg-[#ECE6F2]"}
              cursor-pointer`}
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => handleCategorySelect(purpose.text)}
          >
            <h3 className="font-semibold">{purpose.text}</h3>
            <button
              className={`rounded-md border px-6 py-1 font-medium transition-all duration-300 ease-in-out
                ${
                  savingsCategory === purpose.text
                    ? "bg-text2 text-white hover:bg-opacity-90"
                    : "border-text2 bg-white hover:bg-text2 hover:text-white"
                }
                transform ${hoveredCategory === index ? "scale-105" : "scale-100"}
              `}
            >
              Select
            </button>
          </div>
        ))}

        <div
          className={`mt-8 flex w-full items-center justify-between rounded-lg px-4 py-[9px]
            transition-all duration-300 ease-in-out
            ${hoveredCategory === -1 ? "scale-[1.02] transform bg-[#DED3EA] shadow-lg" : "bg-[#ECE6F2]"}
            cursor-pointer`}
          onMouseEnter={() => setHoveredCategory(-1)}
          onMouseLeave={() => setHoveredCategory(null)}
          onClick={() => handleCategorySelect("Others")}
        >
          <h3 className="font-semibold">Others</h3>
          <button
            className={`rounded-md border px-6 py-1 font-medium transition-all duration-300 ease-in-out
              ${
                savingsCategory === "Others"
                  ? "bg-text2 text-white hover:bg-opacity-90"
                  : "border-text2 bg-white hover:bg-text2 hover:text-white"
              }
              transform ${hoveredCategory === -1 ? "scale-105" : "scale-100"}
            `}
          >
            Select
          </button>
        </div>

        {savingsCategory === "Others" && (
          <div className="mt-[2em]">
            <input
              type="text"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              placeholder="Enter savings name"
              className="input mb-5 h-[4em] w-full rounded-lg border-[1px] px-4 text-sm 
                shadow-md transition-all duration-300 ease-in-out
                hover:shadow-lg focus:border-text2 focus:shadow-lg
                focus:outline-none focus:ring-text2"
            />
          </div>
        )}

        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-[3em] flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-transform duration-300 hover:scale-110"
          >
            <img src={prevFormIcon} alt="Previous form" className="w-[40px]" />
          </button>
          <button
            className="rounded-md bg-text2 px-8 py-2 font-semibold text-white
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
              active:scale-95 active:transform"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default Purpose;
