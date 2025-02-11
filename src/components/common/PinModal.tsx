import { Button, Typography } from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Alert } from "@mui/material";
import OtpInput from "../../shared/utils/OtpInput";
import { PinModalProps } from "../../shared/types/types";

const PinModal = ({
  isOpen,
  onClose,
  onSubmit,
  header,
  title,
  loading,
  error,
  pin,
  onPinChange,
}: PinModalProps) => {
  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      size="xs"
      className="flex flex-col justify-center bg-white text-center"
    >
      <DialogHeader className="flex flex-col">
        <Typography variant="h1" className="text-2xl font-semibold">
          {header}
        </Typography>
        <Typography className="font-normal  text-howtext">{title}</Typography>
      </DialogHeader>

      <DialogBody>
        <OtpInput value={pin} onChange={onPinChange} gap={6} />
        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}
      </DialogBody>

      <DialogFooter className="justify-center">
        <Button
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            onSubmit(pin);
          }}
          disabled={loading}
          loading={loading}
          className="hover:bg-text2-dark flex w-full justify-center rounded-full bg-text2 px-2 py-3 text-sm font-semibold normal-case text-white"
        >
          {loading ? "Verifying..." : "Send"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PinModal;
