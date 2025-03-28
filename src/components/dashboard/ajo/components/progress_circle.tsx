import React from "react";

interface ProgressCircleProps {
  progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const radius = 40;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-[41px] w-[41px] lg:h-[52px] lg:w-[52px]">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          className="text-[#E3D9EC]"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Progress Circle */}
        <circle
          className="text-[#440080] transition-all duration-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)" // Start from top
        />
      </svg>
      {/* Progress Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold text-[#440080]">
          {progress}%
        </span>
        <span className="text-[6px] text-gray-500 lg:text-[8px]">
          Completed
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;
