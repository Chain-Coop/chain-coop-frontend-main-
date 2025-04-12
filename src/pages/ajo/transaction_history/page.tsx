import { IoIosArrowBack } from "react-icons/io"
import { DashboardHeader } from "../../../components/common/DashboardHeader"
import { useNavigate, useParams } from "react-router";
import { Typography } from "@material-tailwind/react";
import { transactionData } from "../../../data/Data";
import { format } from "date-fns";

const TransactionHistoryPage = () => {
    const { name } = useParams();

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
                <div className="tracking-wide">{name}</div>
                </div>
            </DashboardHeader>

            <h3 className="text-[20px] font-[600] tracking-tight text-[#1E1E1E] mt-4">
                Transaction history
            </h3>
            <section className="flex flex-col gap-4 w-[100%]">
                <Typography className="text-[18px] font-asap font-[600] tracking-tight text-[#1E1E1E]">
                    All ({transactionData.length})
                </Typography>
                <ul className="flex flex-col gap-3 w-[100%] flex-wrap 3xl:flex-row">
                    {
                        transactionData.map((transaction, index) => (
                            <li
                                key={index}
                                className="w-[100%] 3xl:w-[48%] flex flex-col gap-3 bg-[#F6EFF7] border border-[#93909080] rounded-md p-3">
                                <div className="w-[100%] flex items-center justify-between">
                                    <Typography className="text-[18px] font-asap font-[500] tracking-tight text-[#1E1E1E]">
                                        {transaction.name}
                                    </Typography>
                                    <Typography className="text-[16px] font-asap font-[500] tracking-tight text-[#1E1E1E] opacity-60">
                                        by: {transaction.user}
                                    </Typography>
                                </div>
                                <div className="w-[100%] flex items-center justify-between">
                                    <Typography className="text-[14px] font-asap font-[400] tracking-normal text-[#959494]">
                                        Deposit
                                    </Typography>
                                    <Typography className="text-[16px] font-asap font-[600] tracking-tight text-[#61C040]">
                                        +{transaction.deposit}
                                    </Typography>
                                </div>
                                <div className="w-[100%] flex items-center justify-between">
                                    <Typography className="text-[14px] font-asap font-[400] tracking-normal text-[#959494]">
                                        Total balance
                                    </Typography>
                                    <Typography className="text-[16px] font-asap font-[600] tracking-tight text-[#440080]">
                                        +{transaction.total}
                                    </Typography>
                                </div>
                                <div className="w-[100%] flex items-center justify-between">
                                    <Typography className="text-[14px] font-asap font-[400] tracking-normal text-[#959494]">
                                        {
                                            format(new Date(transaction.date), "dd/MM/yyyy, hh:mmaaa").toLowerCase()
                                        }
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

export default TransactionHistoryPage