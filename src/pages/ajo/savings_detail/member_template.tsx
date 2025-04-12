import { Typography } from "@material-tailwind/react"
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";


interface Props {
    name: string;
    userType: string;
    amount: string;
    index: number;
    progress: number;
}

const Members_Template = ({ amount, index, name, userType, progress }: Props) => {
    // state to control the delete button
    const [isDeleted, setIsDelete] = useState(false)

     return isDeleted ? (
        <></>
        ) : (
        <li
            key={`${name}-${index}`}
            className="flex w-[100%] justify-between items-center gap-4">
            <div
                className="flex w-[100%] flex-col gap-3 rounded-lg border border-[#93909080] bg-[#F6EFF7] px-4 py-2"
                >
                <div className="flex w-[100%] items-start justify-between">
                    <h4 className="text-[16px] font-[400] tracking-tighter text-[#1E1E1E]">
                    {name}{" "}
                    <span className={`capitalize font-[600] ${userType === "Admin" ? 'text-[#440080]' : 'text-black'}`}>({userType})</span>
                    </h4>
                    <div className="flex flex-col gap-2 items-end">
                        <Typography className="font-asap text-[14px] opacity-70 font-[400] tracking-tighter text-[#1E1E1E]">
                            Total goal saved
                        </Typography>
                        <Typography className="font-asap text-[14px] font-[600] tracking-tighter text-[#440080]">
                            {amount}
                        </Typography>
                    </div>
                </div>
                <div className="flex w-[100%] items-center gap-0">
                    <div className="w-[50%] h-[7px] bg-[#C5B0D8] rounded-lg flex gap-0 items-center">
                        {
                            progress > 0 && <div className="h-[7px] bg-[#440080] rounded-lg" style={{ width: `${progress}%` }} />
                        }
                        {
                            progress > 0 && <div className="w-[12px] h-[12px] -translate-x-1 bg-[#440080] rounded-full" />
                        }
                    </div>
                    <Typography className="font-asap text-[14px] opacity-70 font-[400] tracking-tighter text-[#1E1E1E] px-1">
                        {progress}% complete
                    </Typography>
                </div>
            </div>
            <button 
                className="outline-none flex items-center gap-2"
                onClick={() => setIsDelete(!isDeleted)}>
                <FaTrashAlt className="text-[14px] text-[#EC5246]" />
                <Typography className="font-asap text-[14px] font-[500] tracking-tighter text-[#1E1E1E]">
                    Delete
                </Typography>
            </button>
        </li>
    )
}

export default Members_Template