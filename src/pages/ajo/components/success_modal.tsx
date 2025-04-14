import { Link } from "react-router-dom"
import { IoClose } from "react-icons/io5";
import { BsPatchCheck } from "react-icons/bs";
import { Dialog, DialogBody, Typography } from "@material-tailwind/react";
import { FaChevronRight } from "react-icons/fa";


const SuccessModal = () => {
    return (
        <Dialog open size="xs" className="flex items-center justify-center backdrop-brightness-75 backdrop-blur-sm">
            <DialogBody className="flex w-[100%] flex-col items-center justify-center p-6 rounded-xl bg-white">
                <Link to={'/dashboard/ajo'} className="w-[30px] h-[30px] rounded-full bg-[#72889D1A] self-start flex items-center justify-center">
                    <IoClose className="text-[20px] text-[#430280]" />
                </Link>
                <BsPatchCheck className="text-[70px] text-[#61C040]" />
                <Typography  variant="paragraph" className="font-asap text-[16px] font-[600] my-3">
                    Group successfully created
                </Typography>
                <Typography variant="paragraph" className="font-asap text-[16px] font-[700] flex items-center gap-1 text-[#440080]">
                    Invite members <span><FaChevronRight /></span>
                </Typography>
            </DialogBody>
        </Dialog>
    )
}

export default SuccessModal