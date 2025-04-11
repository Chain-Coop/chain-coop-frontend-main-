import { Typography } from "@material-tailwind/react"

interface Props {
    name: string;
    userType: string;
    status: string;
    amount: string;
    index: number;
    funded?: string;
    time?: string
}

const Members_Template = ({ amount, index, name, status, userType, funded, time }: Props) => {
    return (
        <li
            key={`${name}-${index}`}
            className="flex w-[100%] flex-col gap-3 rounded-lg border border-[#93909080] bg-[#F6EFF7] px-4 py-2"
            >
            <div className="flex w-[100%] items-center justify-between">
                <h4 className="text-[16px] font-[400] tracking-tighter text-[#1E1E1E]">
                {name}{" "}
                <span className={`capitalize font-[600] ${userType === "Admin" ? 'text-[#440080]' : 'text-black'}`}>({userType})</span>
                </h4>
                {status === "Joined" ? (
                <Typography
                    className={`txt-[13px] min-w-[120px] rounded-md border border-[#CCA3BC] bg-[#E6B8D4] py-1 text-center font-[500]`}
                >
                    {status}
                </Typography>
                ) : (
                <Typography
                    className={`txt-[13px] min-w-[120px] rounded-md border border-[#44008080] bg-[#E3D9EC] py-1 text-center font-[500] text-[#440080]`}
                >
                    {status}
                </Typography>
                )}
            </div>
            <div className="flex w-[100%] items-center justify-between">
                <div className="flex flex-col items-start ">
                <Typography className="font-asap text-[14px] font-[400] tracking-tighter text-[#959494]">
                    Total balance
                </Typography>
                <Typography className="font-asap text-[14px] font-[600] text-[#440080]">
                    {amount}
                </Typography>
                </div>
                {
                funded && time && (
                    <div className="flex flex-col gap-0">
                        <Typography className="font-asap text-[14px] font-[500] tracking-tight text-[#61C040]">
                            Funded {funded}
                        </Typography>
                        <Typography className="font-asap text-[13px] opacity-60 font-[400] tracking-tighter text-[#1E1E1E99]">
                            {time}
                        </Typography>
                    </div>
                )
                }
            </div>
            <div className="flex w-[100%] items-center gap-0">
                <div className="w-[50%] h-[7px] bg-[#C5B0D8] rounded-lg flex gap-0 items-center">
                    <div className="h-[7px] bg-[#440080] rounded-lg" style={{ width: "0%" }} />
                    <div className="w-[12px] h-[12px] -translate-x-1 bg-[#440080] rounded-full" />
                </div>
                <Typography className="font-asap text-[14px] opacity-70 font-[400] tracking-tighter text-[#1E1E1E99] px-1">
                    10% complete
                </Typography>
            </div>
        </li>
    )
}

export default Members_Template