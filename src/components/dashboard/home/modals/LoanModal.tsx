//@ts-nocheck
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import loan from "../../../../Assets/svg/dashboard/loan.svg";

interface LoanModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoanModal({ open, onClose }: LoanModalProps) {
  return (
    <Dialog size="xs" open={open} handler={onClose}>
      <DialogHeader className="flex items-center justify-center gap-2 text-center">
        <h2 className="text-xl font-bold text-text2">Loan Notice</h2>
        <img src={loan} alt="loan" className="h-6 w-6" />
      </DialogHeader>
      <DialogBody>
        <p className="text-center text-sm font-medium">
          Stay tuned! We'll notify you when you become eligible for one.
        </p>
      </DialogBody>
    </Dialog>
  );
}
