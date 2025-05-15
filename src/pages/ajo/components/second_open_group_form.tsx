import { useRef } from "react";
import { CgCalendarDates } from "react-icons/cg";
import { Typography, Button } from "@material-tailwind/react";

import { secondOpenGroupType } from "../../../shared/types/types";
import activeIcon from "../../../Assets/svg/dashboard/ajo/selectedIcon.svg";
import formatAmountWithCommas from "../../../shared/utils/format_amount_with_commas";

interface Props {
  data: secondOpenGroupType;
  setData: React.Dispatch<React.SetStateAction<secondOpenGroupType>>;
}

const SecondOpenGroupForm = ({ data, setData }: Props) => {
  const startDateRef = useRef<HTMLInputElement>(null);

  const endDateRef = useRef<HTMLInputElement>(null);

  const openStartDate = () => {
    startDateRef.current?.showPicker();
  };

  const openEndDate = () => {
    endDateRef.current?.showPicker();
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value.replace(/,/g, "");
    if (!/^\d*$/.test(rawValue)) return;

    setData((prev) => ({
      ...prev,
      total_saving_amount: rawValue,
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleButtonSelection = (
    event: React.MouseEvent<HTMLButtonElement>,
    choice: string,
  ) => {
    event.preventDefault();
    setData({ ...data, savings_frequency: choice });
  };

  return (
    <form className="flex w-[100%] flex-col items-center gap-6">
      <label
        htmlFor="total_saving_amount"
        className="flex w-[100%] flex-col gap-2 2xl:w-[80%]"
      >
        <Typography className=" font-asap text-[18px] font-[600] tracking-tighter text-black">
          Total Saving Amount
        </Typography>
        <input
          autoFocus
          type="text"
          onChange={handleAmount}
          value={formatAmountWithCommas(data.total_saving_amount)}
          name="total_saving_amount"
          id="total_saving_amount"
          className="rounded-lg border-2 border-[#95949480] px-4 py-2 text-[16px] font-[400] text-[#1E1E1E] shadow-lg outline-none focus:shadow-xl"
        />
      </label>

      <div className="flex w-[100%] flex-col gap-2 2xl:w-[80%]">
        <Typography className=" font-asap text-[18px] font-[600] tracking-tighter text-black">
          Select Savings Frequency
        </Typography>
        <div className="flex w-[100%] flex-wrap justify-between gap-1 gap-y-3">
          <Button
            onClick={(event) => {
              handleButtonSelection(event, "Daily");
            }}
            className={`flex w-[48%] items-center justify-between rounded-lg border-2 bg-[#ECE6F2] p-2 font-asap hover:border-[#440080] sm:w-[150px] ${data.savings_frequency === "Daily" ? "border-[#440080]" : ""}`}
          >
            <Typography className=" font-asaptext-[16px] font-[600] capitalize tracking-tighter text-[#302B2B]">
              Daily
            </Typography>
            {data.savings_frequency === "Daily" && (
              <img src={activeIcon} alt="Daily savings" className="w-[20px]" />
            )}
          </Button>
          <Button
            onClick={(event) => {
              handleButtonSelection(event, "Weekly");
            }}
            className={`flex w-[48%] items-center justify-between rounded-lg border-2 bg-[#ECE6F2] p-2 font-asap text-[16px] font-[600] capitalize tracking-tighter text-[#302B2B] hover:border-[#440080] sm:w-[150px] ${data.savings_frequency === "Weekly" ? "border-[#440080]" : ""}`}
          >
            <Typography className=" font-asaptext-[16px] font-[600] capitalize tracking-tighter text-[#302B2B] ">
              Weekly
            </Typography>
            {data.savings_frequency === "Weekly" && (
              <img src={activeIcon} alt="Weekly savings" className="w-[20px]" />
            )}
          </Button>
          <Button
            onClick={(event) => {
              handleButtonSelection(event, "Monthly");
            }}
            className={`flex w-[48%] items-center justify-between rounded-lg border-2 bg-[#ECE6F2] p-2 font-asap text-[16px] font-[600] capitalize tracking-tighter text-[#302B2B] hover:border-[#440080] sm:w-[150px] ${data.savings_frequency === "Monthly" ? "border-[#440080]" : ""}`}
          >
            <Typography className=" font-asaptext-[16px] font-[600] capitalize tracking-tighter text-[#302B2B] ">
              Monthly
            </Typography>
            {data.savings_frequency === "Monthly" && (
              <img
                src={activeIcon}
                alt="Monthly savings"
                className="w-[20px]"
              />
            )}
          </Button>
          <Button
            onClick={(event) => {
              handleButtonSelection(event, "Quarterly");
            }}
            className={`flex w-[48%] items-center justify-between rounded-lg border-2 bg-[#ECE6F2] p-2 font-asap text-[16px] font-[600] capitalize tracking-tighter text-[#302B2B] hover:border-[#440080] sm:w-[150px] ${data.savings_frequency === "Quarterly" ? "border-[#440080]" : ""}`}
          >
            <Typography className=" font-asaptext-[16px] font-[600] capitalize tracking-tighter text-[#302B2B] ">
              Quarterly
            </Typography>
            {data.savings_frequency === "Quarterly" && (
              <img
                src={activeIcon}
                alt="Quarterly savings"
                className="w-[20px]"
              />
            )}
          </Button>
        </div>
      </div>

      <div className="flex w-[100%] flex-col gap-2 2xl:w-[80%]">
        <Typography className=" font-asap text-[18px] font-[600] tracking-tighter text-black">
          Daily Duration
        </Typography>
        <div className="flex flex-col gap-4">
          <div
            className="relative flex w-[100%] items-center justify-between rounded-lg border-2 border-[#95949480] p-2 font-[400] shadow-lg outline-none focus:shadow-xl"
            onClick={openStartDate}
          >
            <Typography className=" font-asaptext-[#1E1E1E] text-[18px] font-[400] opacity-60">
              {data.start_date || "Start date"}
            </Typography>
            <CgCalendarDates className="h-[16px] w-[16px] text-[#440080]" />
            <input
              type="date"
              name="start_date"
              onChange={handleChange}
              value={data.start_date}
              max={data.end_date}
              ref={startDateRef}
              id="start_date"
              className="absolute opacity-0"
            />
          </div>
          <div
            className="relative flex w-[100%] items-center justify-between rounded-lg border-2 border-[#95949480] p-2 font-[400] shadow-lg outline-none focus:shadow-xl"
            onClick={openEndDate}
          >
            <Typography className=" font-asaptext-[#1E1E1E] text-[18px] font-[400] opacity-60">
              {data.end_date || "End date"}
            </Typography>
            <CgCalendarDates className="h-[16px] w-[16px] text-[#440080]" />
            <input
              type="date"
              ref={endDateRef}
              onChange={handleChange}
              value={data.end_date}
              min={data.start_date}
              name="end_date"
              id="end_date"
              className="absolute opacity-0"
            />
          </div>
        </div>
        <Typography className=" font-asaptext-[15px] mt-[10px] font-[400] text-[#1E1E1E]">
          Set until this savings group last
        </Typography>
      </div>
    </form>
  );
};

export default SecondOpenGroupForm;
