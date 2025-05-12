import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { ConfirmingPaymentModalProps } from "../../../../../../shared/types/types";

const ConfirmLoader = () => (
  <div className="relative flex h-24 w-24 items-center justify-center">
    {[...Array(8)].map((_, i) => {
      const angle = i * 45 * (Math.PI / 180);
      const size = i === 0 ? "w-5 h-5" : "w-3.5 h-3.5";
      const color = i < 4 ? "bg-[#6C2EB5]" : "bg-[#D1B7F2]";
      const style = {
        left: `${50 + 38 * Math.cos(angle)}%`,
        top: `${50 + 38 * Math.sin(angle)}%`,
        transform: "translate(-50%, -50%)",
        position: "absolute" as const,
        transition: "all 0.3s",
      };
      return (
        <span
          key={i}
          className={`absolute rounded-full ${size} ${color} animate-spin-dot`}
          style={style}
        />
      );
    })}
    <style>
      {`
        @keyframes spin-loader {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-dot {
          animation: spin-loader 1.2s linear infinite;
        }
      `}
    </style>
  </div>
);

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
      <div className="my-8">
        <ConfirmLoader />
      </div>
      <div className="text-center text-lg font-medium text-gray-700">
        Confirming payment, please wait..
      </div>
    </DialogBody>
  </Dialog>
);

export default ConfirmingPaymentModal;
