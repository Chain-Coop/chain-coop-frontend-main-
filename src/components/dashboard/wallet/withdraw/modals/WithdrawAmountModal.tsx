import React from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { WithdrawAmountModalProps } from "../../../../../shared/types/types";
import FormInput from "../../../../common/FormInput";

const WithdrawAmountModal: React.FC<WithdrawAmountModalProps> = ({
  isModalOpen,
  toggleModal,
  amount,
  error,
  handleAmountChange,
  handleContinue,
  withdrawalLimit,
}) => {
  return (
    <Dialog open={isModalOpen} handler={toggleModal} size="sm" className="p-4">
      <DialogHeader>
        <Typography
          variant="h1"
          className="text-center text-lg font-semibold text-black sm:text-xl"
        >
          Bank Account Withdrawal
        </Typography>
      </DialogHeader>

      <DialogBody>
        <hr className="h-[1px] rounded-md" />
        <div className="mt-3 flex flex-col justify-between gap-2 text-sm sm:flex-row sm:text-base">
          <Typography className="font-normal text-howtext">Duration</Typography>
          <Typography className="font-medium text-black">
            2-3 business days
          </Typography>
        </div>
        <hr className="mt-3 h-[1px] rounded-md" />
        <div className="mt-5 flex flex-col justify-between gap-2 text-sm sm:flex-row sm:text-base">
          <Typography className="font-normal text-howtext">
            Withdrawal limit
          </Typography>
          <Typography className="whitespace-nowrap font-medium text-black">
            {withdrawalLimit.toLocaleString()} NGN / transaction
          </Typography>
        </div>
        <hr className="mt-3 h-[1px] rounded-md" />
        <div className="mt-[1em] w-full">
          <FormInput
            label="Enter Amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            error={error}
            id="amount"
            rightElement={<span className="font-semibold text-black">NGN</span>}
            elementPosition="left"
            labelClassName="text-black"
            className="border-border bg-input w-full rounded-lg border-[1px] bg-inherit p-2 text-right text-sm font-normal text-black focus:bg-inherit focus:outline-none sm:p-3 sm:text-base"
            wrapperClassName="mt-[1em]"
          />
        </div>
      </DialogBody>

      <DialogFooter>
        <Button
          variant="text"
          className="w-full bg-text2 py-3 text-sm font-normal  normal-case text-white hover:bg-text2"
          onClick={handleContinue}
          disabled={!amount}
        >
          Continue
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default WithdrawAmountModal;
