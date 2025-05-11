import { Typography } from "@material-tailwind/react";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import {
  BvnVerified,
  NotVerified,
  TelPhone,
  Verified,
} from "../../../../Assets/svg";
import { IoIosArrowForward } from "react-icons/io";
import { RootState } from "../../../../shared/redux/rootReducer";
import { useAppSelector } from "../../../../shared/redux/reduxHooks";

const IdVerification = () => {
  const { getProfile } = useAppSelector((state: RootState) => state.landing);

  const isUserVerified =
    getProfile?.Tier === 1 && getProfile?.isVerified === true;

  const isBvnVerified = getProfile?.Tier === 2;

  return (
    <main className="mt-4">
      <header>
        <Typography
          variant="h5"
          className="text-md font-bold uppercase text-[#B3B3B3]"
        >
          id verification
        </Typography>
      </header>
      <hr className="mt-2 h-[1px] rounded-full bg-gray-200" />

      <section className="mt-3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <TelPhone />
              <Typography className="font-semibold">Phone Number</Typography>
            </div>
            <Typography variant="small" className="text-gray-500">
              {getProfile?.phoneNumber}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isUserVerified ? (
                <>
                  <Verified />
                  <Typography className="text-gray-500">Verified</Typography>
                </>
              ) : (
                <>
                  <NotVerified />
                  <Typography className="text-gray-500">
                    Not Verified
                  </Typography>
                </>
              )}
            </div>
            <IoIosArrowForward size={20} className="text-black" />
          </div>
        </div>

        <hr className="h-[1px] rounded-full bg-gray-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BvnVerified />
            <Typography className="font-semibold">BVN</Typography>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isBvnVerified ? (
                <>
                  <Verified />
                  <Typography className="text-gray-500">Verified</Typography>
                </>
              ) : (
                <>
                  <NotVerified />
                  <Typography className="text-gray-500">
                    Not Verified
                  </Typography>
                </>
              )}
            </div>
            <IoIosArrowForward size={20} className="text-black" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default IdVerification;
