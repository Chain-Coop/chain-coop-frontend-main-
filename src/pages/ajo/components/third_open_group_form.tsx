import React from "react";
import { LuUpload } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { thirdOpenGroupType } from "../../../shared/types/types";

export interface ThirdOpenGroupFormProps {
  // Required props
  data: thirdOpenGroupType;
  currency: string;
  savings_frequency: string;
  total_saving_amount: string;
  setData: React.Dispatch<React.SetStateAction<thirdOpenGroupType>>;

  // Optional props
  maxDepositAmount?: number;
  minDepositAmount?: number;
  depositStep?: number;
  allowedImageTypes?: string[];
  maxImageSize?: number; // in bytes

  // Customization props
  className?: string;
  formClassName?: string;
  depositSectionClassName?: string;
  depositLabelClassName?: string;
  depositAmountClassName?: string;
  depositRangeClassName?: string;
  depositNoteClassName?: string;
  imageSectionClassName?: string;
  imageLabelClassName?: string;
  imageUploadClassName?: string;
  imageUploadIconClassName?: string;
  imageUploadTextClassName?: string;
  imagePreviewClassName?: string;
  removeImageButtonClassName?: string;
  termsSectionClassName?: string;
  termsCheckboxClassName?: string;
  termsTextClassName?: string;
  termsLinkClassName?: string;

  // Custom callbacks
  onDepositAmountChange?: (amount: string) => void;
  onImageUpload?: (file: File) => void;
  onImageRemove?: () => void;
  onTermsAgree?: (agreed: boolean) => void;
}

const ThirdOpenGroupForm: React.FC<ThirdOpenGroupFormProps> = ({
  data,
  currency,
  savings_frequency,
  total_saving_amount,
  setData,
  maxDepositAmount,
  minDepositAmount = 0,
  depositStep,
  allowedImageTypes = ["image/*"],
  maxImageSize,
  className = "",
  formClassName = "",
  depositSectionClassName = "",
  depositLabelClassName = "",
  depositAmountClassName = "",
  depositRangeClassName = "",
  depositNoteClassName = "",
  imageSectionClassName = "",
  imageLabelClassName = "",
  imageUploadClassName = "",
  imageUploadIconClassName = "",
  imageUploadTextClassName = "",
  imagePreviewClassName = "",
  removeImageButtonClassName = "",
  termsSectionClassName = "",
  termsCheckboxClassName = "",
  termsTextClassName = "",
  termsLinkClassName = "",
  onDepositAmountChange,
  onImageUpload,
  onImageRemove,
  onTermsAgree,
}) => {
  const max = maxDepositAmount || Number(total_saving_amount.replace(/,/g, "")) / 2;
  const step = depositStep || (currency === "₦" ? 100 : 10);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });

    if (name === "depositAmount") {
      onDepositAmountChange?.(value);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    // Validate file type
    if (!allowedImageTypes.some(type => file.type.match(type))) {
      console.error("Invalid file type");
      return;
    }

    // Validate file size
    if (maxImageSize && file.size > maxImageSize) {
      console.error("File too large");
      return;
    }

    setData((prev) => ({ ...prev, savings_image: file }));
    onImageUpload?.(file);

    // Reset input value to allow re-uploading the same file
    const fileInput = document.getElementById("savings_image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const resetImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setData((prev) => ({ ...prev, savings_image: null }));
    onImageRemove?.();
  };

  const handleButtonSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newAgreeState = !data.agree;
    setData({ ...data, agree: newAgreeState });
    onTermsAgree?.(newAgreeState);
  };

  return (
    <form className={`flex w-full flex-col items-center gap-6 ${formClassName} ${className}`}>
      <label
        htmlFor="depositAmount"
        className={`flex w-full flex-col gap-2 ${depositSectionClassName}`}
      >
        <span className={`text-lg font-semibold tracking-tighter ${depositLabelClassName}`}>
          {savings_frequency} Deposit
        </span>
        <div className="flex flex-col items-center gap-2">
          <span className={`text-2xl font-semibold text-[#1E1E1E] ${depositAmountClassName}`}>
            {currency} {Number(data.depositAmount).toLocaleString()}
          </span>
          <input
            autoFocus
            type="range"
            min={minDepositAmount.toString()}
            max={max.toString()}
            step={step.toString()}
            onChange={handleChange}
            value={data.depositAmount}
            name="depositAmount"
            id="depositAmount"
            className={`w-full cursor-pointer ${depositRangeClassName}`}
          />
        </div>
        <span className={`text-sm font-medium text-[#1E1E1E] ${depositNoteClassName}`}>
          This amount is not fixed, members deposit any amount until the target
          amount is achieved.
        </span>
      </label>

      <div className={`flex w-full flex-col gap-2 ${imageSectionClassName}`}>
        <div className="flex w-full items-center justify-between">
          <span className={`text-lg font-semibold tracking-tighter ${imageLabelClassName}`}>
            Upload Picture <span className="text-[#DDD8D8]">(Optional)</span>
          </span>
          {data.savings_image && (
            <button
              className={`flex -translate-y-1 items-center gap-1 self-end bg-transparent text-sm font-medium tracking-tighter text-red-500 ${removeImageButtonClassName}`}
              onClick={resetImage}
            >
              <FaTrashAlt className="text-sm text-red-500" /> Remove image
            </button>
          )}
        </div>
        <div
          className={`relative flex h-[160px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-black p-4 ${imageUploadClassName}`}
          tabIndex={0}
        >
          <div className={`z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#ECE6F2] ${imageUploadIconClassName}`}>
            <LuUpload className="text-xl text-[#440080]" />
          </div>
          <span className={`text-base font-medium text-[#1E1E1EB2] ${imageUploadTextClassName}`}>
            Choose file or{" "}
            <button className="text-[#440080]">use default</button>
          </span>
          <input
            type="file"
            name="savings_image"
            accept={allowedImageTypes.join(",")}
            id="savings_image"
            onChange={handleImageUpload}
            className="absolute left-0 top-0 z-20 h-full w-full cursor-pointer opacity-0"
          />
          {data.savings_image && (
            <img
              src={URL.createObjectURL(data.savings_image)}
              alt="Savings picture"
              className={`absolute left-0 top-0 h-full w-full object-cover ${imagePreviewClassName}`}
            />
          )}
        </div>
      </div>

      <div className={`flex items-start gap-2 self-start sm:items-center lg:self-center ${termsSectionClassName}`}>
        <button onClick={handleButtonSelection} className={termsCheckboxClassName}>
          {data.agree ? (
            <MdCheckBox className="text-2xl text-[#440080]" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-2xl text-[#1E1E1EB2]" />
          )}
        </button>
        <span className={`text-base font-medium text-[#1E1E1EB2] ${termsTextClassName}`}>
          I agree to the{" "}
          <span className={`font-semibold text-[#440080] ${termsLinkClassName}`}>Terms of Service</span>{" "}
          and <span className={`font-semibold text-[#440080] ${termsLinkClassName}`}>Privacy Policy</span>
        </span>
      </div>
    </form>
  );
};

export default ThirdOpenGroupForm;
