import { firstOpenGroupType } from "../../../shared/types/types"
import React from "react"
import { Typography } from "@material-tailwind/react"
import { Button } from "@material-tailwind/react";

import liskIcon from "../../../Assets/svg/dashboard/ajo/lisk_icon.svg"
import usdcIcon from "../../../Assets/svg/dashboard/ajo/usdc_icon.svg"
import usdtIcon from "../../../Assets/svg/dashboard/ajo/usdt_icon.svg"
import nairaIcon from "../../../Assets/svg/dashboard/ajo/naira_icon.svg"
import activeIcon from "../../../Assets/svg/dashboard/ajo/selectedIcon.svg"

interface Props {
    data: firstOpenGroupType, 
    setData: React.Dispatch<React.SetStateAction<firstOpenGroupType>>
}

const FirstOpenGroupForm = ({ data, setData }: Props) => {
    const handleTextChange= (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleButtonSelection = (event: React.MouseEvent<HTMLButtonElement>, choice: string, image: string) => {
        event.preventDefault()
        setData({ ...data, savings_currency: choice, currency_image: image })
    }


    return (
        <form className="flex flex-col gap-6 w-[100%] items-center">
            <label htmlFor="savings_title" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <Typography className=" font-[600] text-[18px] text-black tracking-tighter font-asap">
                    Group Title
                </Typography>
                <input autoFocus type="text" onChange={handleTextChange} value={data.savings_title} name="savings_title" id="savings_title" className="text-[16px] border-2 border-[#95949480] rounded-lg py-2 px-4 outline-none focus:shadow-xl shadow-lg font-[400] text-[#1E1E1E99]" />
            </label>

            <label htmlFor="savings_description" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <Typography className=" font-[600] text-[18px] text-black tracking-tighter font-asap">
                    Group Description <span className="text-[#1E1E1E66]">(Optional)</span>
                </Typography>
                <textarea rows={3} value={data.savings_description} onChange={handleTextChange} name="savings_description" id="savings_description"  className="text-[16px] border-2 border-[#95949480] rounded-lg py-2 px-4 outline-none focus:shadow-xl shadow-lg font-[400] text-[#1E1E1E99]" />
            </label>

            <div  className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <Typography className=" font-[600] text-[18px] text-black tracking-tighter font-asap">
                    What currency are you saving on ?
                </Typography>                       
                <div className="w-[100%] flex flex-wrap justify-between gap-y-4 2xl:gap-y-4">
                    <Button 
                        onClick={(event) => {handleButtonSelection(event, "LISK", liskIcon)}}
                        className={`border-2 rounded-lg hover:border-[#440080] bg-[#ECE6F2] p-2 flex items-center w-[48%] sm:w-[120px] 2xl:w-[23%] gap-2 justify-center ${data.savings_currency === "LISK" ? 'border-[#440080]' : ''}`}>
                        <img src={liskIcon} alt="LISK" className="w-[20px]" />
                        <Typography className="text-[16px] font-[600] tracking-tighter text-[#302B2B] font-asap">
                            Lisk
                        </Typography>
                        {
                            data.savings_currency === "Lisk" && <img src={activeIcon} alt="LISK" className="w-[20px]" />
                        }
                    </Button>
                    <Button 
                        onClick={(event) => {handleButtonSelection(event, "USDC", usdcIcon)}}
                        className={`border-2 rounded-lg hover:border-[#440080] bg-[#ECE6F2] p-2 flex items-center w-[48%] sm:w-[120px] 2xl:w-[23%] gap-2 justify-center ${data.savings_currency === "USDC" ? 'border-[#440080]' : ''}`}>
                        <img src={usdcIcon} alt="USDC" className="w-[20px]" />
                        <Typography className="text-[16px] font-[600] tracking-tighter text-[#302B2B] font-asap">
                            USDC
                        </Typography>
                        {
                            data.savings_currency === "USDC" && <img src={activeIcon} alt="LISK" className="w-[20px]" />
                        }
                    </Button>
                    <Button 
                        onClick={(event) => {handleButtonSelection(event, "USDT", usdtIcon)}}
                        className={`border-2 rounded-lg hover:border-[#440080] bg-[#ECE6F2] p-2 flex items-center w-[48%] sm:w-[120px] 2xl:w-[23%] gap-2 justify-center ${data.savings_currency === "USDT" ? 'border-[#440080]' : ''}`}>
                        <img src={usdtIcon} alt="USDT" className="w-[20px]" />
                        <Typography className="text-[16px] font-[600] tracking-tighter text-[#302B2B] font-asap">
                            USDT
                        </Typography>
                        {
                            data.savings_currency === "USDT" && <img src={activeIcon} alt="LISK" className="w-[20px]" />
                        }
                    </Button>
                    <Button 
                        onClick={(event) => {handleButtonSelection(event, "₦", nairaIcon)}}
                        className={`border-2 rounded-lg hover:border-[#440080] bg-[#ECE6F2] p-2 flex items-center w-[48%] sm:w-[120px] 2xl:w-[23%] gap-2 justify-center ${data.savings_currency === "₦" ? 'border-[#440080]' : ''}`}>
                        <img src={nairaIcon} alt="NAIRA" className="w-[20px]" />
                        <Typography className="text-[16px] font-[600] tracking-tighter text-[#302B2B] font-asap">
                            Naira
                        </Typography>
                        {
                            data.savings_currency === "Naira" && <img src={activeIcon} alt="LISK" className="w-[20px]" />
                        }
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default FirstOpenGroupForm