import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { Alert } from "@mui/material";
import { DashboardHeader } from "../../../../../common/DashboardHeader";
import { Plan } from "../../../../../../data/Data";

const SavingsPlan = () => {
  const [contributionPlan, setContributionPlan] = useState("");
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { purpose, currency, savingsType, contributionType } =
    location.state || {};
  const [error, setError] = useState("");

  const handleNext = () => {
    if (contributionPlan) {
      setError("");
      navigate("/dashboard/contribution/amount", {
        state: { purpose, plan: contributionPlan, currency, savingsType,contributionType  },
      });
    } else {
      setError("Please select a contribution plan");
    }
  };

  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Flexible Savings
      </DashboardHeader>
      <div className="m-auto w-[90%] max-w-[1200px]">
        <header className="mt-[1.5em] flex flex-col justify-center gap-2 text-center lg:mt-[3em]">
          <h1 className="text-center text-xl font-bold sm:text-2xl">
            Savings Duration
          </h1>
          <p className="text-sm sm:text-base">
            Save your money for a fixed period of time and your savings will be
            locked. Then our team will unlock your savings for withdrawal until
            after 6 months of contribution.
          </p>
        </header>

        <div className="mt-8 space-y-4">
          {Plan.map((plan: any, index: number) => (
            <div
              key={index}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-[9px] 
                transition-all duration-300 ease-in-out
                ${
                  hoveredPlan === index
                    ? "scale-[1.02] transform bg-[#DED3EA] shadow-lg"
                    : "bg-[#ECE6F2]"
                }
                cursor-pointer`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              onClick={() => setContributionPlan(plan.text)}
            >
              <div className="flex flex-col">
                <h3
                  className={`${
                    hoveredPlan === index ? "scale-105" : "scale-100"
                  } transform text-sm font-semibold transition-all duration-300 ease-in-out sm:text-base`}
                >
                  {plan.text}
                </h3>
                {hoveredPlan === index && (
                  <p className="animate-fade-in mt-1 text-xs text-gray-600 sm:text-sm">
                    Click to select this saving plan
                  </p>
                )}
              </div>
              <button
                className={`rounded-md border px-4 py-1 text-sm font-medium transition-all duration-300 ease-in-out sm:px-6 sm:text-base
                  ${
                    contributionPlan === plan.text
                      ? "bg-text2 text-white hover:bg-opacity-90"
                      : "border-text2 bg-white hover:bg-text2 hover:text-white"
                  }
                  transform ${hoveredPlan === index ? "scale-105" : "scale-100"}
                  ${hoveredPlan === index ? "shadow-md" : ""}
                `}
              >
                Select
              </button>
            </div>
          ))}
        </div>

        {error && (
          <Alert
            severity="error"
            className="mb-4 mt-4 transition-all duration-300 ease-in-out"
          >
            {error}
          </Alert>
        )}

        <div className="mt-[3em] flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-all duration-300 ease-in-out
              hover:scale-110 hover:text-text2"
          >
            <IoIosArrowDropleft size={25} />
          </button>
          <button
            className="rounded-md bg-text2 px-6 py-2 text-sm font-semibold text-white
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
              active:scale-95 active:transform
              disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:text-base"
            onClick={handleNext}
            disabled={!contributionPlan}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default SavingsPlan;
