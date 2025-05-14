import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Button,
    IconButton,
  } from "@material-tailwind/react";
  import React from "react";
  import { IoMdClose } from "react-icons/io";
  import { FiUpload } from "react-icons/fi";
  
  interface PaymentConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue?: () => void;
  }
  
  const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
    isOpen,
    onClose,
    onContinue,
  }) => {
    return (
      <Dialog open={isOpen} handler={onClose} size="xs" className="p-0">
        <DialogHeader className="flex items-center justify-between pb-0">
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
            <IoMdClose size={22} />
          </IconButton>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center justify-center pt-0">
          <div className="flex flex-col items-center w-full">
            <div className="mb-2 mt-2 text-center w-full">
              <Typography
                variant="h1"
                className="text-lg font-semibold text-black"
              >
                Payment Confirmation
              </Typography>
            </div>
            <div className="my-4 flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-[#ece6f2] h-20 w-20 mb-2">
                <FiUpload size={40} className="text-[#4a1d7d]" />
              </div>
              <span className="text-xs text-[#b96b2b] font-medium mb-1">
                <span className="inline-block align-middle mr-1">🧾</span>
                Payment to wallet
              </span>
              <Typography className="text-center text-base font-normal text-black mb-2">
                Upload your payment receipt for confirmation
              </Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex flex-col items-center w-full">
          <Button
            className="w-full rounded-md bg-[#4a1d7d] py-3 text-base font-semibold normal-case text-white hover:bg-[#3a1561]"
            onClick={onContinue}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Continue
          </Button>
          <div className="mt-3 w-full text-center text-xs text-gray-500">
            Note: Images can be in png, jpg, pdf not less than 2mb
          </div>
        </DialogFooter>
      </Dialog>
    );
  };
  
  export default PaymentConfirmation;