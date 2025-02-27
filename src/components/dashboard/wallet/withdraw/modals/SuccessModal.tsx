import React from "react";
import { Dialog, DialogBody, Typography } from "@material-tailwind/react";
import success from "../../../../../Assets/svg/auth/sucess.svg";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} handler={onClose} size="sm" className="bg-white">
      <DialogBody className="py-[3em] text-center">
        <div className="mt-[2.5em] flex flex-col justify-center">
          <img
            src={success}
            alt="Success Icon"
            className="mx-auto sm:w-[6em] lg:w-[8em]"
          />
          <header className="mt-4">
            <Typography variant="h4" className="text-center font-semibold">
              Transaction Successful
            </Typography>
            <Typography variant="paragraph" className="mt-2 text-howtext">
              Your withdrawal has been processed. Redirecting to wallet...
            </Typography>
          </header>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default SuccessModal;
