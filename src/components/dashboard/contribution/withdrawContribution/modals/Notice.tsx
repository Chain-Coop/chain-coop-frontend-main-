import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { format, parseISO } from "date-fns";
import useUserProfile from "../../../../../shared/Hooks/useUserProfile";

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  withdrawalDate: string;
}

const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  withdrawalDate,
}) => {
  const { profileDetails, fetchUserProfile } = useUserProfile();
  console.log("prr", profileDetails);
  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      dismiss={{ outsidePress: false }}
      size="sm"
    >
      <DialogHeader className="flex flex-col text-center">
        <Typography variant="h4" className="font-semibold">
          Withdrawal Notice
        </Typography>
      </DialogHeader>

      <DialogBody className="font-normal text-black">
        <Typography variant="h5" color="gray" className="mb-3 font-semibold">
          Update
        </Typography>
        <p className="mb-4">
          The next withdrawal date is in six months and that will be{" "}
          {format(parseISO(withdrawalDate), "dd/MM/yyyy")} as selected by you.
        </p>
        <p>
          However, it seems you want to Withdraw before the stipulated date and
          service fee of N2,000.00 will be charged.
        </p>
        <Typography className="mt-6 text-center font-semibold text-text2">
          Would you like to continue?
        </Typography>
      </DialogBody>

      <DialogFooter className="flex justify-center gap-4 pt-2">
        <Button
          variant="outlined"
          onClick={onClose}
          className="border-2 border-black normal-case"
        >
          No
        </Button>
        <Button
          variant="outlined"
          onClick={onConfirm}
          className="border-2 border-black normal-case"
        >
          Yes
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default NoticeModal;
