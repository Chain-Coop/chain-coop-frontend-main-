import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { MoveRight } from "lucide-react";
import { useUserProfile } from "../../../../../shared/Hooks/useUserProfile";
import { useAppDispatch } from "../../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../../shared/redux/store";
import { ResendVerifyOtp } from "../../../../../shared/redux/slices/landing.slices";

interface ChangePhoneNumberProps {
  isOpen: boolean;
  onClose: () => void;
  onOtpSent: () => void;
}

const ChangePhoneNumber: React.FC<ChangePhoneNumberProps> = ({
  isOpen,
  onClose,
  onOtpSent,
}) => {
  const { profileDetails } = useUserProfile();
  const phoneNumber = profileDetails?.phoneNumber;
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();

  const isPhoneNumberValid = !!phoneNumber;

  const handleGenerateOtp = async () => {
    if (!isPhoneNumberValid) {
      setError("No phone number found in your profile");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await dispatch(ResendVerifyOtp({ phoneNumber })).unwrap();
      toast.success(`OTP sent to ${phoneNumber}`);
      onOtpSent();
    } catch (error: any) {
      const errorMessage = error || "Failed to send OTP";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      open={isOpen}
      handler={onClose}
      size="sm"
      className="overflow-y-auto py-3"
      dismiss={{ enabled: false }}
    >
      <DialogHeader className="relative flex justify-center px-2 text-center sm:px-4">
        <div className="absolute left-2 top-2">
          <IconButton
            variant="text"
            color="gray"
            onClick={onClose}
            className="h-10 w-10 p-0 hover:bg-gray-100"
            disabled={isLoading}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            placeholder=""
          >
            <IoMdClose size={24} className="text-text2" />
          </IconButton>
        </div>
        <Typography variant="h5" className="text-2xl font-semibold">
          Update Phone Number
        </Typography>
      </DialogHeader>
      <DialogBody className="overflow-y-auto text-center text-black">
        {isPhoneNumberValid ? (
          <>
            <Typography className="font-normal">
              Click below to generate an OTP for your current phone number
            </Typography>
            <Typography className="mt-2 font-normal">
              OTP will be sent to {phoneNumber}
            </Typography>
          </>
        ) : (
          <Typography className="font-normal text-red-500">
            No phone number found in your profile. Please update your profile.
          </Typography>
        )}
        {error && (
          <Typography color="red" className="mt-2 text-sm">
            {error}
          </Typography>
        )}
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          onClick={handleGenerateOtp}
          disabled={isLoading || !isPhoneNumberValid}
          loading={isLoading}
          className="flex items-center gap-2 bg-transparent text-lg font-semibold normal-case text-text2 shadow-none"
        >
          Generate OTP
          <MoveRight className="text-text2" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ChangePhoneNumber;
