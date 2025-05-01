import { Button, IconButton, Typography } from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Alert } from "@mui/material";
import OtpInput from "../../shared/utils/OtpInput";
import { PinModalProps } from "../../shared/types/types";
import { IoMdClose } from "react-icons/io";

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
      size="sm"
      className="flex flex-col justify-center bg-white px-2 py-8 text-center"
    >
      <DialogHeader className="relative flex items-center">
        <IconButton
          variant="text"
          color="gray"
          onClick={onClose}
          className="absolute left-0 top-0 p-2"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <IoMdClose size={24} className="text-text2" />
        </IconButton>

        <div className="flex w-full flex-col items-center justify-center text-center">
          <Typography
            variant="h1"
            className="text-center text-2xl font-semibold"
          >
            {header}
          </Typography>
          <Typography className="font-normal text-howtext">{title}</Typography>
        </div>
      </DialogHeader>

      <DialogBody>
        <OtpInput value={pin} onChange={onPinChange} gap={6} />
        {error && (
          <Alert severity="error" className="my-4">
            {error}
          </Alert>
        )}
        <Button
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            onSubmit(pin);
          }}
          disabled={loading}
          loading={loading}
          className="hover:bg-text2-dark mx-auto mt-10 w-60 rounded-full bg-text2 px-2 py-3 text-sm font-semibold normal-case text-white"
        >
          {loading ? "Verifying..." : "Send"}
        </Button>
      </DialogBody>
    </Dialog>
  );
};

export default PinModal;
