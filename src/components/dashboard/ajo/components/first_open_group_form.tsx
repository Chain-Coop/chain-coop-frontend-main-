import liskIcon from "../../../../Assets/svg/dashboard/ajo/lisk_icon.svg"
import usdcIcon from "../../../../Assets/svg/dashboard/ajo/usdc_icon.svg"
import usdtIcon from "../../../../Assets/svg/dashboard/ajo/usdt_icon.svg"
import nairaIcon from "../../../../Assets/svg/dashboard/ajo/naira_icon.svg"



const FirstOpenGroupForm = () => {
    return (
        <form className="flex flex-col gap-6 w-[100%] items-center">
            <label htmlFor="group_title" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Group Title
                </p>
                <input autoFocus type="text" name="group_title" id="group_title" className="text-[16px] border-2 border-[#95949480] rounded-lg py-2 px-4 outline-none focus:shadow-xl shadow-lg font-[400] text-[#1E1E1E99]" />
            </label>

            <label htmlFor="group_title" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Group Description <span className="text-[#1E1E1E66]">(Optional)</span>
                </p>
                <textarea rows={3} name="group_description" id="group_description"  className="text-[16px] border-2 border-[#95949480] rounded-lg py-2 px-4 outline-none focus:shadow-xl shadow-lg font-[400] text-[#1E1E1E99]" />
            </label>

            <div  className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    What currency are you saving on ?
                </p>                       
                <div className="w-[100%] flex flex-wrap justify-between gap-1 gap-y-3">
                    <button className="border-2 rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center">
                        <img src={liskIcon} alt="LISK" className="w-[20px]" />
                        <p className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                            Lisk
                        </p>
                    </button>
                    <button className="border-2 rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center">
                        <img src={usdcIcon} alt="USDC" className="w-[20px]" />
                        <p className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                            USDC
                        </p>
                    </button>
                    <button className="border-2 rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center">
                        <img src={usdtIcon} alt="USDT" className="w-[20px]" />
                        <p className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                            USDT
                        </p>
                    </button>
                    <button className="border-2 rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center">
                        <img src={nairaIcon} alt="NAIRA" className="w-[20px]" />
                        <p className="text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                            Naira
                        </p>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FirstOpenGroupForm