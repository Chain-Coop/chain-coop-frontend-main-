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

const tokenOptions = [
  { type: "Lisk", icon: lisk, label: "Lisk" },
  { type: "USDC", icon: usdc, label: "USDC" },
  { type: "USDT", icon: usdt, label: "USDT" },
];

const BANK_NAME = "Guaranty Trust Bank";
const ACCOUNT_NAME = "Chain cooperative Limited";
const ACCOUNT_NUMBER = "0165350081";
const NAIRA_EQUIVALENT_RATE = 1549.43;

interface BankTransferProps {
  isOpen: boolean;
  onClose: () => void;
}

const BankTransfer: React.FC<BankTransferProps> = ({ isOpen, onClose }) => {
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

  return (
    <Dialog open={isOpen} handler={onClose} size="sm" className="p-4">
      <DialogHeader className="flex items-center justify-between">
        <div />
        <Typography
          variant="h1"
          className="w-full text-center text-xl font-bold text-[#4a1d7d] sm:text-2xl"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Bank Transfer
        </Typography>
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
      <DialogBody>
        <div className="space-y-4">
          <div className="flex justify-between border-b py-2">
            <span className="font-medium text-gray-500">Bank</span>
            <span className="font-semibold text-text1">{BANK_NAME}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium text-gray-500">Account Name</span>
            <span className="font-semibold text-text1">{ACCOUNT_NAME}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium text-gray-500">Account Number</span>
            <span className="font-semibold text-text1">{ACCOUNT_NUMBER}</span>
          </div>
          <div className="flex flex-col items-start py-2 md:flex-row md:items-center md:justify-between">
            <span className="text-left font-medium text-gray-500 md:text-center">
              Select token type
            </span>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              {tokenOptions.map(({ type, icon, label }) => (
                <button
                  key={type}
                  onClick={() => setSelectedToken(type)}
                  className={`flex items-center gap-2 rounded-md bg-[#ECE6F2] px-6 font-medium transition-all duration-300 lg:py-1
                    ${
                      selectedToken === type
                        ? "border-2 border-text2"
                        : "hover:bg-text2 hover:text-white"
                    }
                    transform uppercase hover:scale-105 active:scale-95`}
                >
                  <img src={icon} alt={label} className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Token Amount Input */}
          <div className="py-2">
            <FormInput
              label={`Enter ${selectedToken} amount`}
              placeholder={`0.00`}
              className="rounded-none text-text1"
              labelClassName="text-black text-gray-800"
              paddingY="3"
              value={amount}
              onChange={handleAmountChange}
              type="text"
            />
            <div className="mt-1 text-sm text-[#61C040]">
              1 {selectedToken} equivalent rate = {NAIRA_EQUIVALENT_RATE} NGN
            </div>
          </div>

          {/* Naira Amount Display */}
          <div className="flex items-center justify-between border-b py-2">
            <span className="font-medium text-gray-500">
              Naira amount value
            </span>
            <span className="font-bold text-black">{nairaValue}</span>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          className="w-full bg-[#4a1d7d]
           py-3 text-white hover:bg-[#3a1561]"
          onClick={handleContinue}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Click here after transfer
        </Button>
      </DialogFooter>
      <div className="mb-4 mt-2 text-center text-xs text-gray-500">
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
