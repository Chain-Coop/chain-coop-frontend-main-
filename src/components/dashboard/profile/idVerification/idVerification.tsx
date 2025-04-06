import { Typography } from "@material-tailwind/react";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import { TelPhone, Verified } from "../../../../Assets/svg";
import { IoIosArrowForward } from "react-icons/io";

const IdVerification = () => {
  const { profileDetails } = useUserProfile();
  return (
    <main className="mt-4 ">
      <header>
        <Typography
          variant="h5"
          className="text-md font-bold uppercase text-[#B3B3B3]"
        >
          id verification
        </Typography>
      </header>
      <hr className="mt-2 h-[1px] rounded-full bg-gray-200" />
      <section className="mt-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <TelPhone />
              <Typography className="font-semibold">Phone Number</Typography>
            </div>
            <Typography variant="small" className="text-gray-500">
              +234 8073 634 9058
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <Verified />
              <Typography className="text-gray-500">Verified</Typography>
            </div>
            <IoIosArrowForward size={20} className="text-black" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default IdVerification;
