import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export interface MemberTemplateProps {
  // Required props
  name: string;
  userType: string;
  amount: string;
  index: number;
  progress: number;
  
  // Optional props
  showDelete?: boolean;
  
  // Customization props
  className?: string;
  avatarClassName?: string;
  avatarTextClassName?: string;
  nameClassName?: string;
  userTypeClassName?: string;
  amountClassName?: string;
  progressBarClassName?: string;
  progressFillClassName?: string;
  progressTextClassName?: string;
  deleteButtonClassName?: string;
  deleteIconClassName?: string;
  deleteTextClassName?: string;
  
  // Custom callbacks
  onDelete?: () => void;
  onAvatarClick?: () => void;
  onNameClick?: () => void;
}

const Members_Template: React.FC<MemberTemplateProps> = ({
  name,
  userType,
  amount,
  index,
  progress,
  showDelete = true,
  className = "",
  avatarClassName = "",
  avatarTextClassName = "",
  nameClassName = "",
  userTypeClassName = "",
  amountClassName = "",
  progressBarClassName = "",
  progressFillClassName = "",
  progressTextClassName = "",
  deleteButtonClassName = "",
  deleteIconClassName = "",
  deleteTextClassName = "",
  onDelete,
  onAvatarClick,
  onNameClick,
}) => {
  const [isDeleted, setIsDelete] = useState(false);

  const handleDelete = () => {
    setIsDelete(true);
    onDelete?.();
  };

  if (isDeleted) return null;

  return (
    <li className={`flex w-full items-center justify-between rounded-md border border-[#93909080] bg-[#ECE6F240] p-3 ${className}`}>
      <div className="flex items-center gap-3">
        <div 
          className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#440080] ${avatarClassName}`}
          onClick={onAvatarClick}
        >
          <span className={`font-asap text-[16px] font-[600] text-white ${avatarTextClassName}`}>
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col">
          <span 
            className={`font-asap text-[16px] font-[500] tracking-tight text-[#1E1E1E] ${nameClassName}`}
            onClick={onNameClick}
          >
            {name}
          </span>
          <span className={`font-asap text-[14px] font-[400] tracking-normal text-[#959494] ${userTypeClassName}`}>
            {userType}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className={`font-asap text-[16px] font-[600] tracking-tight text-[#440080] ${amountClassName}`}>
            {amount}
          </span>
          <div className="flex items-center gap-1">
            <div className={`h-[4px] w-[50px] rounded-full bg-[#C5B0D8] ${progressBarClassName}`}>
              <div
                className={`h-[4px] rounded-full bg-[#440080] ${progressFillClassName}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={`font-asap text-[12px] font-[400] tracking-tight text-[#1E1E1E] ${progressTextClassName}`}>
              {progress}%
            </span>
          </div>
        </div>
        {showDelete && (
          <button
            className={`flex items-center gap-2 outline-none ${deleteButtonClassName}`}
            onClick={handleDelete}
          >
            <FaTrashAlt className={`text-[14px] text-[#EC5246] ${deleteIconClassName}`} />
            <span className={`font-asap text-[14px] font-[500] tracking-tighter text-[#1E1E1E] ${deleteTextClassName}`}>
              Delete
            </span>
          </button>
        )}
      </div>
    </li>
  );
};

export default Members_Template;
