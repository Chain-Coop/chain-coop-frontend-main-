import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import ProgressCircle from "../components/progress_circle";
import { Typography } from "@material-tailwind/react";
import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import { BsPatchCheck } from "react-icons/bs";
import { MdOutlinePeopleOutline } from "react-icons/md";
import currency_icon from "../../../Assets/svg/dashboard/ajo/naira_icon.svg";
import Members_Template from "../savings_detail/member_template";
import usFlag from "../../../Assets/svg/dashboard/ajo/naira_icon.svg";
import { toast } from "react-toastify";

interface OtherGroupDetailsState {
  name: string;
  image: string;
  icon: string;
  members: number;
  amount: string;
  goal: string;
  balance: string;
  progress: number;
  description: string;
  groupType: string;
  status: string;
  startDate: string;
  endDate: string;
  currency: string;
  depositAmount: number;
  goalAmount: number;
  nextContributionDate: string | null;
}

const OtherGroupDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as OtherGroupDetailsState & { circleData?: any };


  const handleBackClick = () => {
    navigate(-1);
  };


  const firstSavingsData = [
    {
      key: "Daily Deposit",
      value: state.amount,
      addition: "(from group)",
    },
    {
      key: "Start Date",
      value: state.startDate,
      addition: "",
    },
    {
      key: "End Date",
      value: state.endDate,
      addition: "",
    },
    {
      key: "Next Contribution",
      value: state.nextContributionDate || "Not set",
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
      value: state.currency,
      image: currency_icon,
    },
  ];

  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysLeft = getDaysLeft(state.endDate);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `(${date.toLocaleDateString("en-GB")})`;
  };

  const formattedStartDate = formatDate(state.startDate);
  const formattedEndDate = formatDate(state.endDate);

  const members = state.circleData?.members || [
    {
      userId: "",
      progress: 0,
      contribution: 0,
      status: "",
      failures: 0,
      _id: "",
    },
  ];
  const createdBy = state.circleData?.createdBy;

  return (
    <main className="mb-[20px] flex flex-col font-asap">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">{state.name}</div>
        </div>
      </DashboardHeader>

      <section className="mb-[20px] flex flex-col">
        {/* SAVINGS INTRO AND HEADER */}
        <section className="mt-[10px] flex justify-between gap-2 bg-[#ECE6F240] py-4">
          <img
            src={state.image}
            alt={state.name}
            className="hidden w-[160px] flex-shrink-0 rounded-lg sm:block"
          />
          <div className="flex w-[100%] flex-col gap-2 text-[#1E1E1EB2]">
            <div className="flex w-[100%] items-center justify-between sm:items-start">
              <img
                src={state.image}
                alt={state.name}
                className="h-[50px] w-[70px] rounded-lg sm:hidden sm:flex-shrink-0"
              />
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-[22px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[24px]">
                  {state.name}
                </h2>
                <Link
                  to={`/leadership-board/${state.name}`}
                  className="flex items-center sm:gap-1"
                >
                  <img
                    src={state.icon}
                    alt="leadership board"
                    className="hidden h-[14px] w-[14px] sm:block"
                  />
                  <Typography className="font-asap text-[12px] font-[600] text-[#565454]">
                    View leadership board
                  </Typography>
                  <GrFormNext className="text-[16px] text-[#440080]" />
                </Link>
              </div>
              <ProgressCircle progress={state.progress} />
            </div>
            <Typography className="font-asap text-[16px] font-[400] leading-tight tracking-wide">
              {state.description}
            </Typography>
          </div>
        </section>

        <section className="flex w-[100%] flex-col items-center justify-center bg-[#FFF7FC] p-4">
          <Typography className="font-asap text-[14px] font-[400] leading-tight tracking-wide opacity-60">
            Total saved by group
          </Typography>
          <h2 className="text-[34px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[36px]">
            {state.balance}
          </h2>
        </section>

        <ul className="mt-[20px] flex w-[100%] flex-col">
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Daily Deposit
            </Typography>
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              {state.amount} <span className="text-[#939090]">(optional)</span>
            </Typography>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Start Date
            </Typography>
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              {formattedStartDate}
            </Typography>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              End Date
            </Typography>
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              Ends in {daysLeft} days {formattedEndDate}
            </Typography>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Daily Duration
            </Typography>
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              Everyday
            </Typography>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Saving Frequency
            </Typography>
            <div className="flex w-[100px] items-center gap-2 rounded-lg border-2 border-[#440080] bg-[#ECE6F2] px-4 py-1">
              <Typography className="font-asap text-[14px] font-[500] text-[#302B2B] lg:text-[16px]">
                Daily
              </Typography>
              <BsPatchCheck className="ml-2 text-[24px] text-[#440080]" />
            </div>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Currency/Token
            </Typography>
            <div className="flex w-[100px] items-center gap-2 rounded-lg border-2 border-[#440080] bg-[#ECE6F2] px-4 py-1">
              <img src={usFlag} alt="flag" className="h-[20px] w-[20px]" />
              <Typography className="font-asap text-[14px] font-[500] text-[#302B2B] lg:text-[16px]">
                {state.currency}
              </Typography>
            </div>
          </li>
          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
              Withdrawal Day
            </Typography>
            <Typography className="font-asap text-[16px] font-[500] tracking-tight text-black lg:text-[18px]">
              {formattedEndDate}
            </Typography>
          </li>
        </ul>
      </section>

      {/* MEMBERS SECTION */}
      <section className="mt-[20px] flex w-[100%] flex-col gap-4">
        <div className="flex w-[100%] items-center justify-between">
          <div className="flex items-center gap-2">
            <MdOutlinePeopleOutline className="text-[24px] text-[#440080]" />
            <h3 className="text-[20px] font-[600] text-[#1E1E1E] lg:text-[22px]">
              Members
            </h3>
          </div>
          <Link
            to={`/dashboard/ajo/${state.name}/members`}
            state={{
              members: members,
              createdBy: createdBy,
              amount: state.amount,
            }}
            className="flex items-center gap-1"
          >
            <Typography className="font-asap text-[14px] font-[600] text-[#565454]">
              View all
            </Typography>
            <GrFormNext className="text-[16px] text-[#440080]" />
          </Link>
        </div>
        <ul className="flex w-[100%] flex-col gap-4">
          {members.map((member: any, index: number) => (
            <Members_Template
              key={member._id || index}
              name={member.name || "John Doe"}
              userType={member.userId === createdBy ? "Admin" : "Member"}
              amount={
                typeof member.contribution === "number"
                  ? `$${member.contribution}`
                  : state.amount || "N/A"
              }
              progress={
                typeof member.progress === "number" ? member.progress : 0
              }
              index={index}
              showDelete={false}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default OtherGroupDetails;
