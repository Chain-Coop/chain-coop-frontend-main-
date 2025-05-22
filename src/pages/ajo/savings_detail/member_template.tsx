import { Typography } from "@material-tailwind/react";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

interface Props {
  name: string;
  userType: string;
  amount: string;
  index: number;
  progress: number;
  showDelete?: boolean;
}

const Members_Template = ({
  name,
  userType,
  amount,
  index,
  progress,
  showDelete = true,
}: Props) => {
  const [isDeleted, setIsDelete] = useState(false);

  if (isDeleted) return null;

  return (
    <li className="flex w-[100%] items-center justify-between rounded-md border border-[#93909080] bg-[#ECE6F240] p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#440080]">
          <Typography className="font-asap text-[16px] font-[600] text-white">
            {name.charAt(0).toUpperCase()}
          </Typography>
        </div>
        <div className="flex flex-col">
          <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#1E1E1E]">
            {name}
          </Typography>
          <Typography className="font-asap text-[14px] font-[400] tracking-normal text-[#959494]">
            {userType}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <Typography className="font-asap text-[16px] font-[600] tracking-tight text-[#440080]">
            {amount}
          </Typography>
          <div className="flex items-center gap-1">
            <div className="h-[4px] w-[50px] rounded-full bg-[#C5B0D8]">
              <div
                className="h-[4px] rounded-full bg-[#440080]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <Typography className="font-asap text-[12px] font-[400] tracking-tight text-[#1E1E1E]">
              {progress}%
            </Typography>
          </div>
        </div>
        {showDelete && (
          <button
            className="flex items-center gap-2 outline-none"
            onClick={() => setIsDelete(!isDeleted)}
          >
            <FaTrashAlt className="text-[14px] text-[#EC5246]" />
            <Typography className="font-asap text-[14px] font-[500] tracking-tighter text-[#1E1E1E]">
              Delete
            </Typography>
          </button>
        )}
      </div>
    </li>
  );
};

export default Members_Template;
