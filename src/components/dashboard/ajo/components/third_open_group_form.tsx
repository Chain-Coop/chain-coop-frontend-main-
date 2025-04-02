import { LuUpload } from "react-icons/lu";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";



const ThirdOpenGroupForm = () => {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;
    
        const key = event.target.name; 
        const file = event.target.files[0];
    }

    return (
        <form className="flex flex-col gap-6 w-[100%] items-center">
            <label htmlFor="group_amount" className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Daily Deposit
                </p>
                <input autoFocus type="number" name="group_amount" id="group_amount" className="text-[16px] border-2 border-[#95949480] rounded-lg py-2 px-4 outline-none focus:shadow-xl shadow-lg font-[400] text-[#1E1E1E99]" />
                <p className="font-[500] text-[14px] text-[#1E1E1E99]">
                    This amount is not fixed, members deposit any amount until the target amount is achieved.
                </p>
            </label>

            <div  className="flex flex-col gap-2 w-[100%] lg:w-[80%]">
                <p className=" font-[600] text-[18px] text-black tracking-tighter">
                    Upload Picture <span className="text-[#DDD8D8]">(Optional)</span>
                </p>           
                <div className="w-[400px] p-4 flex items-center justify-center border-2 border-dashed border-black rounded-lg h-[160px] flex-col gap-2 relative cursor-pointer" tabIndex={0}>
                    <div className="w-[50px] h-[50px] rounded-full bg-[#ECE6F2] flex items-center justify-center">
                        <LuUpload className="text-[#440080] text-[20px]" />
                    </div>
                    <p className="font-[500] text-[16px] text-[#1E1E1EB2]">
                        Choose file or <span className="text-[#440080]">use default</span>
                    </p>
                    <input type="file" name="savings_image" accept="image/*" id="savings_image" onChange={handleImageUpload} className="w-[100%] h-[100%] opacity-0 absolute z-10 left-0 top-0 cursor-pointer" />
                </div>
            </div>

            <label htmlFor="agree" className="flex items-center gap-2">
                <MdCheckBoxOutlineBlank className="text-[24px] text-[#1E1E1EB2]" />
                <MdCheckBox className="text-[24px] text-[#440080]" />
                <p className="font-[500] text-[16px] text-[#1E1E1EB2]">
                    I agree to the <span className="text-[#440080] font-[600]">Terms of Service</span> and <span className="text-[#440080] font-[600]">Privacy Policy</span>
                </p>
            </label>
        </form>
    )
}

export default ThirdOpenGroupForm