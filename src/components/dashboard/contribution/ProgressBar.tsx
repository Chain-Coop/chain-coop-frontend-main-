import React from "react";

interface FundProgressBarProps {
  step: 1 | 2 | 3 | 4;
}

const steps = [
  { label: "Enter Details" },
  { label: "Date" },
  { label: "Funding" },
  { label: "Preview" },
];

const FundProgressBar: React.FC<FundProgressBarProps> = ({ step }) => (
  <div className="my-8 flex flex-col items-center">
    <div className="flex w-full max-w-md items-center justify-between">
      {steps.map((s, idx) => (
        <React.Fragment key={s.label}>
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2
                ${step > idx ? "border-text2 bg-text2 text-white" : "border-gray-300 bg-white text-gray-400"}
                font-bold transition-all`}
            >
              {idx + 1}
            </div>
            <span
              className={`mt-2 text-xs ${step > idx ? "font-semibold text-text2" : "text-gray-400"}`}
            >
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`h-1 w-10 rounded transition-all md:w-20
                ${step > idx + 1 ? "bg-text2" : "bg-gray-300"}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default FundProgressBar;
