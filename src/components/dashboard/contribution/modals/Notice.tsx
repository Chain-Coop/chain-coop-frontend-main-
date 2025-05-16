import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { format, parseISO } from "date-fns";
import {
  isBeforeWithdrawalDate,
  useWithdrawalValidation,
} from "../../../../shared/Hooks/useBalance";
import { IoMdClose } from "react-icons/io";
import { useAppSelector } from "../../../../shared/redux/reduxHooks";
import { RootState } from "../../../../shared/redux/rootReducer";
import { useUserProfile } from "../../../../shared/Hooks/useUserProfile";

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  withdrawalDate: string;
  savingsType: string;
  withdrawalAmount: number;
  balance: number;
}

const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  withdrawalDate,
  savingsType = "Flexible",
  withdrawalAmount = 0,
  balance = 0,
}) => {
  const { profileDetails } = useUserProfile();

  const membershipStatus = profileDetails?.membershipStatus || "inactive";

  const validation = useWithdrawalValidation({
    savingsType,
    withdrawalDate,
    withdrawalAmount,
    balance,
    membershipStatus,
  });

  const renderNoticeContent = () => {
    const isEarlyWithdrawal = isBeforeWithdrawalDate(withdrawalDate);
    const { totalFees, netAmount, shortfall, error, isStrictLockBlocked } =
      validation;

    if (isStrictLockBlocked) {
      return (
        <div className="space-y-4">
          <p className="font-semibold text-red-600">Withdrawal Not Allowed</p>
          <p>
            This is a Strict Lock savings. Withdrawals are only permitted on{" "}
            {format(parseISO(withdrawalDate), "dd/MM/yyyy")}.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {withdrawalDate && (
          <div className="space-y-2">
            <p>
              <strong>Scheduled withdrawal date:</strong>{" "}
              {format(parseISO(withdrawalDate), "dd/MM/yyyy")}
            </p>
            {savingsType === "Lock" && isEarlyWithdrawal && (
              <p className="font-medium text-amber-600">
                Early withdrawal penalty will apply (3% of requested amount: ₦
                {(withdrawalAmount * 0.03).toLocaleString()})
              </p>
            )}
          </div>
        )}

        <div className="space-y-2 rounded-lg p-4">
          <h4 className="font-semibold">Withdrawal Summary:</h4>

          <div className="space-y-1">
            <p>
              <strong>Current Balance:</strong> ₦{balance.toLocaleString()}
            </p>
            <p>
              <strong>Requested Amount:</strong> ₦
              {withdrawalAmount.toLocaleString()}
            </p>
          </div>

          <div className="mt-3 space-y-1">
            <p className="font-medium">Applicable Fees:</p>
            <p>Transaction fee: ₦50</p>
            {membershipStatus === "inactive" && (
              <p className="text-amber-600">One-time membership fee: ₦1,000</p>
            )}
            {savingsType === "Lock" && isEarlyWithdrawal && (
              <p className="text-amber-600">
                Early withdrawal fee: ₦
                {(withdrawalAmount * 0.03).toLocaleString()}
              </p>
            )}
            <p className="font-medium">
              <strong>Total fees:</strong> ₦{totalFees.toLocaleString()}
            </p>
          </div>

          <div className="mt-3 border-t pt-3">
            {netAmount > 0 && (
              <p className="font-medium">
                <strong>Net Amount to Receive:</strong> ₦
                {netAmount.toLocaleString()}
              </p>
            )}
            {!validation.isValid && (
              <div className="mt-2 rounded-md bg-red-50 p-3 text-red-600">
                <p className="font-semibold">
                  {shortfall > 0
                    ? "Insufficient Balance"
                    : "Invalid Withdrawal Amount"}
                </p>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      size="sm"
      className="max-h-[90vh] w-[95%] max-w-[500px] overflow-y-scroll"
    >
      <DialogHeader className="relative flex min-h-[64px] items-center justify-center px-6">
        <div className="absolute left-2 top-2 z-10">
          <IconButton
            variant="text"
            color="gray"
            onClick={onClose}
            className="p-2"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <IoMdClose size={24} className="text-text2" />
          </IconButton>
        </div>

        <Typography variant="h4" className="font-semibold">
          Withdrawal Notice
        </Typography>
      </DialogHeader>

      <DialogBody className="overflow-y-auto font-normal text-black">
        {renderNoticeContent()}

        {!validation.isStrictLockBlocked && validation.netAmount > 0 && (
          <Typography className="mt-6 text-center font-semibold text-text2">
            Would you like to proceed with the withdrawal?
          </Typography>
        )}
      </DialogBody>

      <DialogFooter className="flex justify-center gap-4 pt-2">
        <Button
          variant="outlined"
          onClick={onClose}
          className="border-2 border-black py-2 normal-case"
        >
          <Typography>Cancel</Typography>
        </Button>
        {!validation.isStrictLockBlocked && validation.netAmount > 0 && (
          <Button
            variant="outlined"
            onClick={onConfirm}
            className="bg-text2 px-5 py-2 normal-case text-white"
            disabled={!validation.isValid}
          >
            <Typography>Confirm</Typography>
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default NoticeModal;
