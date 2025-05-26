import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { LuArrowDownRight } from "react-icons/lu";
import { GrFormNext } from "react-icons/gr";
import ProgressCircle from "../components/progress_circle";
import { BsPatchCheck } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { membersBriefData } from "../../../data/Data";
import Members_Template from "./member_template";
import { useState, useEffect } from "react";
import FundModal from "./fund_modal";
import { GroupCardProps } from "../components/group_card";

import defaultPageImage from "../../../Assets/png/dashboard/ajo/sample_savings_image.png";
import defaultPageIcon from "../../../Assets/svg/dashboard/ajo/details_icon.svg";
import bitcoin_icon from "../../../Assets/svg/dashboard/bitcoin.svg";

// Types
interface SavingsDetailProps {
  className?: string;
}

interface SavingsData {
  _id: string;
  name: string;
  image?: string;
  icon?: string;
  members?: Array<{
    userId: string;
    progress: number;
    contribution: number;
    status: string;
    failures: number;
    _id: string;
    name: string;
    role: string;
    joined: string;
  }>;
  amount?: string | number;
  depositAmount?: string | number;
  goal?: string | number;
  goalAmount?: string | number;
  balance?: string | number;
  progress?: number;
  description?: string;
  groupType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  currency?: string;
  nextContributionDate?: string;
  createdBy?: string;
}

const DEFAULT_MEMBER = {
  userId: "",
  progress: 0,
  contribution: 0,
  status: "",
  failures: 0,
  _id: "",
  name: "",
  role: "Member",
  joined: new Date().toISOString(),
};

const SavingsDetail: React.FC<SavingsDetailProps> = ({ className = "" }) => {
  const { name: nameFromParams } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { circleData?: SavingsData } | SavingsData;
  const group =
    "circleData" in state ? state.circleData! : (state as SavingsData);

  // Derived state
  const displayName = group.name || nameFromParams || "Savings Details";
  const displayImage = group.image || defaultPageImage;
  const displayIcon = group.icon || defaultPageIcon;
  const displayMembersCount = Array.isArray(group.members)
    ? group.members.length
    : 0;
  const contributionAmount = group.amount || group.depositAmount || "N/A";
  const groupGoal = group.goal || group.goalAmount || "N/A";
  const totalSavedByGroup = group.balance || "0.00";
  const currentProgress = group.progress ?? 0;
  const description = group.description || "";
  const groupType = group.groupType || "";
  const status = group.status || "";
  const startDate = group.startDate || "";
  const endDate = group.endDate || "";
  const currency = group.currency || "BTC";
  const nextContributionDate = group.nextContributionDate || "";
  const progress = group.progress || 0;
  const createdBy = group.createdBy;
  const members =
    Array.isArray(group.members) && group.members.length > 0
      ? group.members
      : [DEFAULT_MEMBER];

  const [isFundModalOpen, setIsFundModalOpen] = useState<boolean>(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  // Helper functions
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `(${date.toLocaleDateString("en-GB")})`;
  };

  const getDaysLeft = (endDate: string): number => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysLeft = getDaysLeft(endDate);
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <main className={`mb-[20px] flex flex-col font-asap ${className}`}>
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">{displayName}</div>
        </div>
      </DashboardHeader>

      <section className="mb-[20px] flex flex-col">
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
                  <span className="font-asap text-[12px] font-[600] text-[#565454]">
                    View leadership board
                  </span>
                  <GrFormNext className="text-[16px] text-[#440080]" />
                </Link>
              </div>
              <div className="w-[60px] sm:w-[80px]">
                <ProgressCircle progress={currentProgress} />
              </div>
            </div>
            <p className="font-asap text-[16px] font-[400] leading-tight tracking-wide">
              {description}
            </p>
          </div>
        </section>

        <section className="flex w-[100%] flex-col items-center justify-center bg-[#FFF7FC] p-4">
          <span className="font-asap text-[14px] font-[400] leading-tight tracking-wide opacity-60">
            My savings
          </span>
          <h2 className="text-[34px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[36px]">
            {totalSavedByGroup}
          </h2>
          <div className="my-4 flex w-[100%] items-center justify-center gap-1 border-y border-[#C4C0C080] py-2">
            <span className="font-asap text-[14px] font-[400] leading-tight tracking-wide text-[#302B2B]">
              Savings progress
            </span>
            {progress ? (
              <FiArrowUpRight className="text-[14px] text-[#2EC046]" />
            ) : (
              <LuArrowDownRight className="text-[14px] text-red-500" />
            )}
            <span
              className={`font-asap text-[14px] font-[700] leading-tight tracking-wide text-[#302B2B] ${progress > 0 ? "text-[#2EC046]" : "text-red-500"}`}
            >
              {progress}%
            </span>
          </div>
          <span className="font-asap text-[14px] font-[400] leading-tight tracking-wide opacity-60">
            Total saved by group
          </span>
          <h2 className="text-[34px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[36px]">
            {totalSavedByGroup}
          </h2>

          {/* Action Buttons */}
          <div className="mt-8 flex w-[100%] flex-wrap items-center justify-between gap-y-4">
            <button
              onClick={() => setIsFundModalOpen(true)}
              className="flex h-[45px] w-[100%] items-center justify-center self-start rounded-md border-2 border-[#3D0073] bg-[#440080] px-6 font-asap text-[16px] font-medium normal-case text-white hover:bg-white hover:text-[#3D0073] sm:w-[190px] lg:text-[18px]"
            >
              Fund
            </button>
            <button className="flex h-[45px] w-[100%] items-center justify-center self-start rounded-md border-2 border-[#3D0073] bg-white px-6 font-asap text-[16px] font-medium normal-case text-black hover:bg-[#3D0073] hover:text-white sm:w-[190px] lg:text-[18px]">
              Withdraw
            </button>
          </div>
        </section>

        <ul className="mt-[20px] flex w-[100%] flex-col">
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <span className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Daily Deposit
            </span>
            <span className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              {contributionAmount}{" "}
              <span className="text-[#939090]">(from group)</span>
            </span>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <span className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Start Date
            </span>
            <span className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              {formattedStartDate}
            </span>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <span className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              End Date
            </span>
            <span className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              Ends in {daysLeft} days {formattedEndDate}
            </span>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <span className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Daily Duration
            </span>
            <span className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              Everyday
            </span>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <span className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Contribution Schedule
            </span>
            <span className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              Daily
            </span>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <span className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Currency/Token
            </span>
            <div className="flex items-center gap-2 rounded-lg border-2 border-[#440080] bg-[#ECE6F2] px-4 py-1">
              <img
                src={bitcoin_icon}
                alt="bitcoin"
                className="h-[20px] w-[20px]"
              />
              <span className="font-asap text-[14px] font-[500] text-[#302B2B] lg:text-[16px]">
                {currency}
              </span>
              <BsPatchCheck className="ml-2 text-[24px] text-[#440080]" />
            </div>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <span className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Withdrawal Day
            </span>
            <span className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              {formattedEndDate}
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-[20px] flex w-[100%] flex-col">
        <div className="flex w-[100%] items-center justify-between">
          <div className="flex items-center gap-2">
            <MdOutlinePeopleOutline className="text-[24px] text-[#440080]" />
            <span className="font-asap text-[18px] font-[600] tracking-tight text-[#1E1E1E]">
              Members
            </span>
          </div>
          <button className="flex items-center gap-2 rounded-md border-2 border-[#3D0073] bg-white px-4 py-2 font-asap text-[14px] font-medium normal-case text-black hover:bg-[#3D0073] hover:text-white">
            <FaPlus className="text-[14px]" />
            Add Member
          </button>
        </div>

        <div className="mt-4 flex w-[100%] flex-col gap-4">
          {members.map((member, index) => (
            <div
              key={member._id || index}
              className="flex w-[100%] items-center justify-between rounded-lg border border-[#DDD8D887] p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ECE6F2]">
                  <span className="font-asap text-[16px] font-[600] text-[#440080]">
                    {member.name ? member.name.charAt(0).toUpperCase() : "?"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-asap text-[16px] font-[500] text-[#1E1E1E]">
                    {member.name || "Unknown Member"}
                  </span>
                  <span className="font-asap text-[14px] font-[400] text-[#939090]">
                    {member.role || "Member"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="font-asap text-[14px] font-[500] text-[#1E1E1E]">
                    {member.contribution} {currency}
                  </span>
                  <span className="font-asap text-[12px] font-[400] text-[#939090]">
                    Joined {new Date(member.joined).toLocaleDateString()}
                  </span>
                </div>
                <button className="text-[#FF0000] hover:text-[#CC0000]">
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FundModal
        isOpen={isFundModalOpen}
        setIsOpen={setIsFundModalOpen}
        circleId={group._id}
        depositAmount={Number(contributionAmount)}
        circleName={displayName}
      />
    </main>
  );
};

export default SavingsDetail;
