import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { AppDispatch } from "../../../../shared/redux/store";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import { FundWallet } from "../../../../shared/redux/slices/transaction.slices";
import FormInput from "../../../common/FormInput";
import { IoMdClose } from "react-icons/io";

interface EmailAmountModalProps {
  isOpen: boolean;
  closeModal: () => void;
  error?: string;
}

const EmailAmountModal: React.FC<EmailAmountModalProps> = ({
  isOpen,
  closeModal,
  error,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();

  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (numAmount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if (numAmount > 100000) {
      toast.error("Amount exceeds maximum limit");
      return;
    }

    setLoading(true);

    dispatch(FundWallet({ amount: numAmount }))
      .unwrap()
      .then((response) => {
        setLoading(false);
        const paymentUrl = response?.paymentUrl;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          toast.error("Invalid payment URL received");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error || "An error occurred, please try again");
      });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  const formatAmount = (value: string) => {
    if (!value) return "";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    return new Intl.NumberFormat("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  return (
    <Dialog
      open={isOpen}
      handler={closeModal}
      dismiss={{ outsidePress: true }}
      className="bg-white p-4"
      size="xs"
    >
      <DialogHeader className="flex items-center justify-between">
        <h2 className="tetx-text2 flex-grow text-center text-xl font-semibold">
          Pay with Paystack
        </h2>
        <IconButton
          variant="text"
          color="gray"
          onClick={closeModal}
          className="p-2"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <IoMdClose size={24} className="text-text2" />
        </IconButton>
      </DialogHeader>

      <DialogBody className="overflow-y-auto">
        <form onSubmit={submitData} className="space-y-4">
          <div>
            <FormInput
              label="Enter Amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              error={error}
              id="amount"
              rightElement={
                <span className="font-semibold text-black">NGN</span>
              }
              elementPosition="left"
              labelClassName="text-black"
              className="border-border bg-input w-full rounded-lg border-[1px] bg-inherit p-2 text-right text-sm font-normal text-black focus:bg-inherit focus:outline-none sm:p-3 sm:text-base"
              wrapperClassName="mt-[1em]"
            />
            {amount && (
              <p className="mt-1 text-sm text-gray-500">
                You will be charged: ₦{formatAmount(amount)}
              </p>
            )}
          </div>

          <Button
            size="lg"
            variant="filled"
            type="submit"
            disabled={!amount || loading}
            fullWidth
            className="mt-6 flex place-items-center justify-center bg-text2 text-center text-sm normal-case"
            loading={loading}
          >
            {`Pay ₦${amount || "0.00"}`}
          </Button>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default EmailAmountModal;
