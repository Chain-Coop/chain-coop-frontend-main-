import { firstOpenGroupType } from "../../../../shared/types/types"
import React from "react"

import liskIcon from "../../../../Assets/svg/dashboard/ajo/lisk_icon.svg"
import usdcIcon from "../../../../Assets/svg/dashboard/ajo/usdc_icon.svg"
import usdtIcon from "../../../../Assets/svg/dashboard/ajo/usdt_icon.svg"
import nairaIcon from "../../../../Assets/svg/dashboard/ajo/naira_icon.svg"
import activeIcon from "../../../../Assets/svg/dashboard/ajo/selectedIcon.svg"

interface Props {
    data: firstOpenGroupType, 
    setData: React.Dispatch<React.SetStateAction<firstOpenGroupType>>
}

const FirstOpenGroupForm = ({ data, setData }: Props) => {
    const handleTextChange= (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleButtonSelection = (event: React.MouseEvent<HTMLButtonElement>, choice: string) => {
        event.preventDefault()
        setData({ ...data, savings_currency: choice })
    }


    return (
        <form className="flex flex-col gap-6 w-[100%] items-center">
            <label htmlFor="savings_title" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Group Title
                </p>
                <input autoFocus type="text" onChange={handleTextChange} value={data.savings_title} name="savings_title" id="savings_title" className="text-[16px] border-2 border-[#95949480] rounded-lg py-2 px-4 outline-none focus:shadow-xl shadow-lg font-[400] text-[#1E1E1E99]" />
            </label>

            <label htmlFor="savings_description" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Group Description <span className="text-[#1E1E1E66]">(Optional)</span>
                </p>
                <textarea rows={3} value={data.savings_description} onChange={handleTextChange} name="savings_description" id="savings_description"  className="text-[16px] border-2 border-[#95949480] rounded-lg py-2 px-4 outline-none focus:shadow-xl shadow-lg font-[400] text-[#1E1E1E99]" />
            </label>

            <div  className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    What currency are you saving on ?
                </p>                       
                <div className="w-[100%] flex flex-wrap justify-between gap-1 gap-y-3">
                    <button 
                        onClick={(event) => {handleButtonSelection(event, "Lisk")}}
                        className={`border-2 rounded-lg hover:border-[#440080] bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center ${data.savings_currency === "Lisk" ? 'border-[#440080]' : ''}`}>
                        <img src={liskIcon} alt="LISK" className="w-[20px]" />
                        <p className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                            Lisk
                        </p>
                        {
                            data.savings_currency === "Lisk" && <img src={activeIcon} alt="LISK" className="w-[20px]" />
                        }
                    </button>
                    <button 
                        onClick={(event) => {handleButtonSelection(event, "USDC")}}
                        className={`border-2 rounded-lg hover:border-[#440080] bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center ${data.savings_currency === "USDC" ? 'border-[#440080]' : ''}`}>
                        <img src={usdcIcon} alt="USDC" className="w-[20px]" />
                        <p className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                            USDC
                        </p>
                        {
                            data.savings_currency === "USDC" && <img src={activeIcon} alt="LISK" className="w-[20px]" />
                        }
                    </button>
                    <button 
                        onClick={(event) => {handleButtonSelection(event, "USDT")}}
                        className={`border-2 rounded-lg hover:border-[#440080] bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center ${data.savings_currency === "USDT" ? 'border-[#440080]' : ''}`}>
                        <img src={usdtIcon} alt="USDT" className="w-[20px]" />
                        <p className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                            USDT
                        </p>
                        {
                            data.savings_currency === "USDT" && <img src={activeIcon} alt="LISK" className="w-[20px]" />
                        }
                    </button>
                    <button 
                        onClick={(event) => {handleButtonSelection(event, "Naira")}}
                        className={`border-2 rounded-lg hover:border-[#440080] bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center ${data.savings_currency === "Naira" ? 'border-[#440080]' : ''}`}>
                        <img src={nairaIcon} alt="NAIRA" className="w-[20px]" />
                        <p className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                            Naira
                        </p>
                        {
                            data.savings_currency === "Naira" && <img src={activeIcon} alt="LISK" className="w-[20px]" />
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FirstOpenGroupForm