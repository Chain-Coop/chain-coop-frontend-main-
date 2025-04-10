import { Typography } from "@material-tailwind/react"

interface Props {
    name: string;
    userType: string;
    status: string;
    amount: string;
    index: number;
}

const Members_Template = ({ amount, index, name, status, userType }: Props) => {
    return (
        <li
            key={`${name}-${index}`}
            className="flex w-[100%] flex-col gap-2 rounded-lg border border-[#93909080] bg-[#F6EFF7] px-4 py-2"
            >
            <div className="flex w-[100%] items-center justify-between">
                <h4 className="text-[18px] font-[500] tracking-tighter text-[#1E1E1E]">
                {name}{" "}
                <span className="capitalize">({userType})</span>
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
                    {status}: {amount}
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
                <Typography className="font-asap text-[14px] font-[400] tracking-tighter text-[#1E1E1E99]">
                4 minutes ago
                </Typography>
            </div>
            </li>
    )
}

export default Members_Template