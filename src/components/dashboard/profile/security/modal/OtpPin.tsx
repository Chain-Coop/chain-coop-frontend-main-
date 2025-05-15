import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../shared/redux/store";
import OtpInput from "../../../../../shared/utils/OtpInput";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { VerifyUserAuth } from "../../../../../shared/redux/slices/landing.slices";
import { useUserProfile } from "../../../../../shared/Hooks/useUserProfile";

interface OtpPinProps {
  isOpen: boolean;
  onNext: (otp: string) => void;
  onClose?: () => void;
}

const OtpPin = ({ isOpen, onNext, onClose }: OtpPinProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { profileDetails } = useUserProfile();

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const resultAction = await dispatch(
        VerifyUserAuth({
          email: profileDetails?.email || "",
          otp,
        }) as any,
      );

      if (VerifyUserAuth.fulfilled.match(resultAction)) {
        toast.success("OTP verified successfully");
        onNext(otp);
      } else {
        setError(resultAction.payload || "Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      setError(error.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      handler={onClose || (() => {})}
      animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}
      size="sm"
      className="overflow-y-auto p-7"
      dismiss={{ enabled: false }}
    >
      <div className="relative">
        <IconButton
          variant="text"
          color="gray"
          onClick={onClose}
          className="absolute left-2 top-2 p-2"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <IoMdClose size={24} className="text-text2" />
        </IconButton>
      </div>

      <DialogHeader className="flex flex-col gap-2 px-2 pt-10 text-center sm:px-4">
        <div className="flex flex-col">
          <Typography variant="h1" className="text-2xl font-semibold">
            Verify OTP
          </Typography>
          <Typography variant="small" className="font-semibold text-text2">
            Enter the six-digit OTP
          </Typography>
        </div>
      </DialogHeader>

      <DialogBody className="flex flex-col items-center overflow-y-auto">
        <OtpInput
          length={6}
          value={otp}
          className="mt-[1em]"
          onChange={setOtp}
          gap={6}
        />
        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
      </DialogBody>

      <DialogFooter className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          loading={loading}
          className="flex w-60 justify-center rounded-full bg-text2 normal-case text-white"
        >
          <Typography>Next</Typography>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default OtpPin;
