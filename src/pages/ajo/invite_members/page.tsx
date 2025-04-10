import { useNavigate } from "react-router";
import { DashboardHeader } from "../../../components/common/DashboardHeader"
import { IoIosArrowBack } from "react-icons/io";


import inviteImage from "../../../Assets/png/dashboard/ajo/invite_members.png";
import rightArrow from "../../../Assets/svg/dashboard/ajo/right_arrow.svg";
import { Typography } from "@material-tailwind/react";


const InviteMembersPage = () => {
    const navigate = useNavigate()
    // function to navigate back to ajo page
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <main className="flex flex-col font-asap gap-8 mb-[40px]">
            <DashboardHeader
                className="relative cursor-pointer items-center lg:mt-[2em]"
                onClick={handleBackClick}
                >
                <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
                <div className="flex flex-grow items-center justify-center">
                    <div className="tracking-wide">Public Group Members</div>
                </div>
            </DashboardHeader>

            <section className="mb-[20px] flex  flex-col gap-10 px-4 lg:px-6">
        {/* OPEN SAVINGS INTRO IMAGE */}
        <section className="mt-12 flex w-[100%] items-center justify-center">
            <img
                src={rightArrow}
                alt="create new savings group"
                className="h-[80px] w-[100px] translate-x-6 self-end"
            />
            <img
                src={inviteImage}
                alt="create new savings group"
                className="h-[215px] w-[300px]"
            />
            <img
                src={rightArrow}
                alt="create new savings group"
                className="h-[80px] w-[100px] -translate-x-6 self-start"
            />
            </section>
            <Typography className="font-asap text-[16px] font-[400] lg:text-[18px]">
                <span className="font-[600]">
                    Note:
                </span> Invite members into the group with the link below
            </Typography>
        </section>
        </main>
    )
}

export default InviteMembersPage