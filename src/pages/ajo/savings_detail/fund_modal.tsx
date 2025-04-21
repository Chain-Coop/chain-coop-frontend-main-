import { DialogHeader, Typography } from '@material-tailwind/react'
import { Dialog, DialogBody } from '@material-tailwind/react'
import React from 'react'
import { BsPatchCheck } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { FaAngleRight } from "react-icons/fa6";


import debitIcon from "../../../Assets/svg/dashboard/ajo/fund_debit.svg"
import walletIcon from "../../../Assets/svg/dashboard/ajo/fund_wallet.svg"
import { Link } from 'react-router-dom'

interface Props {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FundModal = ({ isOpen, setIsOpen }: Props) => {
    const data = [
        {
            icon: debitIcon,
            header: "Debit/Credit Card",
            text: "Fund with dollar cards",
            link: ""
        },
        {
            icon: walletIcon,
            header: "Pay with Chain Co-op wallet",
            text: "Fund with your existing balance",
            link: ""
        },
    ]


    return (
        <Dialog 
            open={isOpen} 
            size="xs"
            handler={() => setIsOpen(false)}
             className="flex flex-col items-center justify-center backdrop-brightness-75 backdrop-blur-sm py-4">
            <DialogHeader className='flex w-[100%] justify-center items-center relative'>
                <button onClick={() => setIsOpen(false)}  className="w-[30px] h-[30px] rounded-full bg-[#72889D1A] self-start flex items-center justify-center absolute left-4">
                        <IoClose className="text-[20px] text-[#430280]" />
                </button>
                <Typography 
                    variant='h2' 
                    className="font-asap text-[24px] font-[600] tracking-tighter text-[#440080]">
                    Fund Group Savings
                </Typography>
            </DialogHeader>
            <DialogBody className="flex w-[100%] flex-col items-center justify-center p-3 sm:p-6 rounded-xl bg-white">
                {
                    data.map((item, index) => (
                        <div className='flex w-[100%] items-center justify-between border-b border-[#1E1E1E30] last:border-0 py-2 last:pb-4' key={index}>
                            <div className='flex items-center gap-4'>
                                <div className='w-[40px] h-[40px] rounded-full bg-[#72889D1A] flex items-center justify-center'>
                                    <img src={item.icon} alt={item.header} className='w-[20px] h-[20px]' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <Typography variant='h4' className="font-asap text-[16px] font-[400] tracking-tight text-black">
                                        {item.header}
                                    </Typography>
                                    <Typography variant='paragraph' className="font-asap text-[12px] font-[400] tracking-normal text-[#546678]">
                                        {item.text}
                                    </Typography>
                                </div>
                            </div>
                            <Link to={item.link}>
                                <FaAngleRight className='text-[16px] text-black' />
                            </Link>
                        </div>
                    ))
                }
            </DialogBody>
        </Dialog>
    )
}

export default FundModal