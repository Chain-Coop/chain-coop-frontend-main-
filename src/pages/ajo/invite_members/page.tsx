import { useNavigate } from "react-router";
import { DashboardHeader } from "../../../components/common/DashboardHeader"
import { IoIosArrowBack } from "react-icons/io";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { membersData } from "../../../data/Data";
import Members_Template from "../components/members_template";


import inviteImage from "../../../Assets/png/dashboard/ajo/invite_members.png";
import rightArrow from "../../../Assets/svg/dashboard/ajo/right_arrow.svg";
import { useState } from "react";
import { Link } from "react-router-dom";



const InviteMembersPage = () => {
    const navigate = useNavigate()

    const [copied, setCopied] = useState(false)

    // function to navigate back
    const handleBackClick = () => {
        navigate(-1);
    };

    // function to copy referral link
    const copyLink = async () => {
        await navigator.clipboard.writeText("hello")
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <main className="flex flex-col font-asap gap-6 mb-[40px]">
            <DashboardHeader
                className="relative cursor-pointer items-center lg:mt-[2em]"
                onClick={handleBackClick}
                >
                <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
                <div className="flex flex-grow items-center justify-center">
                    <div className="tracking-wide">Public Group Members</div>
                </div>
            </DashboardHeader>

            <section className="mb-[20px] flex  flex-col gap-10">
                {/* INTRO IMAGE */}
                <section className="mt-8 flex w-[100%] items-center justify-center">
                <img
                    src={rightArrow}
                    alt="create new savings group"
                    className="h-[60px] hidden sm:block w-[80px] translate-x-6 self-end"
                />
                <img
                    src={inviteImage}
                    alt="create new savings group"
                    className="h-[215px] w-[100%] sm:w-[300px]"
                />
                <img
                    src={rightArrow}
                    alt="create new savings group"
                    className="h-[60px] w-[80px]  hidden sm:block -translate-x-6 self-start"
                />
                </section>

                {/* INTRO TEXT AND COPY BUTTON */}
                <section className="flex flex-col gap-4 self-start w-[100%]">
                    <Typography className="font-asap text-[16px] font-[400]">
                        <span className="font-[600]">
                            Note:
                        </span> Invite members into the group with the link below
                    </Typography>
                    <div className="flex border-2 shadow-lg rounded-lg border-[#95949480] bg-white gap-0 justify-between items-center pl-1">
                        <p className="text-[14px] px-1 truncate text-black w-[70%] text-center">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae delectus 
                        </p>
                        <Button 
                            className="bg-[#440080] rounded-md text-white text-[16px] shadow-none font-asap font-[500] px-5 capitalize whitespace-nowrap" 
                            onClick={copyLink}>
                            {
                                copied ? <>Copied!</> : <>Copy link</>
                            }
                        </Button>
                    </div>
                </section>

                {/* MEMBERS LIST */}
                <section className="flex flex-col gap-3">
                    <h3 className="text-[18px] font-[600] tracking-tight text-[#1E1E1E]">
                        Members ({membersData.length})
                    </h3>
                    <ul className="mt-[10px] flex flex-col gap-4">
                        {membersData.map((data, index) => (
                            <Members_Template amount={data.amount} index={index} name={data.name} status={data.status}  userType={data.userType} key={`${index}-${data.name}`} />
                        ))}
                    </ul>
                </section>
                <Link to={"/dashboard/ajo"} className="bg-[#440080] text-white text-[16px] w-[200px] h-[45px] rounded-md font-asap text-center flex items-center justify-center self-center">
                    Return back
                </Link>
            </section>
        </main>
    )
}

export default InviteMembersPage