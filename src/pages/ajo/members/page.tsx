import { IoIosArrowBack } from "react-icons/io"
import { DashboardHeader } from "../../../components/common/DashboardHeader"
import { useNavigate } from "react-router";
import { membersData } from "../../../data/Data";
import { Typography } from "@material-tailwind/react";
import { format, formatDistanceToNow } from "date-fns"
import { formatRelativeTime } from "../../../shared/utils/format";


const MembersPage = () => {
    const navigate = useNavigate()
        
    // function to navigate back
    const handleBackClick = () => {
        navigate(-1);
    };    

    return (
        <main className="mb-[40px] flex  font-asap  flex-col gap-6">
            <DashboardHeader
                className="relative cursor-pointer items-center lg:mt-[2em]"
                onClick={handleBackClick}>
                <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
                <div className="flex flex-grow items-center justify-center">
                <div className="tracking-wide">Members</div>
                </div>
            </DashboardHeader>

            <h3 className="text-[20px] font-[600] tracking-tight text-[#1E1E1E] mt-4">
                All Members ({membersData.length})
            </h3>

            <ul className="flex flex-col gap-3 w-[100%] flex-wrap 3xl:flex-row">
                {
                    membersData.map((member, index) => (
                        <li 
                            key={index}
                            className="w-[100%] 3xl:w-[48%] flex flex-col gap-3 bg-[#ECE6F240] border border-[#93909080] rounded-md p-3">
                            <div className="w-[100%] flex items-center justify-between">
                                <Typography className="text-[18px] font-asap font-[500] tracking-tight text-[#1E1E1E]">
                                    {member.name}
                                </Typography>
                                <Typography className={`${member.userType === "Admin" ? "bg-[#F1A4FF] border border-[#CCA3BC]" : "bg-[#E6B8D4] border border-[#CCA3BC]"} text-[15px] rounded-md px-4 py-1 font-asap font-[500] w-[85px] tracking-tight text-[#1E1E1E] opacity-85`}>
                                    {member.userType}
                                </Typography>
                            </div>
                            <div className="w-[100%] flex items-center justify-between">
                                <Typography className="text-[14px] font-asap font-[400] tracking-normal text-[#959494]">
                                    Total balance
                                </Typography>
                                <Typography className="text-[16px] font-asap font-[600] tracking-tight text-[#440080]">
                                    +{member.total}
                                </Typography>
                            </div>
                            <div className="w-[100%] flex items-center justify-between">
                                <Typography className="text-[14px] font-asap font-[400] tracking-normal text-[#959494]">
                                    Joined
                                </Typography>
                                <Typography className="text-[14px] font-asap font-[500] tracking-tight text-black">
                                    {
                                        format(new Date(member.joined), "dd MMM, yyyy")
                                    }
                                </Typography>
                            </div>
                            <div className="w-[100%] flex items-center justify-between">
                                <Typography className="text-[14px] font-asap font-[400] tracking-normal text-[#959494]">
                                    Next deposit
                                </Typography>
                                <Typography className="text-[14px] font-asap font-[500] tracking-tight text-black first-letter:capitalize">
                                    {
                                        formatRelativeTime(member.next_deposit)
                                    }
                                </Typography>
                            </div>
                            <div className="w-[100%] flex items-center justify-between">
                                <Typography className="text-[14px] font-asap font-[400] tracking-normal text-[#959494]">
                                    Last deposit
                                </Typography>
                                <Typography className="text-[14px] font-asap font-[500] tracking-tight text-black first-letter:capitalize">
                                    {
                                        formatRelativeTime(member.last_deposit)
                                    }
                                </Typography>
                            </div>
                            <div className="flex flex-col gap-0">
                                <Typography className="text-[14px] font-asap font-[400] tracking-normal text-[#959494]">
                                    Savings status
                                </Typography>
                                <div className="flex w-[100%] items-center gap-0">
                                    <div className="w-[50%] h-[7px] bg-[#C5B0D8] rounded-lg flex gap-0 items-center">
                                        {
                                            member.progress > 0 && <div className="h-[7px] bg-[#440080] rounded-lg" style={{ width: `${member.progress}%` }} />
                                        }
                                        {
                                            member.progress > 0 && <div className="w-[12px] h-[12px] -translate-x-1 bg-[#440080] rounded-full" />
                                        }
                                    </div>
                                    <Typography className="font-asap text-[14px] opacity-70 font-[400] tracking-tighter text-[#1E1E1E] px-1">
                                        {member.progress}% complete
                                    </Typography>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

export default MembersPage