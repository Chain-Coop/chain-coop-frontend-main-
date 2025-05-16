import React from "react";
import { Typography } from "@material-tailwind/react";
import ToggleButton from "../../../../shared/utils/ToggleButton";

interface BalanceDisplayProps {
  title: string;
  balance: number | undefined;
  isLoading: boolean;
  isVisible: boolean;
  onToggle: (newVisibility: boolean) => void;
  formatCurrency: (amount: number | undefined) => string;
  className?: string;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  title,
  balance,
  isLoading,
  isVisible,
  onToggle,
  formatCurrency,
  className = "",
}) => {
  return (
    <div className={`mx-auto w-[15em]  rounded-md ${className}`}>
      <div className="flex items-center justify-center gap-4">
        <Typography
          variant="small"
          className="text-sm font-medium tracking-tight md:text-base"
        >
          {title}
        </Typography>
        <ToggleButton isVisible={isVisible} onToggle={onToggle} />
      </div>
      <div className="mt-[1.5em]">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="mx-auto h-6 w-32 rounded bg-gray-200"></div>
            <hr className="mt-4 h-px rounded-md bg-gray-200" />
          </div>
        ) : isVisible ? (
          <Typography className="text-xl font-bold lg:text-xl">
            {formatCurrency(balance ?? 0)}
          </Typography>
        ) : (
          <Typography className="text-2xl font-bold">*********</Typography>
        )}
        {!isLoading && (
          <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
        )}
      </div>
    </div>
  );
};

export default BalanceDisplay;
