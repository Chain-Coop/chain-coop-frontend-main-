import React from "react";
import { Link } from "react-router-dom";
import ProgressCircle from "./progress_circle";

// Define a more specific type for circle data
export interface CircleData {
  description?: string;
  groupType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  currentIndividualTotal?: number;
  currency?: string;
  depositAmount?: number;
  goalAmount?: number;
  nextContributionDate?: string;
}

export interface GroupCardProps {
  // Required props
  name: string;
  image: string;
  icon: string;
  members: number;
  amount: string;
  goal: string;
  balance: string;
  progress: number;

  // Optional props
  buttonText?: string;
  onClick?: () => void;
  circleData?: CircleData;
  isPublicGroup?: boolean;

  // Customization props
  className?: string;
  imageClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  textClassName?: string;
  primaryButtonClassName?: string;
  secondaryButtonClassName?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  customLinkPath?: (name: string) => string;
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
  circleData,
  isPublicGroup,
  className = "",
  imageClassName = "",
  iconClassName = "",
  titleClassName = "",
  textClassName = "",
  primaryButtonClassName = "",
  secondaryButtonClassName = "",
  primaryButtonText = "Withdraw",
  secondaryButtonText = "Details",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  customLinkPath,
}) => {
  const defaultLinkPath = isPublicGroup
    ? `/dashboard/ajo/other/${name}`
    : `/dashboard/ajo/${name}`;

  const linkPath = customLinkPath ? customLinkPath(name) : defaultLinkPath;

  return (
    <div
      className={`flex h-fit w-full flex-shrink-0 flex-col rounded-3xl border-[2px] border-gray-200 bg-white shadow-md sm:h-[234px] sm:flex-row lg:h-fit lg:flex-col xl:h-fit xl:flex-row xl:gap-1 xl:w-full ${className}`}
    >
      <div
        className={`relative h-[150px] w-[100%] flex-shrink-0 rounded-l-xl sm:h-full sm:w-[158px] lg:h-fit lg:w-[100%] xl:h-full xl:w-[158px] ${imageClassName}`}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full flex-shrink-0 rounded-none rounded-t-xl object-cover sm:rounded-none sm:rounded-l-xl sm:object-none lg:h-[150px] lg:w-[100%] lg:rounded-none lg:rounded-t-xl lg:object-cover xl:h-full xl:rounded-none xl:rounded-l-xl"
        />
        <img
          src={icon}
          alt={name}
          className={`absolute right-2 top-2 h-[30px] w-[30px] ${iconClassName}`}
        />
      </div>

      <div className="flex w-[96%] flex-col justify-between gap-1 py-2 pl-4 pr-2 lg:py-4 xl:py-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <h4
              className={`text-wrap text-lg font-semibold text-[#1E1E1EE5] xl:text-xl ${titleClassName}`}
            >
              {name}
            </h4>
            <div className="flex items-center gap-2">
              <span
                className={`font-asap text-[14px] font-semibold text-[#6E6C6C] ${textClassName}`}
              >
                {members} members
              </span>
              <div className="h-[10px] w-[10px] rounded-full bg-[#C5B0D8]" />
              <span
                className={`font-asap text-[14px] font-normal text-[#6E6C6C] ${textClassName}`}
              >
                {amount}
              </span>
            </div>
            <span
              className={`font-asap font-normal text-[#6E6C6C] ${textClassName}`}
            >
              <strong className="font-semibold text-black">Goal:</strong> {goal}
            </span>
            <span
              className={`font-asap font-medium text-[#6E6C6C] ${textClassName}`}
            >
              Total saved: {balance}
            </span>
          </div>
          <ProgressCircle progress={progress} />
        </div>

        <div className="mt-3 flex w-full justify-between pb-3 xl:mt-0">
          {!isPublicGroup && (
            <button
              className={`mr-auto flex h-[35px] w-fit items-center justify-center rounded-md bg-[#440080] px-4 text-sm font-medium capitalize text-white hover:bg-[#3D0073] lg:text-base ${primaryButtonClassName}`}
              onClick={onPrimaryButtonClick || onClick}
            >
              {primaryButtonText || buttonText}
            </button>
          )}
          <Link
            to={linkPath}
            state={{
              name,
              image,
              icon,
              members,
              amount,
              goal,
              balance,
              progress,
              description: circleData?.description,
              groupType: circleData?.groupType,
              status: circleData?.status,
              startDate: circleData?.startDate,
              endDate: circleData?.endDate,
              currentIndividualTotal: circleData?.currentIndividualTotal,
              currency: circleData?.currency,
              depositAmount: circleData?.depositAmount,
              goalAmount: circleData?.goalAmount,
              nextContributionDate: circleData?.nextContributionDate,
              isPublicGroup: isPublicGroup || false,
              circleData,
            }}
            className={`flex h-[35px] w-fit items-center justify-center rounded-md bg-white px-4 text-sm text-[#440080] ring-1 ring-[#440080] lg:text-base ${secondaryButtonClassName}`}
            onClick={onSecondaryButtonClick}
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
