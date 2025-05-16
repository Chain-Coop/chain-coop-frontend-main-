import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { LuArrowDownRight } from "react-icons/lu";
import { GrFormNext } from "react-icons/gr";
import ProgressCircle from "../components/progress_circle";
import { BsPatchCheck } from "react-icons/bs";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import defaultPageImage from "../../../Assets/png/dashboard/ajo/sample_savings_image.png";
import defaultPageIcon from "../../../Assets/svg/dashboard/ajo/details_icon.svg";
import currency_icon from "../../../Assets/svg/dashboard/ajo/currency_icon.svg";
import { IoIosArrowBack } from "react-icons/io";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { membersBriefData } from "../../../data/Data";
import Members_Template from "./member_template";
import { useState, useEffect } from "react";
import FundModal from "./fund_modal";
import { GroupCardProps } from "../components/group_card";

const SavingsDetail = () => {
  const { name: nameFromParams } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const cardData = location.state as GroupCardProps | undefined;

  const displayName = cardData?.name || nameFromParams || "Savings Details";
  const displayImage = cardData?.image || defaultPageImage;
  const displayIcon = cardData?.icon || defaultPageIcon;
  const displayMembersCount = cardData?.members ?? membersBriefData.length;
  const contributionAmount = cardData?.amount || "N/A";
  const groupGoal = cardData?.goal || "N/A";
  const totalSavedByGroup = cardData?.balance || "0.00";
  const currentProgress = cardData?.progress ?? 0;

  const firstSavingsData = [
    {
      key: "Daily Deposit",
      value: contributionAmount,
      addition: contributionAmount !== "N/A" ? "(from group)" : "(optional)",
    },
    {
      key: "Start Date",
      value: "(27/03/2025)",
      addition: "",
    },
    {
      key: "End Date",
      value: "Ends in 30 days",
      addition: "(27/04/2025)",
    },
    {
      key: "Daily Duration",
      value: "Everyday",
      addition: "",
    },
  ];

  const lastSavingsData = [
    {
      key: "Contribution Schedule",
      value: "Daily",
    },
    {
      key: "Currency/Token",
      value: "USD",
      image: currency_icon,
    },
  ];


  const [isFundModalOpen, setIsFundModalOpen] = useState<boolean>(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const mySavingsAmount = "$200";
  const mySavingsProgress = 50;

  return (
    <main className="mb-[20px] flex  flex-col  font-asap">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">{displayName}</div>
        </div>
      </DashboardHeader>

      <section className="mb-[20px] flex  flex-col">
        {/* SAVINGS INTRO AND HEADER */}
        <section className="mt-[10px] flex justify-between gap-2 bg-[#ECE6F240] py-4">
          <img
            src={displayImage}
            alt={displayName}
            className="hidden w-[160px] flex-shrink-0 rounded-lg sm:block"
          />
          <div className="flex w-[100%] flex-col gap-2 text-[#1E1E1EB2]">
            <div className="flex w-[100%] items-center justify-between sm:items-start">
              <img
                src={displayImage}
                alt={displayName}
                className="h-[50px] w-[70px] rounded-lg sm:hidden sm:flex-shrink-0"
              />
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-[22px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[24px]">
                  {displayName}
                </h2>
                <Link
                  to={`/leadership-board/${displayName}`}
                  className="flex items-center sm:gap-1"
                >
                  <img
                    src={displayIcon}
                    alt="leadership board"
                    className="hidden h-[14px] w-[14px] sm:block"
                  />
                  <Typography className="font-asap text-[12px] font-[600] text-[#565454]">
                    View leadership board
                  </Typography>
                  <GrFormNext className="text-[16px] text-[#440080]" />
                </Link>
              </div>
              <ProgressCircle progress={currentProgress} /> 
            </div>
            <Typography className="font-asap text-[16px] font-[400] leading-tight tracking-wide">
              This is a group savings plan for {displayName}. Our goal is {groupGoal}.
              Join us and contribute {contributionAmount}!
            </Typography>
          </div>
        </section>

        <section className="flex w-[100%] flex-col items-center justify-center bg-[#FFF7FC] p-4">
          <Typography className="font-asap text-[14px] font-[400] leading-tight tracking-wide opacity-60">
            My savings
          </Typography>
          <h2 className="text-[34px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[36px]">
            {mySavingsAmount}
          </h2>
          <div className="my-4 flex w-[100%] items-center justify-center gap-1 border-y border-[#C4C0C080] py-2">
            <Typography className="font-asap text-[14px] font-[400] leading-tight tracking-wide text-[#302B2B]">
              Savings progress
            </Typography>
            {mySavingsProgress > 0 ? (
              <FiArrowUpRight className="text-[14px] text-[#2EC046]" />
            ) : (
              <LuArrowDownRight className="text-[14px] text-red-500" />
            )}
            <Typography
              className={`font-asap text-[14px] font-[700] leading-tight tracking-wide text-[#302B2B] ${mySavingsProgress > 0 ? "text-[#2EC046]" : "text-red-500"}`}
            >
              {mySavingsProgress}% 
            </Typography>
          </div>
          <Typography className="font-asap text-[14px] font-[400] leading-tight tracking-wide opacity-60">
            Total saved by group
          </Typography>
          <h2 className="text-[34px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[36px]">
            ${totalSavedByGroup}
          </h2>
          {/* ... Buttons ... */}
          <div className="mt-8 flex w-[100%] flex-wrap items-center justify-between gap-y-4">
            <Button
              onClick={() => setIsFundModalOpen(true)}
              className="flex h-[45px] w-[100%] items-center justify-center self-start rounded-md border-2 border-[#3D0073] bg-[#440080] px-6 font-asap text-[16px] font-medium normal-case text-white hover:bg-white hover:text-[#3D0073] sm:w-[190px] lg:text-[18px]"
            >
              Fund
            </Button>
            <Button className="flex h-[45px] w-[100%] items-center justify-center self-start rounded-md border-2 border-[#3D0073] bg-white px-6 font-asap text-[16px] font-medium normal-case text-black hover:bg-[#3D0073] hover:text-white sm:w-[190px] lg:text-[18px]">
              Withdraw
            </Button>
          </div>
        </section>

        <ul className="mt-[20px] flex w-[100%] flex-col">
          {firstSavingsData.map((data, index) => (
            <li
              className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10"
              key={index}
            >
              <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
                {data.key}
              </Typography>
              <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
                <span className="text-black">{data.value}</span> {data.addition}
              </Typography>
            </li>
          ))}

          {lastSavingsData.map((data) => (
            <li
              className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10"
              key={data.key}
            >
              <Typography className="font-asap text-[16px] font-[500] text-[#939090] lg:text-[18px]">
                {data.key}
              </Typography>
              <div className="flex w-fit items-center justify-between gap-1 rounded-lg border-2 border-[#440080] bg-[#ECE6F2] p-2 pr-3"> {/* Adjusted width to fit content */}
                {data.image && (
                  <img
                    src={data.image}
                    alt={data.key}
                    className="h-[24px] w-[24px]"
                  />
                )}
                <Typography className="font-asap text-[14px] font-[500] text-[#302B2B] lg:text-[16px]">
                  {data.value}
                </Typography>
                <BsPatchCheck className="ml-2 text-[24px] text-[#440080]" />
              </div>
            </li>
          ))}
          {/* ... other list items ... */}
           <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="font-asap text-[16px] font-[500] text-[#939090] lg:text-[18px]">
              Withdrawal Day
            </Typography>
            <Typography className="font-asap text-[16px] font-[500] text-black lg:text-[18px]">
              28/04/2025 {/* Placeholder */}
            </Typography>
          </li>
        </ul>

        {/* TRANSACTION BOX */}
        <Link
          to={`/dashboard/ajo/${displayName}/transactions`}
          className="mt-6 flex w-[100%] items-center justify-between rounded-md border border-[#DDD8D84D] bg-[#ECE6F25E] px-3 py-6"
        >
          {/* ... */}
          <div className="flex w-[80%] flex-col  gap-4">
            <h3 className="text-[18px] font-[500] tracking-tight text-[#1E1E1E]">
              Transaction history
            </h3>
            <Typography className="font-asap text-[14px] font-[400] text-[#1E1E1E] opacity-80">
              See all withdrawing and funding on this group
            </Typography>
          </div>
          <button>
            <FaChevronRight className="text-[16px] text-[#1E1E1E]" />
          </button>
        </Link>

        {/* MEMBERS LIST */}
        <section className="mt-8 flex flex-col gap-3">
          <div className="flex items-center justify-between border-b-2 border-b-[#DDD8D880] pb-2">
            <h3 className="text-[18px] font-[600] tracking-tight text-[#1E1E1E]">
              Members ({displayMembersCount})
            </h3>
            {/* ... Invite users link ... */}
            <Link
              to={`/dashboard/ajo/${displayName}/members-invite`}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ECE6F25E]">
                <FaPlus className="-translate-y-[1px] translate-x-[2px] text-[8px] text-[#3D0073]" />
                <MdOutlinePeopleOutline className="-translate-x-[2px] text-[20px] text-[#3D0073]" />
              </div>
              <Typography className="font-asap text-[16px] font-[500] text-[#1E1E1E]">
                Invite users
              </Typography>
            </Link>
          </div>
          <ul className="mt-[10px] flex flex-col gap-4">
            {membersBriefData.slice(0, Math.min(3, displayMembersCount)).map((data, index) => (
              <Members_Template
                amount={data.amount}
                index={index}
                name={data.name}
                userType={data.userType}
                key={`${index}-${data.name}`}
                progress={data.progress}
              />
            ))}
          </ul>
        </section>
        <Link
          to={`/dashboard/ajo/${displayName}/members`}
          className="mt-8 flex h-[45px] w-[200px] items-center justify-center self-center rounded-md border-2 border-[#440080] bg-white text-center font-asap text-[16px] font-[600] text-[#440080]"
        >
          See all members
        </Link>
      </section>
      <FundModal isOpen={isFundModalOpen} setIsOpen={setIsFundModalOpen} />
    </main>
  );
};

export default SavingsDetail;