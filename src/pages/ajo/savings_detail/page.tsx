import { useNavigate, useParams } from "react-router";
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

import sampleImage from "../../../Assets/png/dashboard/ajo/sample_savings_image.png";
import icon from "../../../Assets/svg/dashboard/ajo/details_icon.svg";
import currency_icon from "../../../Assets/svg/dashboard/ajo/currency_icon.svg";
import { IoIosArrowBack } from "react-icons/io";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { membersData } from "../../../data/Data";
import Members_Template from "./member_template";
import { useState } from "react";
import FundModal from "./fund_modal";

const SavingsDetail = () => {
  const { name } = useParams();

  const progress = 50

  const firstSavingsData = [
    {
      key: "Daily Deposit",
      value: "$10",
      addition: "(optional)",
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
      key: "Savings Frequency",
      value: "Daily",
    },
    {
      key: "Currency/Token",
      value: "USD",
      image: currency_icon,
    },
  ];

  const navigate = useNavigate();

  // state to toggle the modal
  const [isFundModalOpen, setIsFundModalOpen] = useState<boolean>(false);

  // function to navigate back
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="mb-[20px] flex  font-asap  flex-col">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">{name}</div>
        </div>
      </DashboardHeader>

      <section className="mb-[20px] flex  flex-col">
        {/* SAVINGS INTRO AND HEADER */}
        <section className="mt-[10px] flex justify-between gap-2 bg-[#ECE6F240] py-4">
          <img
            src={sampleImage}
            alt={name}
            className="hidden w-[160px] flex-shrink-0 rounded-lg sm:block"
          />
          <div className="flex w-[100%] flex-col gap-2 text-[#1E1E1EB2]">
            <div className="flex w-[100%] items-center justify-between sm:items-start">
              <img
                src={sampleImage}
                alt={name}
                className="h-[50px] w-[70px] rounded-lg sm:hidden sm:flex-shrink-0"
              />
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-[22px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[24px]">
                  {name}
                </h2>
                <Link
                  to={`/leadership-board/{name}`}
                  className="flex items-center sm:gap-1"
                >
                  <img
                    src={icon}
                    alt="leadership board"
                    className="hidden h-[14px] w-[14px] sm:block"
                  />
                  <Typography className="font-asap text-[12px] font-[600] text-[#565454]">
                    View leadership board
                  </Typography>
                  <GrFormNext className="text-[16px] text-[#440080]" />
                </Link>
              </div>
              <ProgressCircle progress={5} />
            </div>
            <Typography className="font-asap text-[16px] font-[400] leading-tight tracking-wide">
              alialiquam vel elementum facilisis amet netus elementum. Quam
              mauris diam pretium etiam pellentesque accumsan. Enim nisl sit
              interdum id vivamus nibh lacus s feug.
            </Typography>
          </div>
        </section>

        <section className="flex w-[100%] flex-col items-center justify-center bg-[#FFF7FC] p-4">
        <Typography className="font-asap text-[14px] font-[400] leading-tight tracking-wide opacity-60">
            My savings
          </Typography>
          <h2 className="text-[34px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[36px]">
            $200
          </h2>
          <div className="my-4 py-2 border-y border-[#C4C0C080] w-[100%] flex items-center justify-center gap-1">
            <Typography className="font-asap text-[14px] text-[#302B2B] font-[400] leading-tight tracking-wide">
              Savings progress
            </Typography>
            {
              progress > 0 ? (
                <FiArrowUpRight className="text-[14px] text-[#2EC046]" />
              ) : (
                <LuArrowDownRight className="text-[14px] text-red-500" />
              )
            }
            <Typography className={`font-asap text-[14px] text-[#302B2B] font-[700] leading-tight tracking-wide ${progress > 0 ? 'text-[#2EC046]' : 'text-red-500'}`}>
              {progress}%
            </Typography>
          </div>
          <Typography className="font-asap text-[14px] font-[400] leading-tight tracking-wide opacity-60">
            Total saved
          </Typography>
          <h2 className="text-[34px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[36px]">
            $29,000.67
          </h2>
          <div className="flex w-[100%] justify-between items-center gap-y-4 flex-wrap mt-8">
            <Button 
              onClick={() => setIsFundModalOpen(true)} 
              className="flex h-[45px] w-[100%] items-center justify-center self-start rounded-md bg-[#440080] px-6 text-[16px] font-medium text-white normal-case font-asap hover:bg-white border-2 border-[#3D0073] hover:text-[#3D0073] sm:w-[190px] lg:text-[18px]">
              Fund
            </Button>
            <Button className="flex h-[45px] w-[100%] items-center justify-center self-start rounded-md bg-white px-6 text-[16px] font-medium text-black normal-case font-asap hover:text-white hover:bg-[#3D0073] border-2 border-[#3D0073] sm:w-[190px] lg:text-[18px]">
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
              <div className="flex w-[150px] items-center justify-between gap-1 rounded-lg border-2 border-[#440080] bg-[#ECE6F2] p-2">
                {data.image && (
                  <img
                    src={data.image}
                    alt={data.key}
                    className="h-[24px] w-[24px]"
                  />
                )}
                <Typography className="font-asap pr-6 text-[14px] font-[500] text-[#302B2B] lg:text-[16px]">
                  {data.value}
                </Typography>
                <BsPatchCheck className="text-[24px] text-[#440080]" />
              </div>
            </li>
          ))}

          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="font-asap text-[16px] font-[500] text-[#939090] lg:text-[18px]">
              Withdrawal Day
            </Typography>
            <Typography className="font-asap text-[16px] font-[500] text-black lg:text-[18px]">
              28/04/2025
            </Typography>
          </li>
        </ul>

        {/* TRANSACTION BOX */}
        <Link to={`/dashboard/ajo/transactions/${name}`} className="w-[100%] flex justify-between rounded-md bg-[#ECE6F25E] border border-[#DDD8D84D] px-3 items-center py-6 mt-6">
          <div className="flex flex-col gap-4  w-[80%]">
            <h3 className="text-[18px] font-[500] tracking-tight text-[#1E1E1E]">
              Transaction history
            </h3>
            <Typography className="font-asap text-[14px] font-[400] text-[#1E1E1E] opacity-80">
              See all withdrawing and funding on this group
            </Typography>
          </div>
          <button>
            <FaChevronRight className="text-[#1E1E1E] text-[16px]" />
          </button>
        </Link>

        {/* MEMBERS LIST */}
        <section className="mt-8 flex flex-col gap-3">
          <div className="flex items-center justify-between border-b-2 border-b-[#DDD8D880] pb-2">
            <h3 className="text-[18px] font-[600] tracking-tight text-[#1E1E1E]">
              Members ({membersData.length})
            </h3>
            <Link to={'/dashboard/ajo/open-group/members'} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ECE6F25E] rounded-full flex items-center justify-center">
                <FaPlus className="text-[8px] -translate-y-[1px] translate-x-[2px] text-[#3D0073]" />
                <MdOutlinePeopleOutline className="text-[20px] -translate-x-[2px] text-[#3D0073]" />
              </div>
              <Typography className="font-asap text-[16px] font-[500] text-[#1E1E1E]">
                Invite users
              </Typography>
              </Link>
          </div>
          <ul className="mt-[10px] flex flex-col gap-4">
            {membersData.map((data, index) => (
              <Members_Template amount={data.amount} index={index} name={data.name} userType={data.userType} key={`${index}-${data.name}`} />
            ))}
          </ul>
        </section>
        <Link to={"/dashboard/ajo/open-group/members"} className="bg-white border-2 border-[#440080] text-[#440080] font-[600] mt-8 text-[16px] w-[200px] h-[45px] rounded-md font-asap text-center flex items-center justify-center self-center">
            See all
        </Link>
      </section>
      <FundModal isOpen={isFundModalOpen} setIsOpen={setIsFundModalOpen} />
    </main>
  );
};

export default SavingsDetail;
