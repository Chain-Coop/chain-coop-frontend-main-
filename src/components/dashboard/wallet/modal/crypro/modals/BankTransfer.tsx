import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import FormInput from "../../../../../common/FormInput";
import lisk from "../../../../../../Assets/svg/dashboard/token_lisk.svg";
import usdc from "../../../../../../Assets/svg/dashboard/Group 99764.png";
import usdt from "../../../../../../Assets/svg/dashboard/usdc.svg";
import { IoMdClose } from "react-icons/io";
import PaymentConfirmation from "./PaymentConfirmation";
import Success from "../../../../../common/Success";
import { BankTransferProps } from "../../../../../../shared/types/types";

const tokenOptions = [
  { type: "Lisk", icon: lisk, label: "Lisk" },
  { type: "USDC", icon: usdc, label: "USDC" },
  { type: "USDT", icon: usdt, label: "USDT" },
];

const BANK_NAME = "Guaranty Trust Bank";
const ACCOUNT_NAME = "Chain cooperative Limited";
const ACCOUNT_NUMBER = "0165350081";
const NAIRA_EQUIVALENT_RATE = 1549.43;

interface ExtendedBankTransferProps extends BankTransferProps {
  onConfirm?: () => void;
}

const BankTransfer: React.FC<ExtendedBankTransferProps> = ({
  isOpen,
  onClose,
  onConfirm,
  bankName,
  accountName,
  accountNumber,
  fiatAmount,
}) => {
  const [selectedToken, setSelectedToken] = useState<string>("USDT");
  const [amount, setAmount] = useState<string>("");
  const [nairaValue, setNairaValue] = useState<string>("NGN 0.00");
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      const calculatedValue = parseFloat(amount) * NAIRA_EQUIVALENT_RATE;
      setNairaValue(`NGN ${calculatedValue.toLocaleString()}`);
    } else {
      setNairaValue("NGN 0.00");
    }
  }, [amount, selectedToken]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleContinue = () => {
    setIsPaymentConfirmed(true);
  };

  const handlePaymentConfirmationContinue = () => {
    setIsPaymentConfirmed(false);
    setShowSuccess(true);
    setAmount("");
    setNairaValue("NGN 0.00");
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  const handleTransferConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      size="sm"
      className="relative p-1 md:p-10"
    >
      <DialogHeader className="flex items-center justify-between">
        <div />
        <Typography
          variant="h1"
          className="w-full text-center text-xl font-semibold text-text2 sm:text-2xl"
        >
          Bank Transfer
        </Typography>
        <IconButton
          variant="text"
          onClick={onClose}
          className="absolute left-2 md:left-4 top-1.5 md:top-4 p-2 text-text2 hover:rounded-full"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <IoMdClose size={24} />
        </IconButton>
      </DialogHeader>
      <DialogBody className="text-center text-base text-[#6E6C6C]">
        <p>
          Transfer exact money to the account details below and once has be done
          click the button to confirm payment.
        </p>
      </DialogBody>
      <DialogBody>
        <div className="space-y-4">
          <div className="flex justify-between border-b py-2">
            <span className="font-medium text-gray-500">Bank</span>
            <span className="font-semibold text-text1">{bankName}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium text-gray-500">Account Name</span>
            <span className="font-semibold text-text1">{accountName}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium text-gray-500">Account Number</span>
            <span className="font-semibold text-text1">{accountNumber}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium text-gray-500">Deposit Amount</span>
            <span className="font-semibold text-text1">
              NGN{" "}
              {typeof fiatAmount === "number"
                ? fiatAmount.toLocaleString()
                : fiatAmount}
            </span>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex flex-col gap-2">
        <Button
          variant="text"
          className="w-full bg-text2 py-3 font-medium text-white hover:bg-[#3a1561] md:h-[52px]"
          onClick={handleTransferConfirm}
        >
          I've sent the money
        </Button>
      </DialogFooter>
      <div className="mb-4 mt-2 text-center text-base text-[#6E6C6C]">
        Note: Transfer exact money to the account details above.
      </div>

      <PaymentConfirmation
        isOpen={isPaymentConfirmed}
        onClose={() => setIsPaymentConfirmed(false)}
        onContinue={handlePaymentConfirmationContinue}
      />

      <Success
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Payment Confirmed"
      />
    </Dialog>
  );
};

export default BankTransfer;
