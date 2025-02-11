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
} from "@material-tailwind/react";
import { MoveRight } from "lucide-react";

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
      className="overflow-y-auto py-3 font-sans"
    >
      <DialogHeader className="flex flex-col gap-2 px-2 text-center sm:px-4">
        <Typography variant="h1" className="text-2xl font-semibold">
          Change Card Pin
        </Typography>
      </DialogHeader>
      <DialogBody className="overflow-y-auto text-center text-black">
        <Typography variant="small" className="font-normal">
          Have you forgotten or lost your pin?
        </Typography>
        <Typography variant="small" className="font-normal">
          Click on the link below to generate an OTP to change pin.
        </Typography>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          onClick={handleGenerateOTP}
          disabled={isLoading}
          loading={isLoading}
          className="flex items-center gap-2 bg-transparent text-lg font-semibold normal-case text-text2 shadow-none"
        >
          {isLoading ? "Generating..." : "Generate OTP"}
          <MoveRight className="text-text2" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default GeneratePin;
