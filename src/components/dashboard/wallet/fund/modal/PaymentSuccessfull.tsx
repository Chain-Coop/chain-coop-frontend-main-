import React from "react";
import {
  Dialog,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import success from "../../../../../Assets/svg/auth/sucess.svg";
import { useNavigate } from "react-router";

interface PaymentSuccessfullProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentSuccessfull: React.FC<PaymentSuccessfullProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleWalletRedirect = () => {
    navigate("/dashboard/wallet");
    onClose(); 
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="sm" className="bg-white">
      <DialogBody className="py-8 text-center">
        <img
          src={success}
          alt="Logo"
          className="mx-auto sm:w-[6em] lg:w-[8em]"
        />
        <Typography variant="h4" className="mt-[1.5em] font-semibold">
          Payment Successful
        </Typography>
        <div className="mt-[1.5em] flex items-center justify-center gap-3">
          <Typography
            variant="paragraph"
            className="font-semibold text-howtext"
          >
            Return to your wallet
          </Typography>
          <IoIosArrowRoundForward
            size={30}
            className="cursor-pointer"
            onClick={handleWalletRedirect}
          />
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default PaymentSuccessfull;
