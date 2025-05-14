import React from "react";
import { LuUpload } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { Typography, Button } from "@material-tailwind/react";

import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { thirdOpenGroupType } from "../../../shared/types/types";

interface Props {
  data: thirdOpenGroupType;
  currency: string;
  savings_frequency: string;
  total_saving_amount: string;
  setData: React.Dispatch<React.SetStateAction<thirdOpenGroupType>>;
}

const ThirdOpenGroupForm = ({
  data,
  currency,
  savings_frequency,
  total_saving_amount,
  setData,
}: Props) => {
  const max = total_saving_amount.replace(/,/g, "");

  //console.log(max, typeof(max))

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setData((prev) => ({ ...prev, savings_image: file }));

    // also manually reset the input value to allow for re-uploading the same file as the input value is not updated when the same file is selected again
    const fileInput = document.getElementById(
      "savings_image",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const resetImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setData((prev) => ({ ...prev, savings_image: null }));
  };

  const handleButtonSelection = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setData({ ...data, agree: !data.agree });
  };

  return (
    <form className="flex w-[100%] flex-col items-center gap-6">
      <label
        htmlFor="depositAmount"
        className="flex w-[100%] flex-col gap-2 2xl:w-[80%]"
      >
        <Typography className="font-asap  text-[18px] font-[600] tracking-tighter text-black">
          {savings_frequency} Deposit
        </Typography>
        <div className="flex flex-col items-center gap-2">
          <Typography className="font-asap text-[24px] font-[600] text-[#1E1E1E]">
            {currency} {Number(data.depositAmount).toLocaleString()}
          </Typography>
          <input
            autoFocus
            type="range"
            min={"0"}
            max={Number(max) / 2}
            step={currency === "₦" ? "100" : "10"}
            onChange={handleChange}
            value={data.depositAmount}
            name="depositAmount"
            id="depositAmount"
            className="w-full cursor-pointer"
          />
        </div>
        <Typography className="font-asap text-[14px] font-[500] text-[#1E1E1E]">
          This amount is not fixed, members deposit any amount until the target
          amount is achieved.
        </Typography>
      </label>

      <div className="flex w-[100%] flex-col gap-2 2xl:w-[80%]">
        <div className="flex w-full items-center justify-between">
          <Typography className="font-asap text-[18px] font-semibold tracking-tighter text-black">
            Upload Picture <span className="text-[#DDD8D8]">(Optional)</span>
          </Typography>
          {data.savings_image && (
            <button
              className="flex -translate-y-1 items-center gap-1 self-end bg-transparent text-[14px] font-[500] tracking-tighter text-red-500"
              onClick={resetImage}
            >
              <FaTrashAlt className="text-[14px] text-red-500" /> Remove image
            </button>
          )}
        </div>
        <div
          className="relative flex h-[160px] w-[100%] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-black p-4"
          tabIndex={0}
        >
          <div className="z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#ECE6F2]">
            <LuUpload className="text-[20px] text-[#440080]" />
          </div>
          <Typography className="font-asap text-[16px] font-medium text-[#1E1E1EB2]">
            Choose file or{" "}
            <button className="text-[#440080]">use default</button>
          </Typography>
          <input
            type="file"
            name="savings_image"
            accept="image/*"
            id="savings_image"
            onChange={handleImageUpload}
            className="absolute left-0 top-0 z-20 h-full w-full cursor-pointer opacity-0"
          />
          {data.savings_image && (
            <img
              src={URL.createObjectURL(data.savings_image)}
              alt="Savings picture"
              className="absolute left-0 top-0 h-[100%] w-[100%] object-cover"
            />
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 self-start sm:items-center lg:self-center 2xl:self-auto ">
        <button onClick={handleButtonSelection}>
          {data.agree ? (
            <MdCheckBox className="text-[24px] text-[#440080]" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-[24px] text-[#1E1E1EB2]" />
          )}
        </button>
        <Typography className="font-asap text-[16px] font-[500] text-[#1E1E1EB2]">
          I agree to the{" "}
          <span className="font-[600] text-[#440080]">Terms of Service</span>{" "}
          and <span className="font-[600] text-[#440080]">Privacy Policy</span>
        </Typography>
      </div>
    </form>
  );
};

export default ThirdOpenGroupForm;
