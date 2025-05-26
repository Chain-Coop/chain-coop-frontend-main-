import React from "react";

interface ProgressCircleProps {
  progress: number;
  className?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  className = "",
}) => {
  const radius = 32;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const offset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div
      className={`relative ${className}`}
      role="progressbar"
      aria-valuenow={normalizedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${normalizedProgress}%`}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        style={{
          minWidth: radius * 2 + strokeWidth,
          minHeight: radius * 2 + strokeWidth,
        }}
      >
        {/* Background Circle */}
        <circle
          strokeWidth={strokeWidth}
          stroke="#E3D9EC"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Progress Circle */}
        <circle
          className="transition-all duration-300"
          strokeWidth={strokeWidth}
          stroke="#440080"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      {/* Progress Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] text-[#440080]">
          {normalizedProgress}%
        </span>
        <span className="text-[5px] text-[#6B7280]">Completed</span>
      </div>
    </div>
  );
};

export default ProgressCircle;
