import React from "react";
import { Link } from "react-router-dom";
import ProgressCircle from "./progress_circle";

export interface GroupCardProps {
  name: string;
  image: string;
  icon: string;
  members: number;
  amount: string;
  goal: string;
  totalSaved: string;
  progress: number;
}

const GroupCard: React.FC<GroupCardProps> = ({
  amount,
  goal,
  icon,
  image,
  members,
  name,
  progress,
  totalSaved,
}) => {
  return (
    <section className="flex items-center justify-center">
      <div className="flex w-[95%] flex-shrink-0 flex-col rounded-xl shadow-md shadow-[#3D007347] sm:h-[234px] sm:w-[440px] md:flex-row md:gap-2">
        {/* Image Section */}
        <div>
          <div className="relative h-[153px] w-full flex-shrink-0 rounded-l-xl md:h-full md:w-[158px]">
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-t-xl lg:rounded-l-xl"
            />
            <img
              src={icon}
              alt={name}
              className="absolute left-2 top-2 h-[30px] w-[30px] lg:right-2"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex w-[100%] flex-col justify-between gap-1 px-2 py-2 lg:w-[96%] lg:pl-4 lg:pr-2">
          <div className="flex items-start justify-between gap-5 lg:gap-0">
            {/* Group Details */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[22px] font-semibold text-[#1E1E1EE5] lg:text-[24px]">
                {name}
              </h4>
              <div className="flex items-center gap-2">
                <p className="text-[16px] font-semibold text-[#6E6C6C] lg:text-[18px]">
                  {members} members
                </p>
                <p className="text-[16px] font-normal text-[#6E6C6C] lg:text-[18px]">
                  {amount}
                </p>
              </div>
              <p className="text-[16px] font-normal text-[#6E6C6C] lg:text-[18px]">
                <strong className="font-semibold text-black">Goal:</strong>{" "}
                {goal}
              </p>
              <p className="text-[16px] font-medium text-[#6E6C6C] lg:text-[18px]">
                Total saved: {totalSaved}
              </p>
            </div>

            {/* Progress Circle Component */}
            <ProgressCircle progress={progress} />
          </div>

          {/* Buttons */}
          <div className="flex w-full justify-between py-5 lg:py-0">
            <button className="flex h-[35px] w-[45%] items-center justify-center rounded-md bg-[#440080] text-[16px] font-medium text-white hover:bg-[#3D0073] lg:text-[18px]">
              Join
            </button>
            <Link
              to={`/dashboard/ajo/${name}`}
              className="flex h-[35px] w-[45%] items-center justify-center rounded-md bg-white text-[16px] text-[#440080] ring-1 ring-[#440080] lg:text-[18px]"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupCard;
