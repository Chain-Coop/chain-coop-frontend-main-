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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSubmit = () => {
    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    if (pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    setLoading(true);

    dispatch(
      CreateTransactionPin({
        otp: parseInt(otp),
        newpin: pin,
      }),
    )
      .unwrap()
      .then(() => {
        onSuccess();
      })
      .catch((error: any) => {
        setError(error || "Failed to create PIN");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog size="sm" open={isOpen} handler={onClose}>
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
            Change Pin
          </Typography>
        </DialogHeader>
      </div>

      <DialogBody className="flex flex-col gap-4">
        <OtpInput
          value={pin}
          onChange={setPin}
          showVisibilityToggle
          label="Enter New PIN"
        />

        <OtpInput
          value={confirmPin}
          onChange={setConfirmPin}
          showVisibilityToggle
          label="Re-enter PIN"
        />

        {error && <Alert severity="error">{error}</Alert>}
      </DialogBody>

      <DialogFooter className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          loading={loading}
          className="flex w-60 items-center justify-center rounded-full bg-text2 p-3 text-sm font-medium normal-case text-white"
        >
          {loading ? "Creating PIN..." : "Create PIN"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ChangePin;
