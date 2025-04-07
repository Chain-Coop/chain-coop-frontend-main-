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
    totalSaved: string;
    progress: number;
    buttonText?: string;
    onClick?: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ amount, goal, icon, image, members, name, progress, totalSaved, buttonText, onClick }) => {
  return (
    <div className="flex w-[100%] sm:flex-row lg:flex-col xl:flex-row flex-col h-fit sm:h-[234px] lg:h-fit xl:h-fit flex-shrink-0 rounded-3xl border-[2px] border-gray-200 bg-white shadow-md">
      {/* Image Section */}
      <div className="w-[100%] sm:w-[158px] h-[150px] lg:w-[100%] xl:w-[158px] sm:h-full lg:h-fit xl:h-full relative rounded-l-xl flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full lg:w-[100%] lg:h-[150px] xl:h-full lg:object-cover rounded-t-xl rounded-none sm:rounded-l-xl sm:rounded-none lg:rounded-t-xl lg:rounded-none xl:rounded-l-xl xl:rounded-none object-cover sm:object-none" />
        <img src={icon} alt={name} className="w-[30px] h-[30px] absolute top-2 right-2" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between gap-1 py-2 pr-2 pl-4 w-[96%] lg:py-4 xl:py-2">
        <div className="flex justify-between items-start">
          {/* Group Details */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[#1E1E1EE5] text-[22px] lg:text-[24px]">{name}</h4>
            <div className="flex gap-2 items-center">
              <Typography className="text-[#6E6C6C] font-semibold text-[14px]">{members} members</Typography>
              <div className="w-[10px] h-[10px] bg-[#C5B0D8] rounded-full" />
              <Typography className="text-[#6E6C6C] font-normal text-[14px]">{amount}</Typography>
            </div>
            <Typography className="text-[#6E6C6C] font-normal text-[16px]">
              <strong className="text-black font-semibold">Goal:</strong> {goal}
            </Typography>
            <Typography className="text-[#6E6C6C] font-medium text-[16px]">
              Total saved: {totalSaved}
            </Typography>
          </div>

          {/* Progress Circle Component */}
          <ProgressCircle progress={progress} />
        </div>

        {/* Buttons */}
        <div className="w-full flex justify-between pb-3 gap-2">
          <Button className="bg-[#440080] text-[16px] lg:text-[18px] font-medium w-fit px-4 h-[35px] rounded-md flex items-center justify-center text-white hover:bg-[#3D0073] capitalize" onClick={onClick}>
            {buttonText}
          </Button>
          <Link 
            to={`/dashboard/ajo/${name}`}
            className="ring-1 ring-[#440080] text-[16px] lg:text-[18px] bg-white text-[#440080] rounded-md w-fit px-4 h-[35px] flex items-center justify-center">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
