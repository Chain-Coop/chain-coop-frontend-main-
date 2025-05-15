import React from "react";
import { Link } from "react-router-dom";
import ProgressCircle from "./progress_circle";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

export interface GroupCardProps {
  name: string;
  image: string;
  icon: string;
  members: number;
  amount: string;
  goal: string;
  balance: string;
  progress: number;
  buttonText?: string;
  onClick?: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({
  amount,
  goal,
  icon,
  image,
  members,
  name,
  progress,
  balance,
  buttonText,
  onClick,
}) => {
  return (
    <div className="flex h-fit w-full flex-shrink-0 flex-col rounded-3xl border-[2px] border-gray-200 bg-white shadow-md sm:h-[234px] sm:flex-row lg:h-fit lg:flex-col xl:h-fit xl:flex-row xl:gap-1">
      {/* Image Section */}
      <div className="relative h-[150px] w-[100%] flex-shrink-0 rounded-l-xl sm:h-full sm:w-[158px] lg:h-fit lg:w-[100%] xl:h-full xl:w-[158px]">
        <img
          src={image}
          alt={name}
          className="h-full w-full flex-shrink-0 rounded-none rounded-t-xl object-cover sm:rounded-none sm:rounded-l-xl sm:object-none lg:h-[150px] lg:w-[100%] lg:rounded-none lg:rounded-t-xl lg:object-cover xl:h-full xl:rounded-none xl:rounded-l-xl"
        />
        <img
          src={icon}
          alt={name}
          className="absolute right-2 top-2 h-[30px] w-[30px]"
        />
      </div>

      {/* Content Section */}
      <div className="flex w-[96%] flex-col justify-between gap-1 py-2 pl-4 pr-2 lg:py-4 xl:py-2">
        <div className="flex items-start justify-between">
          {/* Group Details */}
          <div className="flex flex-col gap-2">
            <h4 className="text-wrap  text-lg font-semibold text-[#1E1E1EE5] xl:text-xl">
              {name}
            </h4>
            <div className="flex items-center gap-2">
              <Typography className="font-asap text-[14px] font-semibold text-[#6E6C6C]">
                {members} members
              </Typography>
              <div className="h-[10px] w-[10px] rounded-full bg-[#C5B0D8]" />
              <Typography className="font-asap text-[14px] font-normal text-[#6E6C6C]">
                {amount}
              </Typography>
            </div>
            <Typography className="font-asap font-normal text-[#6E6C6C]">
              <strong className="font-semibold text-black">Goal:</strong> {goal}
            </Typography>
            <Typography className="font-asap font-medium text-[#6E6C6C]">
              Total saved: ${balance}
            </Typography>
          </div>

          {/* Progress Circle Component */}
          <ProgressCircle progress={progress} />
        </div>

        {/* Buttons */}
        <div className="mt-3 flex w-full justify-between pb-3 xl:mt-0">
          <Button
            className="flex h-[35px] w-fit items-center justify-center rounded-md bg-[#440080] px-4 text-sm font-medium capitalize text-white hover:bg-[#3D0073] lg:text-base"
            onClick={onClick}
          >
            {buttonText}
          </Button>
          <Link
            to={`/dashboard/ajo/${name}`}
            state={{
              name,
              image,
              icon,
              members,
              amount,
              goal,
              balance,
              progress,
            }}
            className="flex h-[35px] w-fit items-center justify-center rounded-md bg-white px-4 text-sm text-[#440080] ring-1 ring-[#440080] lg:text-base"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
