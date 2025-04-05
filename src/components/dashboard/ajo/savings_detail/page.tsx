import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import { MdOutlineArrowBackIos } from "react-icons/md";
import { GrFormNext } from "react-icons/gr";
import ProgressCircle from "../components/progress_circle";
import { BsPatchCheck } from "react-icons/bs";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import sampleImage from "../../../../Assets/png/dashboard/ajo/sample_savings_image.png"
import icon from "../../../../Assets/svg/dashboard/ajo/details_icon.svg"
import currency_icon from "../../../../Assets/svg/dashboard/ajo/currency_icon.svg"
import { IoIosArrowBack } from "react-icons/io";
import { DashboardHeader } from "../../../common/DashboardHeader";


const SavingsDetail = () => {
    const { name } = useParams()

    const firstSavingsData = [
        {
            key: "Daily Deposit",
            value: "$10",
            addition: "(optional)"
        },
        {
            key: "Start Date",
            value: "(27/03/2025)",
            addition: ""
        },
        {
            key: "End Date",
            value: "Ends in 30 days",
            addition: "(27/04/2025)"
        },
        {
            key: "Daily Duration",
            value: "Everyday",
            addition: ""
        }
    ]

    const lastSavingsData = [
        {
            key: "Savings Frequency",
            value: "Daily",
        },
        {
            key: "Currency/Token",
            value: "USD",
            image: currency_icon
        }
    ]

    const membersData = [
        {
            name: "John Doe",
            amount: "$20",
            userType: "member",
            status: "Joined"
        },
        {
            name: "Jane Doe",
            amount: "$30",
            userType: "member",
            status: "Funded"
        },
        {
            name: "Mark Doe",
            amount: "$0",
            userType: "member",
            status: "Joined"
        }
    ]

    const navigate = useNavigate()

    // function to navigate back
    const handleBackClick = () => {
        navigate(-1)
    }


    return (
        <main  className="flex flex-col font-sans mb-[20px] ">
            <DashboardHeader
                    className="relative cursor-pointer items-center lg:mt-[2em]"
                    onClick={handleBackClick}
                    >
            <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
            <div className="flex flex-grow items-center justify-center">
                <div className="tracking-wide">{name}</div>
            </div>
            </DashboardHeader>


           {/* SAVINGS INTRO AND HEADER */}
            <section className="flex justify-between gap-2 p-4 bg-[#ECE6F240] mt-[10px]">
                <img src={sampleImage} alt={name} className="w-[160px] rounded-lg flex-shrink-0" />
                <div className="flex w-[100%] flex-col gap-2 text-[#1E1E1EB2]">
                    <div className="w-[100%] flex justify-between items-center sm:items-start">
                        <img src={sampleImage} alt={name} className="w-[70px] h-[50px] rounded-lg sm:flex-shrink-0" />
                        <div className="flex flex-col items-start gap-1">
                            <h2 className="font-[600] text-[22px] lg:text-[24px] text-[#1E1E1E] tracking-tight">
                                {name}
                            </h2>
                            <Link to={`/leadership-board/{name}`} className="flex sm:gap-1 items-center">
                                <img src={icon} alt="leadership board" className="hidden sm:block w-[14px] h-[14px]" />
                                <Typography className="text-[12px] font-[600] text-[#565454]">
                                    View leadership board
                                </Typography>
                                <GrFormNext className="text-[#440080] text-[16px]" />
                            </Link>
                        </div>
                        <ProgressCircle progress={5} />
                    </div>
                    <Typography className="font-[400] text-[16px] leading-tight tracking-wide">
                    alialiquam vel elementum facilisis amet netus elementum. Quam mauris diam pretium etiam pellentesque accumsan. Enim nisl sit interdum id vivamus nibh lacus s feug.
                    </Typography>
                </div>
            </section>

            <section className="flex w-[100%] flex-col items-center justify-center bg-[#FFF7FC] p-4">
                <Typography className="font-[400] text-[14px] leading-tight tracking-wide">
                    Total saved
                </Typography>
                <h2  className="font-[600] text-[34px] lg:text-[36px] text-[#1E1E1E] tracking-tight">
                    $29,000.67
                </h2>
                <Button  className="bg-[#440080] text-[16px] lg:text-[18px] font-medium w-[100%] lg:w-[190px] px-6 h-[45px] rounded-md flex items-center justify-center text-white hover:bg-[#3D0073] mt-[30px] self-start">
                    Join
                </Button>
            </section>


            <ul className="flex flex-col w-[100%] mt-[20px]">

                {
                    firstSavingsData.map((data) => (
                        <li className="flex w-[96%] justify-between items-center pt-10 pb-4 border-b border-b-[#DDD8D887]" key={data.addition}>
                            <Typography className="text-[16px] lg:text-[18px] font-[500] text-[#939090] tracking-tight">
                                {data.key}
                            </Typography>
                            <Typography className="text-[16px] lg:text-[18px] font-[500] text-[#939090] tracking-tight">
                                <span className="text-black">{data.value}</span> {data.addition}
                            </Typography>
                        </li>
                    ))
                }
                
                {
                    lastSavingsData.map((data) => (
                        <li className="flex w-[96%] justify-between items-center pt-10 pb-4 border-b border-b-[#DDD8D887]" key={data.key}>
                            <Typography className="text-[16px] lg:text-[18px] font-[500] text-[#939090]">
                                {data.key}
                            </Typography>
                            <div className="border-2 border-[#440080] rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[150px] gap-1 justify-between">
                                {
                                    data.image && <img src={data.image} alt={data.key} className="w-[24px] h-[24px]" />
                                }
                                <Typography className="text-[14px] lg:text-[16px] font-[500] text-[#302B2B] pr-6">
                                    {data.value}
                                </Typography>
                                <BsPatchCheck className="text-[#440080] text-[24px]" />
                            </div>
                        </li>
                    ))
                }

                <li className="flex w-[96%] justify-between items-center pt-10 pb-4 border-b border-b-[#DDD8D887]">
                    <Typography className="text-[16px] lg:text-[18px] font-[500] text-[#939090]">
                        Withdrawal Day
                    </Typography>
                    <Typography className="text-[16px] lg:text-[18px] font-[500] text-black">
                        28/04/2025
                    </Typography>
                </li>
            </ul>

           {/* MEMBERS LIST */}
            <section className="flex flex-col gap-3 mt-[50px]">
                <div className="flex justify-between items-center pb-2 border-b-2 border-b-[#DDD8D880]">
                    <h3 className="font-[600] text-[18px] text-[#1E1E1E] tracking-tight">
                        Members (3)
                    </h3>
                    <Link to={`/ajo/${name}/members`} className="text-[#440080] text-[16px] font-[600] tracking-tight">
                        See all
                    </Link>
                </div>
                <ul className="flex flex-col gap-4 mt-[10px]">
                    {
                        membersData.map((data, index) => (
                            <li key={`${data.name}-${index}`} className="flex w-[100%] flex-col gap-2 bg-[#F6EFF7] border border-[#93909080] rounded-lg py-2 px-4">
                                <div className="w-[100%] flex justify-between items-center">
                                    <h4 className="text-[#1E1E1E] tracking-tighter text-[18px] font-[500]">
                                        {data.name} <span className="capitalize">({data.userType})</span>
                                    </h4>
                                    {
                                        data.status === "Joined" ? (
                                            <Typography className={`font-[500] txt-[13px] bg-[#E6B8D4] border border-[#CCA3BC] rounded-md min-w-[120px] py-1 text-center`}>
                                            {data.status}
                                        </Typography>
                                        ) : (
                                            <Typography className={`font-[500] txt-[13px] bg-[#E3D9EC] border border-[#44008080] text-[#440080] rounded-md min-w-[120px] py-1 text-center`}>
                                                {data.status}: {data.amount}
                                            </Typography>
                                        )
                                    }
                                </div>
                                <div className="flex w-[100%] justify-between items-center">
                                    <div className="flex flex-col items-start ">
                                        <Typography className="font-[400] text-[14px] text-[#959494] tracking-tighter">
                                            Total balance
                                        </Typography>
                                        <Typography className="text-[14px] font-[600] text-[#440080]">
                                            {data.amount}
                                        </Typography>
                                    </div>
                                    <Typography className="text-[14px] font-[400] text-[#1E1E1E99] tracking-tighter">
                                        4 minutes ago
                                    </Typography>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}

export default SavingsDetail