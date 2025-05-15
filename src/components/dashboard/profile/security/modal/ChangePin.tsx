import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../shared/redux/store";
import { CreateTransactionPin } from "../../../../../shared/redux/slices/transaction.slices";
import { Alert } from "@mui/material";
import OtpInput from "../../../../../shared/utils/OtpInput";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { GetUserProfile } from "../../../../../shared/redux/slices/landing.slices";
import { useUserProfile } from "../../../../../shared/Hooks/useUserProfile";

interface ChangePinProps {
  otp: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ChangePin: React.FC<ChangePinProps> = ({
  otp,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { profileDetails } = useUserProfile();
  const isPinCreated = profileDetails?.isPinCreated || false;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSubmit = async () => {
    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    if (pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await dispatch(
        CreateTransactionPin({
          otp: otp,
          newpin: pin,
        }),
      ).unwrap();
      await dispatch(GetUserProfile()).unwrap();
      onSuccess();
    } catch (error: any) {
      setError(error || `Failed to ${isPinCreated ? "change" : "create"} PIN`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
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

        <DialogHeader className="flex justify-center pt-10 text-center">
          <Typography variant="h1" className="text-2xl font-bold">
            {isPinCreated ? "Change PIN" : "Set PIN"}
          </Typography>
        </DialogHeader>
      </div>

      <DialogBody className="flex flex-col gap-4">
        <OtpInput
          value={pin}
          onChange={setPin}
          showVisibilityToggle
          label={isPinCreated ? "Enter New PIN" : "Enter PIN"}
        />

        <OtpInput
          value={confirmPin}
          onChange={setConfirmPin}
          showVisibilityToggle
          label={isPinCreated ? "Re-enter New PIN" : "Re-enter PIN"}
        />

        {error && (
          <Alert severity="error" className="mx-auto w-fit">
            {error}
          </Alert>
        )}
      </DialogBody>

      <DialogFooter className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          loading={loading}
          className="flex w-60 items-center justify-center rounded-full bg-text2 p-3 text-sm font-medium normal-case text-white"
        >
          {loading ? "Processing..." : isPinCreated ? "Change PIN" : "Set PIN"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ChangePin;
