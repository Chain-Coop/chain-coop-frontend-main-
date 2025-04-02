import React from "react";
import { LuUpload } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";


import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { thirdOpenGroupType } from "../../../../shared/types/types";


interface Props {
    data: thirdOpenGroupType, 
    setData: React.Dispatch<React.SetStateAction<thirdOpenGroupType>>
}

const ThirdOpenGroupForm = ({ data, setData }: Props) => {
    const handleChange= (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;
    
        const file = event.target.files[0];
        setData((prev) => ({ ...prev, savings_image: file }));

        // also manually reset the input value to allow for re-uploading the same file as the input value is not updated when the same file is selected again
        const fileInput = document.getElementById("savings_image") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const resetImage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setData((prev) => ({ ...prev, savings_image: null }));
    }

    const handleButtonSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setData({ ...data, agree: !data.agree })
    }

    return (
        <form className="flex flex-col gap-6 w-[100%] items-center">
            <label htmlFor="daily_deposit" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Daily Deposit
                </p>
                <div className="flex items-center gap-2 flex-col">
                    <p className="text-[32px] font-[600] text-[#1E1E1E]">
                        ${data.daily_deposit}
                    </p>
                    <input
                    autoFocus type="range" min="0" max="1000" step="10" onChange={handleChange} value={data.daily_deposit} name="daily_deposit" id="daily_deposit" className="w-full cursor-pointer" />
                </div>
                <p className="font-[500] text-[14px] text-[#1E1E1E99]">
                    This amount is not fixed, members deposit any amount until the target amount is achieved.
                </p>
            </label>

            <div className="flex flex-col gap-2 w-full lg:w-4/5">
                <div className="flex items-center justify-between w-full">
                    <p className="font-semibold text-[18px] text-black tracking-tighter">
                        Upload Picture <span className="text-[#DDD8D8]">(Optional)</span>
                    </p>
                    {
                        data.savings_image && (
                            <button className="text-red-500 font-[500] text-[14px] flex self-end -translate-y-1 tracking-tighter items-center gap-1" onClick={resetImage}>
                                <FaTrashAlt className="text-red-500 text-[14px]" /> Remove image
                            </button>
                        )
                    }
                </div>
                <div
                    className="w-[400px] p-4 flex items-center justify-center border-2 border-dashed border-black rounded-lg h-[160px] flex-col gap-2 relative cursor-pointer"
                    tabIndex={0}>
                    <div className="w-[50px] h-[50px] rounded-full bg-[#ECE6F2] flex items-center justify-center z-10">
                        <LuUpload className="text-[#440080] text-[20px]" />
                    </div>
                    <p className="font-medium text-[16px] text-[#1E1E1EB2]">
                        Choose file or <button className="text-[#440080]">use default</button>
                    </p>
                    <input
                        type="file"
                        name="savings_image"
                        accept="image/*"
                        id="savings_image"
                        onChange={handleImageUpload}
                        className="w-full h-full opacity-0 absolute z-20 left-0 top-0 cursor-pointer"
                    />
                    {
                        data.savings_image && (
                            <img src={URL.createObjectURL(data.savings_image)} alt="Savings picture" className="w-[100%] h-[100%] absolute top-0 left-0 object-cover" />
                        )
                    }
                </div>
            </div>


            <div className="flex items-center gap-2">
                <button  onClick={handleButtonSelection}>
                    {
                        data.agree ? (
                            <MdCheckBox className="text-[24px] text-[#440080]" />
                        ) : (
                            <MdCheckBoxOutlineBlank className="text-[24px] text-[#1E1E1EB2]" />
                        )
                    }
                </button>
                <p className="font-[500] text-[16px] text-[#1E1E1EB2]">
                    I agree to the <span className="text-[#440080] font-[600]">Terms of Service</span> and <span className="text-[#440080] font-[600]">Privacy Policy</span>
                </p>
            </div>
        </form>
    )
}

export default ThirdOpenGroupForm