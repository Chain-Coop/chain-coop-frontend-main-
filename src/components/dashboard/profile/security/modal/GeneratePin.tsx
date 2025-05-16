//@ts-nocheck
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GeneratePinOTP } from "../../../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../../../shared/redux/store";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Button,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { MoveRight } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { useAppSelector } from "../../../../../shared/redux/reduxHooks";
import { useUserProfile } from "../../../../../shared/Hooks/useUserProfile";

interface GeneratePinModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onOtpGenerated: () => void;
}

const GeneratePin = ({
  isOpen,
  onClose,
  onOtpGenerated,
}: GeneratePinModalProps) => {
  const { profileDetails } = useUserProfile();
  const isPinCreated = profileDetails?.isPinCreated || false;

  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleGenerateOTP = async () => {
    setIsLoading(true);
    try {
      await dispatch(GeneratePinOTP()).unwrap();
      onOtpGenerated();
    } catch (message) {
      console.error("Failed to generate OTP", message);
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
      className="overflow-y-auto py-3 "
      dismiss={{ enabled: false }}
    >
      <DialogHeader className="relative flex justify-center px-2 text-center sm:px-4">
        <div className="absolute left-2 top-2">
          <IconButton
            variant="text"
            color="gray"
            onClick={onClose}
            className="h-10 w-10 p-0 hover:bg-gray-100"
          >
            <IoMdClose size={24} className="text-text2" />
          </IconButton>
        </div>
        <Typography variant="h1" className="text-2xl font-semibold">
          {isPinCreated ? "Change Card Pin" : "Set Card Pin"}
        </Typography>
      </DialogHeader>
      <DialogBody className="overflow-y-auto text-center text-black">
        <Typography className="font-normal">
          {isPinCreated
            ? "Have you forgotten or lost your PIN?"
            : "You haven't set a PIN yet."}
        </Typography>
        <Typography className="font-normal">
          Click on the link below to generate an OTP to{" "}
          {isPinCreated ? "change your PIN" : "set your PIN"}.
        </Typography>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          onClick={handleGenerateOTP}
          disabled={isLoading}
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

export default GeneratePin;
