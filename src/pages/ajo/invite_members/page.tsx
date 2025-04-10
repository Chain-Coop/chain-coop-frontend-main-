import { useNavigate } from "react-router";
import { DashboardHeader } from "../../../components/common/DashboardHeader"
import { IoIosArrowBack } from "react-icons/io";

const InviteMembersPage = () => {
    const navigate = useNavigate()
    // function to navigate back to ajo page
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <main className="flex flex-col font-sans  gap-8 mb-[40px]">
            <DashboardHeader
                className="relative cursor-pointer items-center lg:mt-[2em]"
                onClick={handleBackClick}
                >
                <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
                <div className="flex flex-grow items-center justify-center">
                    <div className="tracking-wide">Public Group Members</div>
                </div>
            </DashboardHeader>
        </main>
    )
}

export default InviteMembersPage