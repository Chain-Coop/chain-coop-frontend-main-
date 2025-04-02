import { useRef } from "react";
import { CgCalendarDates } from "react-icons/cg";


import { secondOpenGroupType } from "../../../../shared/types/types";
import activeIcon from "../../../../Assets/svg/dashboard/ajo/selectedIcon.svg"

interface Props {
    data: secondOpenGroupType, 
    setData: React.Dispatch<React.SetStateAction<secondOpenGroupType>>
}

const SecondOpenGroupForm = ({ data, setData }: Props) => {
    const startDateRef = useRef<HTMLInputElement>(null)

    const endDateRef = useRef<HTMLInputElement>(null)

    const openStartDate = () => {
        startDateRef.current?.showPicker()
    }

    const openEndDate = () => {
        startDateRef.current?.showPicker()
    }

    const handleChange= (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleButtonSelection = (event: React.MouseEvent<HTMLButtonElement>, choice: string) => {
        event.preventDefault()
        setData({ ...data, savings_frequency: choice })
    }


    return (
        <form className="flex flex-col gap-6 w-[100%] items-center">
            <label htmlFor="total_saving_amount" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Total Saving Amount
                </p>
                <input autoFocus type="number" onChange={handleChange} value={data.total_saving_amount} name="total_saving_amount" id="total_saving_amount" className="text-[16px] border-2 border-[#95949480] rounded-lg py-2 px-4 outline-none focus:shadow-xl shadow-lg font-[400] text-[#1E1E1E99]" />
            </label>

            <div  className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Select Savings Frequency
                </p>                       
                <div className="w-[100%] flex flex-wrap justify-between gap-1 gap-y-3">
                    <button 
                        onClick={(event) => {handleButtonSelection(event, "Daily")}}
                        className={`border-2 rounded-lg bg-[#ECE6F2] p-2 flex hover:border-[#440080] items-center w-[150px] justify-between text-[16px] font-[600] tracking-tighter text-[#302B2B] ${data.savings_frequency === "Daily" ? 'border-[#440080]' : ''}`}>
                        <p>
                            Daily
                        </p>
                        {
                            data.savings_frequency === "Daily" && <img src={activeIcon} alt="Daily savings" className="w-[20px]" />
                        }
                    </button>
                    <button 
                        onClick={(event) => {handleButtonSelection(event, "Weekly")}}
                        className={`border-2 rounded-lg bg-[#ECE6F2] p-2 flex hover:border-[#440080] items-center w-[150px] justify-between text-[16px] font-[600] tracking-tighter text-[#302B2B] ${data.savings_frequency === "Weekly" ? 'border-[#440080]' : ''}`}>
                        <p>
                            Weekly
                        </p>
                        {
                            data.savings_frequency === "Weekly" && <img src={activeIcon} alt="Weekly savings" className="w-[20px]" />
                        }
                    </button>
                    <button 
                        onClick={(event) => {handleButtonSelection(event, "Monthly")}}
                        className={`border-2 rounded-lg bg-[#ECE6F2] p-2 flex hover:border-[#440080] items-center w-[150px] justify-between text-[16px] font-[600] tracking-tighter text-[#302B2B] ${data.savings_frequency === "Monthly" ? 'border-[#440080]' : ''}`}>
                        <p>
                            Monthly
                        </p>
                        {
                            data.savings_frequency === "Monthly" && <img src={activeIcon} alt="Monthly savings" className="w-[20px]" />
                        }
                    </button>
                    <button 
                        onClick={(event) => {handleButtonSelection(event, "Quarterly")}}
                        className={`border-2 rounded-lg bg-[#ECE6F2] p-2 flex hover:border-[#440080] items-center w-[150px] justify-between text-[16px] font-[600] tracking-tighter text-[#302B2B] ${data.savings_frequency === "Quarterly" ? 'border-[#440080]' : ''}`}>
                        <p>
                            Quarterly
                        </p>
                        {
                            data.savings_frequency === "Quarterly" && <img src={activeIcon} alt="Quarterly savings" className="w-[20px]" />
                        }
                    </button>
                </div>
            </div>

            <div  className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Daily Duration
                </p>
                <div className="flex flex-col gap-4">
                    <div className="flex w-[100%] items-center justify-between border-2 border-[#95949480] rounded-lg p-2 outline-none focus:shadow-xl shadow-lg font-[400] relative" onClick={openStartDate}>
                        <p className="text-[#1E1E1E99] opacity-60 text-[18px] font-[400]">
                            {data.start_date}
                        </p>
                        <CgCalendarDates className="text-[#440080] w-[16px] h-[16px]" /> 
                        <input type="date" name="start_date" onChange={handleChange} value={data.start_date} max={data.end_date} ref={startDateRef} id="start_date" className="opacity-0 absolute" />
                    </div>
                    <div className="flex w-[100%] items-center justify-between relative border-2 border-[#95949480] rounded-lg p-2 outline-none focus:shadow-xl shadow-lg font-[400]" onClick={openEndDate}>
                        <p className="text-[#1E1E1E99] opacity-60 text-[18px] font-[400]">
                            {data.end_date}
                        </p>
                        <CgCalendarDates className="text-[#440080] w-[16px] h-[16px]" /> 
                        <input type="date" ref={endDateRef} onChange={handleChange} value={data.end_date} min={data.start_date} name="end_date" id="end_date" className="opacity-0 absolute" />
                    </div>
                </div>
                <p className="text-[15px] text-[#1E1E1E99] font-[400] mt-[10px]">
                    Set until this savings group last
                </p>
            </div>
        </form>
    )
}

export default SecondOpenGroupForm