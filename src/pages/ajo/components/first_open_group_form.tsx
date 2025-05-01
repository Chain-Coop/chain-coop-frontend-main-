import { firstOpenGroupType } from "../../../shared/types/types";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import liskIcon from "../../../Assets/svg/dashboard/ajo/lisk_icon.svg";
import usdcIcon from "../../../Assets/svg/dashboard/ajo/usdc_icon.svg";
import usdtIcon from "../../../Assets/svg/dashboard/ajo/usdt_icon.svg";
import nairaIcon from "../../../Assets/svg/dashboard/ajo/naira_icon.svg";
import activeIcon from "../../../Assets/svg/dashboard/ajo/selectedIcon.svg";
import FormInput from "../../../components/common/FormInput";

interface Props {
  data: firstOpenGroupType;
  setData: React.Dispatch<React.SetStateAction<firstOpenGroupType>>;
}

const FirstOpenGroupForm = ({ data, setData }: Props) => {
  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleButtonSelection = (
    event: React.MouseEvent<HTMLButtonElement>,
    choice: string,
    image: string,
  ) => {
    event.preventDefault();
    setData({ ...data, savings_currency: choice, currency_image: image });
  };

  return (
    <form className="flex w-[100%] flex-col items-center gap-6">
      <label htmlFor="savings_title" className="flex w-[100%] flex-col gap-2 ">
        <FormInput
          label="Group Title"
          type="text"
          onChange={handleTextChange}
          value={data.savings_title}
          className="rounded-lg border-2 border-[#95949480] shadow-lg focus:shadow-xl"
          labelClassName="text-lg"
        />
      </label>

      <label
        htmlFor="savings_description"
        className="flex w-[100%] flex-col gap-2"
      >
        <Typography className="text-lg font-semibold tracking-tighter">
          Group Description <span className="text-[#1E1E1E66]">(Optional)</span>
        </Typography>
        <textarea
          rows={3}
          value={data.savings_description}
          onChange={handleTextChange}
          name="savings_description"
          id="savings_description"
          className="rounded-lg border-2 border-[#95949480] px-4 py-2 text-[16px] font-[400] text-[#1E1E1E] shadow-lg outline-none focus:shadow-xl"
        />
      </label>
      <section className="flex w-full flex-col gap-2">
        <Typography className="text-lg font-semibold tracking-tighter">
          What currency are you saving on?
        </Typography>
        <div className="flex max-w-md justify-between gap-10">
          <div className="flex w-full flex-col gap-8">
            <Button
              onClick={(event) =>
                handleButtonSelection(event, "Lisk", liskIcon)
              }
              className={`flex w-fit  items-center justify-center gap-3 rounded-lg border-2 bg-[#ECE6F2] p-2 px-3 hover:border-[#440080] ${
                data.savings_currency === "Lisk"
                  ? "border-[#440080]"
                  : "border-transparent"
              }`}
            >
              <img src={liskIcon} alt="LISK" className="w-[20px]" />
              <Typography className="font-[600] tracking-tighter text-[#302B2B]">
                Lisk
              </Typography>
              {data.savings_currency === "LISK" && (
                <img src={activeIcon} alt="LISK" className="w-[20px]" />
              )}
            </Button>

            <Button
              onClick={(event) =>
                handleButtonSelection(event, "USDC", usdcIcon)
              }
              className={`flex w-fit  items-center justify-center gap-3 rounded-lg border-2 bg-[#ECE6F2] p-2 px-3 normal-case hover:border-[#440080] ${
                data.savings_currency === "USDC"
                  ? "border-[#440080]"
                  : "border-transparent"
              }`}
            >
              <img src={usdcIcon} alt="USDC" className="w-[20px]" />
              <Typography className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                USDC
              </Typography>
              {data.savings_currency === "USDC" && (
                <img src={activeIcon} alt="USDC" className="w-[20px]" />
              )}
            </Button>
          </div>

          <div className="flex w-full flex-col gap-8">
            <Button
              onClick={(event) =>
                handleButtonSelection(event, "USDT", usdtIcon)
              }
              className={`flex w-fit  items-center justify-center gap-3 rounded-lg border-2 bg-[#ECE6F2] p-2 px-3 hover:border-[#440080] ${
                data.savings_currency === "USDT"
                  ? "border-[#440080]"
                  : "border-transparent"
              }`}
            >
              <img src={usdtIcon} alt="USDT" className="w-[20px]" />
              <Typography className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                USDT
              </Typography>
              {data.savings_currency === "USDT" && (
                <img src={activeIcon} alt="USDT" className="w-[20px]" />
              )}
            </Button>

            <Button
              onClick={(event) => handleButtonSelection(event, "₦", nairaIcon)}
              className={`flex w-fit  items-center justify-center gap-3 rounded-lg border-2 bg-[#ECE6F2] p-2 px-3 hover:border-[#440080] ${
                data.savings_currency === "₦"
                  ? "border-[#440080]"
                  : "border-transparent"
              }`}
            >
              <img src={nairaIcon} alt="Naira" className="w-[20px]" />
              <Typography className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                Naira
              </Typography>
              {data.savings_currency === "₦" && (
                <img src={activeIcon} alt="Naira" className="w-[20px]" />
              )}
            </Button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default FirstOpenGroupForm;
