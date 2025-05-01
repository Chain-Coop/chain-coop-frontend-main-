import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { format, parseISO, isAfter, isToday } from "date-fns";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  withdrawalDate: string;
  savingsType: string;
  withdrawalAmount: number;
  balance: number;
}

interface StrictLockValidation {
  isValid: boolean;
  error: string;
  type: "strict";
}

interface BalanceValidation {
  isValid: boolean;
  error: string | null;
  type: "balance";
  totalFees: number;
  shortfall: number;
}

type ValidationResult = StrictLockValidation | BalanceValidation;

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

  const isBeforeWithdrawalDate = () => {
    if (!withdrawalDate) return false;
    const parsedWithdrawalDate = parseISO(withdrawalDate);
    const today = new Date();
    return (
      isAfter(parsedWithdrawalDate, today) && !isToday(parsedWithdrawalDate)
    );
  };

  const calculateFees = () => {
    let fees = 50;

    if (membershipStatus === "inactive") {
      fees += 1000;
    }

    if (savingsType === "Lock" && isBeforeWithdrawalDate()) {
      fees += 2000;
    }

    return fees;
  };

  const validateWithdrawal = (): ValidationResult => {
    if (savingsType === "StrictLock" && isBeforeWithdrawalDate()) {
      return {
        isValid: false,
        error:
          "Strict Lock savings can only be withdrawn on the maturity date.",
        type: "strict",
      };
    }

    const totalFees = calculateFees();
    const totalRequired = withdrawalAmount + totalFees;
    const shortfall = totalRequired > balance ? totalRequired - balance : 0;

    return {
      isValid: shortfall === 0,
      error:
        shortfall > 0
          ? `Insufficient balance. You need ₦${shortfall.toLocaleString()} more.`
          : null,
      type: "balance",
      totalFees,
      shortfall,
    };
  };

  const renderNoticeContent = () => {
    const validation = validateWithdrawal();
    const isEarlyWithdrawal = isBeforeWithdrawalDate();
    const fees = calculateFees();

    if (validation.type === "strict") {
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
      <div className="space-y-5">
        {withdrawalDate && (
          <div className="space-y-2">
            <p>
              <strong>Scheduled withdrawal date:</strong>{" "}
              {format(parseISO(withdrawalDate), "dd/MM/yyyy")}
            </p>
            {savingsType === "LOCK" && isEarlyWithdrawal && (
              <p className="font-medium text-amber-600">
                Early withdrawal penalty will apply (₦2,000)
              </p>
            )}
          </div>
        )}

        <div className="space-y-4 rounded-lg  p-4">
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

          <div className="mt-3 space-y-3">
            <p className="font-medium">Applicable Fees:</p>
            <p>Transaction fee: ₦50</p>
            {membershipStatus === "inactive" && (
              <p className="text-amber-600">One-time membership fee: ₦1,000</p>
            )}
            {savingsType === "Lock" && isEarlyWithdrawal && (
              <p className="text-amber-600">Early withdrawal fee: ₦2,000</p>
            )}
            <p className="font-medium">
              <strong>Total fees:</strong> ₦{fees.toLocaleString()}
            </p>
          </div>

          <div className="mt-3 border-t pt-3">
            <p className="font-medium">
              <strong>Total Required:</strong> ₦
              {(withdrawalAmount + fees).toLocaleString()}
            </p>
            {!validation.isValid && (
              <div className="mt-2 rounded-md bg-red-50 p-3 text-red-600">
                <p className="font-semibold">Insufficient Balance</p>
                <p>
                  You need to add ₦{validation.shortfall.toLocaleString()} more
                  to your account to complete this withdrawal.
                </p>
                <p className="mt-1 text-sm">
                  This covers both your requested withdrawal amount (₦
                  {withdrawalAmount.toLocaleString()}) and all applicable fees
                  (₦{fees.toLocaleString()}).
                </p>
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
      dismiss={{ outsidePress: false }}
      size="sm"
      className="max-h-[90vh] overflow-y-auto"
    >
      <DialogHeader className="flex flex-col text-center">
        <Typography variant="h4" className="font-semibold">
          Withdrawal Notice
        </Typography>
      </DialogHeader>

      <DialogBody className="overflow-y-auto font-normal text-black">
        {renderNoticeContent()}

        {(!isBeforeWithdrawalDate() || savingsType !== "StrictLock") && (
          <Typography className="mt-6 text-center font-semibold text-text2">
            Would you like to proceed with the withdrawal?
          </Typography>
        )}
      </DialogBody>

      <DialogFooter className="flex justify-center gap-4 pt-2">
        <Button
          variant="outlined"
          onClick={onClose}
          className="border-2 border-black normal-case"
        >
          Cancel
        </Button>
        {(!isBeforeWithdrawalDate() || savingsType !== "StrictLock") && (
          <Button
            variant="outlined"
            onClick={onConfirm}
            className="bg-text2 normal-case text-white"
            disabled={!validateWithdrawal().isValid}
          >
            Confirm
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default NoticeModal;
