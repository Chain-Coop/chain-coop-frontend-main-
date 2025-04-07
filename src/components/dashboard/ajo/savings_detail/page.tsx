import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { GrFormNext } from "react-icons/gr";
import ProgressCircle from "../components/progress_circle";
import { BsPatchCheck } from "react-icons/bs";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import sampleImage from "../../../../Assets/png/dashboard/ajo/sample_savings_image.png";
import icon from "../../../../Assets/svg/dashboard/ajo/details_icon.svg";
import currency_icon from "../../../../Assets/svg/dashboard/ajo/currency_icon.svg";
import { IoIosArrowBack } from "react-icons/io";
import { DashboardHeader } from "../../../common/DashboardHeader";

const SavingsDetail = () => {
  const { name } = useParams();

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

  const membersData = [
    {
      name: "John Doe",
      amount: "$20",
      userType: "member",
      status: "Joined",
    },
    {
      name: "Jane Doe",
      amount: "$30",
      userType: "member",
      status: "Funded",
    },
    {
      name: "Mark Doe",
      amount: "$0",
      userType: "member",
      status: "Joined",
    },
  ];

  const navigate = useNavigate();

  // function to navigate back
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="mb-[20px] flex  flex-col ">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">{name}</div>
        </div>
      </DashboardHeader>

      <section className="mb-[20px] flex  flex-col px-4 lg:px-6">
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
                  <Typography className="text-[12px] font-[600] text-[#565454]">
                    View leadership board
                  </Typography>
                  <GrFormNext className="text-[16px] text-[#440080]" />
                </Link>
              </div>
              <ProgressCircle progress={5} />
            </div>
            <Typography className="text-[16px] font-[400] leading-tight tracking-wide">
              alialiquam vel elementum facilisis amet netus elementum. Quam
              mauris diam pretium etiam pellentesque accumsan. Enim nisl sit
              interdum id vivamus nibh lacus s feug.
            </Typography>
          </div>
        </section>

        <section className="flex w-[100%] flex-col items-center justify-center bg-[#FFF7FC] p-4">
          <Typography className="text-[14px] font-[400] leading-tight tracking-wide">
            Total saved
          </Typography>
          <h2 className="text-[34px] font-[600] tracking-tight text-[#1E1E1E] lg:text-[36px]">
            $29,000.67
          </h2>
          <Button className="mt-[30px] flex h-[45px] w-[100%] items-center justify-center self-start rounded-md bg-[#440080] px-6 text-[16px] font-medium text-white hover:bg-[#3D0073] lg:w-[190px] lg:text-[18px]">
            Join
          </Button>
        </section>

        <ul className="mt-[20px] flex w-[100%] flex-col">
          {firstSavingsData.map((data) => (
            <li
              className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10"
              key={data.addition}
            >
              <Typography className="text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
                {data.key}
              </Typography>
              <Typography className="text-[16px] font-[500] tracking-tight text-[#939090] lg:text-[18px]">
                <span className="text-black">{data.value}</span> {data.addition}
              </Typography>
            </li>
          ))}

          {lastSavingsData.map((data) => (
            <li
              className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10"
              key={data.key}
            >
              <Typography className="text-[16px] font-[500] text-[#939090] lg:text-[18px]">
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
                <Typography className="pr-6 text-[14px] font-[500] text-[#302B2B] lg:text-[16px]">
                  {data.value}
                </Typography>
                <BsPatchCheck className="text-[24px] text-[#440080]" />
              </div>
            </li>
          ))}

          <li className="flex w-[96%] items-center justify-between border-b border-b-[#DDD8D887] pb-4 pt-10">
            <Typography className="text-[16px] font-[500] text-[#939090] lg:text-[18px]">
              Withdrawal Day
            </Typography>
            <Typography className="text-[16px] font-[500] text-black lg:text-[18px]">
              28/04/2025
            </Typography>
          </li>
        </ul>

        {/* MEMBERS LIST */}
        <section className="mt-[50px] flex flex-col gap-3">
          <div className="flex items-center justify-between border-b-2 border-b-[#DDD8D880] pb-2">
            <h3 className="text-[18px] font-[600] tracking-tight text-[#1E1E1E]">
              Members (3)
            </h3>
            <Link
              to={`/ajo/${name}/members`}
              className="text-[16px] font-[600] tracking-tight text-[#440080]"
            >
              See all
            </Link>
          </div>
          <ul className="mt-[10px] flex flex-col gap-4">
            {membersData.map((data, index) => (
              <li
                key={`${data.name}-${index}`}
                className="flex w-[100%] flex-col gap-2 rounded-lg border border-[#93909080] bg-[#F6EFF7] px-4 py-2"
              >
                <div className="flex w-[100%] items-center justify-between">
                  <h4 className="text-[18px] font-[500] tracking-tighter text-[#1E1E1E]">
                    {data.name}{" "}
                    <span className="capitalize">({data.userType})</span>
                  </h4>
                  {data.status === "Joined" ? (
                    <Typography
                      className={`txt-[13px] min-w-[120px] rounded-md border border-[#CCA3BC] bg-[#E6B8D4] py-1 text-center font-[500]`}
                    >
                      {data.status}
                    </Typography>
                  ) : (
                    <Typography
                      className={`txt-[13px] min-w-[120px] rounded-md border border-[#44008080] bg-[#E3D9EC] py-1 text-center font-[500] text-[#440080]`}
                    >
                      {data.status}: {data.amount}
                    </Typography>
                  )}
                </div>
                <div className="flex w-[100%] items-center justify-between">
                  <div className="flex flex-col items-start ">
                    <Typography className="text-[14px] font-[400] tracking-tighter text-[#959494]">
                      Total balance
                    </Typography>
                    <Typography className="text-[14px] font-[600] text-[#440080]">
                      {data.amount}
                    </Typography>
                  </div>
                  <Typography className="text-[14px] font-[400] tracking-tighter text-[#1E1E1E99]">
                    4 minutes ago
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
};

export default SavingsDetail;
