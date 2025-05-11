import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { ConfirmingPaymentModalProps } from "../../../../../../shared/types/types";

const ConfirmingPaymentModal = ({
  isOpen,
  onClose,
}: ConfirmingPaymentModalProps) => (
  <Dialog open={isOpen} handler={onClose} size="sm" className="p-4">
    <DialogHeader className="flex items-center justify-between">
      <div />
      <IconButton
        variant="text"
        color="gray"
        onClick={onClose}
        className="p-2"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <IoMdClose size={24} />
      </IconButton>
    </DialogHeader>
    <DialogBody className="flex flex-col items-center justify-center">
      {/* Replace with your animated loader */}
      <div className="my-8">
        <div className="loader-dots" /> {/* Use your loader here */}
      </div>
      <div className="text-center text-lg font-medium text-gray-700">
        Confirming payment, please wait..
      </div>
    </DialogBody>
  </Dialog>
);

export default ConfirmingPaymentModal;
