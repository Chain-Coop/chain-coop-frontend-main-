import { useRef } from "react";
import { CgCalendarDates } from "react-icons/cg";



const SecondOpenGroupForm = () => {
    const startDateRef = useRef<HTMLInputElement>(null)

    const endDateRef = useRef<HTMLInputElement>(null)

    const openStartDate = () => {
        startDateRef.current?.showPicker()
    }

    const openEndDate = () => {
        startDateRef.current?.showPicker()
    }


    return (
        <form className="flex flex-col gap-6 w-[100%] items-center">
            <label htmlFor="group_amount" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Total Saving Amount
                </p>
                <input autoFocus type="number" name="group_amount" id="group_amount" className="text-[16px] border-2 border-[#95949480] rounded-lg py-2 px-4 outline-none focus:shadow-xl shadow-lg font-[400] text-[#1E1E1E99]" />
            </label>

            <div  className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Select Savings Frequency
                </p>                       
                <div className="w-[100%] flex flex-wrap justify-between gap-1 gap-y-3">
                    <button className="border-2 rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[120px] justify-between text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                        Daily
                    </button>
                    <button className="border-2 rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                        Weekly
                    </button>
                    <button className="border-2 rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                        Monthly
                    </button>
                    <button className="border-2 rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[120px] gap-2 justify-center text-[16px] font-[600] tracking-tighter text-[#302B2B]">
                        Quarterly
                    </button>
                </div>
            </div>

            <div  className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Daily Duration
                </p>
                <div className="flex flex-col gap-4">
                    <div className="flex w-[100%] items-center justify-between border-2 border-[#95949480] rounded-lg p-2 outline-none focus:shadow-xl shadow-lg font-[400]" onClick={openStartDate}>
                        <p className="text-[#1E1E1E99] opacity-60 text-[18px] font-[400]">
                            Start date
                        </p>
                        <CgCalendarDates className="text-[#440080] w-[16px] h-[16px]" /> 
                        <input type="date" name="start_date" ref={startDateRef} id="start_date" className="hidden" />
                    </div>
                    <div className="flex w-[100%] items-center justify-between relative border-2 border-[#95949480] rounded-lg p-2 outline-none focus:shadow-xl shadow-lg font-[400]" onClick={openEndDate}>
                        <p className="text-[#1E1E1E99] opacity-60 text-[18px] font-[400]">
                            End date
                        </p>
                        <CgCalendarDates className="text-[#440080] w-[16px] h-[16px]" /> 
                        <input type="date" ref={endDateRef} name="end_date" id="end_date" className="hidden" />
                    </div>
                </div>
                <p className="text-[18px] text-[#1E1E1E99] font-[400] mt-[10px]">
                    Set until this savings group last
                </p>
            </div>
        </form>
    )
}

export default SecondOpenGroupForm