import { BsPatchCheck } from "react-icons/bs"
import { openGroupFormType } from "../../../shared/types/types"
import getDateDifferenceInDays from "../../../shared/utils/get_date_diff"
import formatAmountWithCommas from "../../../shared/utils/format_amount_with_commas"
import { Typography } from "@material-tailwind/react";


const ReviewOpenGroupForm = (data: openGroupFormType) => {
    const reviewData = {
        group_title: data.firstForm.savings_title,
        savings_desc: data.firstForm.savings_description,
        savings_currency: data.firstForm.savings_currency,
        daily_deposit: data.thirdForm.depositAmount,
        total_saving_amount: data.secondForm.total_saving_amount,
        saving_frequency: data.secondForm.savings_frequency,
        start_date: data.secondForm.start_date,
        end_date: data.secondForm.end_date,
        daily_duration: "Everyday (Ends in x days)",
        picture: data.thirdForm.savings_image
    }

    

    const secondReviewData = [
        {
            key: "Daily Deposit",
            value: data.thirdForm.depositAmount
        },
        {
            key: "Total Saving Amount",
            value: data.secondForm.total_saving_amount
        }
    ]

    const thirdReviewData = [
        {
            key: "Start Date",
            value: "",
            extra: data.secondForm.start_date
        },
        {
            key: "End date",
            value: "",
            extra: data.secondForm.end_date
        },
        {
            key: "Daily Duration",
            extra: "Everyday",
            value: `(Ends in ${getDateDifferenceInDays(data.secondForm.start_date, data.secondForm.end_date)} days)`
        }
    ]


    return (
        <section className="flex w-[100%]">
            <ul className="flex flex-col w-[100%] mt-[20px]">
                <li className="flex w-[98%] justify-between items-center pt-6 pb-4 border-b border-b-[#DDD8D887]" >
                    <Typography className="font-asap text-[16px] font-[500] text-[#1E1E1E] tracking-tight">
                        Group title
                    </Typography>
                    <Typography className="font-asap text-[16px] font-[600] text-[#1E1E1E] w-[50%] truncate text-right">
                        {reviewData.group_title}
                    </Typography>
                </li>

                {
                    reviewData.savings_desc !== "" && (
                        <li className="flex w-[98%] justify-between items-center pt-6 pb-4 border-b border-b-[#DDD8D887]" >
                            <Typography className="font-asap text-[16px] font-[500] text-[#1E1E1E] tracking-tight">
                                Description
                            </Typography>
                            <Typography className="font-asap text-[16px] font-[600] text-[#1E1E1E] w-[50%] truncate  text-right">
                                {reviewData.savings_desc}
                            </Typography>
                        </li>
                    )
                }
                
                <li className="flex w-[98%] justify-between items-center pt-6 pb-4 border-b border-b-[#DDD8D887]" >
                    <Typography  className="text-[16px] font-[500] text-[#1E1E1E] tracking-tight">
                        Currency/Token
                    </Typography>
                    <div className="border-2 border-[#440080] rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[150px] gap-1 justify-between">
                        <img src={data.firstForm.currency_image} alt={data.firstForm.savings_currency} className="w-[24px] h-[24px]" />
                        <Typography className="font-asap text-[14px] pr-8 font-[500] text-[#302B2B]">
                            {
                                reviewData.savings_currency === "₦" ? <>
                                    Naira
                                </> : <>
                                    {reviewData.savings_currency}
                                </>
                            }
                        </Typography>
                        <BsPatchCheck className="text-[#440080] text-[24px]" />
                    </div>
                </li>

                {
                    secondReviewData.map((data) => (
                        <li className="flex w-[98%] justify-between items-center pt-6 pb-4 border-b border-b-[#DDD8D887]" key={data.key}>
                            <Typography  className="text-[16px] font-[500] text-[#1E1E1E] tracking-tight">
                                {data.key}
                            </Typography>
                            <Typography className="font-asap text-[16px] font-[600] text-[#1E1E1E] tracking-tight">
                                {reviewData.savings_currency} {formatAmountWithCommas(data.value)}
                            </Typography>
                        </li>
                    ))
                }

                <li className="flex w-[98%] justify-between items-center pt-6 pb-4 border-b border-b-[#DDD8D887]" >
                    <Typography className="font-asap text-[16px] font-[500] text-[#1E1E1E] tracking-tight">
                        Savings Frequency
                    </Typography>
                    <div className="border-2 border-[#440080] rounded-lg bg-[#ECE6F2] p-2 flex items-center w-[150px] gap-1 justify-between">
                        <Typography className="font-asap text-[14px] font-[500] text-[#302B2B]">
                            {reviewData.saving_frequency}
                        </Typography>
                        <BsPatchCheck className="text-[#440080] text-[24px]" />
                    </div>
                </li>

                {
                    thirdReviewData.map((data) => (
                        <li className="flex w-[98%] justify-between items-center pt-6 pb-4 border-b border-b-[#DDD8D887]" key={data.key}>
                            <Typography className="font-asap text-[16px] font-[500] text-[#1E1E1E] tracking-tight">
                                {data.key}
                            </Typography>
                            <Typography className="font-asap text-[16px] font-[500] text-[#1E1E1E] tracking-tight">
                                {data.extra} <span className="opacity-70 text-[14px] tracking-normal">{data.value}</span>
                            </Typography>
                        </li>
                    ))
                }

                {
                    reviewData.picture && (
                        <li className="flex w-[98%] justify-between items-center pt-6 pb-4 border-b border-b-[#DDD8D887]">
                            <Typography className="font-asap text-[16px] font-[500] text-[#1E1E1E] tracking-tight">
                                Picture
                            </Typography>
                            <img src={URL.createObjectURL(reviewData.picture)} alt="savings picture" className="w-[66px] h-[60px] object-cover" />
                        </li>
                    )
                }
            </ul>
        </section>
    )
}

export default ReviewOpenGroupForm