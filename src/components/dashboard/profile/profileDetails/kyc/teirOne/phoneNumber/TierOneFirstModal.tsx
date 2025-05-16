import React from "react";
import kyc from "../../../../../../../Assets/png/kyc/teir-one.png";
import { CircleArrow } from "../../../../../../../Assets/svg";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { SubmitKycTier2 } from "../../../../../../../shared/redux/slices/transaction.slices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../../../../../shared/redux/rootReducer";
import { AppDispatch } from "../../../../../../../shared/redux/store";
import { useUserProfile } from "../../../../../../../shared/Hooks/useUserProfile";

interface TierOneFirstModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBvnStepClick: () => void;
  isVerified: boolean;
}

const TierOneFirstModal: React.FC<TierOneFirstModalProps> = ({
  isOpen,
  onClose,
  onBvnStepClick,
  isVerified,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { kycTier2 } = useSelector((state: RootState) => state.transaction);
  const { profileDetails } = useUserProfile();

  const userId = profileDetails?.id;

  // const handleTier2Click = async () => {
  //   try {
  //     const result = await dispatch(SubmitKycTier2(userId)).unwrap();
  //     if (result.redirectUrl) {
  //       navigate(result.redirectUrl);
  //     }
  //   } catch (error) {
  //     console.error("KYC Tier 2 submission failed:", error);
  //   }
  // };

  return (
    <Dialog size="sm" open={isOpen} handler={onClose} className="bg-white">
      <DialogHeader className="relative justify-center pt-10">
        <IconButton
          variant="text"
          color="gray"
          onClick={onClose}
          className="absolute left-2 top-2 h-10 w-10 min-w-[40px] p-0 hover:bg-gray-100"
          ripple={false}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <IoMdClose size={24} className="m-auto text-gray-700" />
        </IconButton>
        <div className="flex w-full justify-center">
          <img
            src={kyc}
            alt="kyc"
            className="h-[5em] w-[5em] object-contain sm:h-[7em] sm:w-[7em] md:h-[8em] md:w-[8em]"
          />
        </div>
      </DialogHeader>

      <DialogBody className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <header className="text-center">
            <Typography
              variant="h4"
              className="text-base font-bold leading-tight text-black sm:text-sm md:text-lg"
            >
              Complete the Tier 0 for KYC Verification
            </Typography>
          </header>
          <article className="px-2 text-center sm:px-3">
            <Typography variant="small" className="font-medium text-black">
              Please submit these documents to verify your profile
            </Typography>
          </article>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4  shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
            <div className="flex flex-col gap-1">
              <Typography
                variant="h6"
                className="text-sm font-bold text-gray-900"
              >
                {isVerified ? "Current Limit" : "Manage Limit"}
              </Typography>
              <Typography
                variant="small"
                className="text-xs font-normal text-gray-500"
              >
                Daily Transaction Limit: {isVerified ? "N20,000" : "N0.00"}
              </Typography>
            </div>
            <div className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600">
              Upgrade
            </div>
          </div>

          <div
            className={`flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] ${
              !isVerified ? "cursor-pointer" : ""
            }`}
          >
            <div className="flex flex-col gap-1">
              <Typography
                variant="h6"
                className="text-sm font-bold text-gray-900"
              >
                Teir 0
              </Typography>
              <Typography
                variant="small"
                className="text-xs font-normal text-gray-500"
              >
                Upload your Phone number
              </Typography>
            </div>
            {isVerified ? (
              <div className="rounded bg-green-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600">
                Done
              </div>
            ) : (
              <button className="rounded-full bg-gray-100 p-2">
                <CircleArrow />
              </button>
            )}
          </div>

          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4  shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] ">
            <div className="flex flex-col gap-1">
              <Typography
                variant="h6"
                className="text-sm font-bold text-gray-900"
              >
                Teir 2
              </Typography>
              <Typography
                variant="small"
                className="text-xs font-normal text-gray-500"
              >
                Upload your ID or Passport
              </Typography>
            </div>
            <button
              // onClick={handleTier2Click}
              className="rounded-full bg-gray-100 p-2"
            >
              <CircleArrow />
            </button>
          </div>

          <div
            className={`flex w-full items-center justify-between rounded-lg border border-gray-200 p-4  shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] ${
              !isVerified ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onClick={isVerified ? onBvnStepClick : undefined}
          >
            <div className="flex flex-col gap-1">
              <Typography
                variant="h6"
                className="text-sm font-bold text-gray-900"
              >
                Teir 3
              </Typography>
              <Typography
                variant="small"
                className="text-xs font-normal text-gray-500"
              >
                Upload your BVN
              </Typography>
            </div>
            <button className="rounded-full bg-gray-100 p-2">
              <CircleArrow />
            </button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default TierOneFirstModal;
