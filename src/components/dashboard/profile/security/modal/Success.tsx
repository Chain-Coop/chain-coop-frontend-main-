import {
  Dialog,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import success from "../../../../../Assets/svg/auth/sucess.svg";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Success = ({ isOpen, onClose, title }: SuccessModalProps) => {
  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      size="xs"
      className="bg-white py-3 text-center"
    >
      <DialogHeader className="flex justify-center">
        <img
          src={success}
          alt="Success Icon"
          className="sm:w-[3em] lg:w-[4em]"
        />
      </DialogHeader>
      <DialogFooter className="flex items-center justify-center">
        <Typography variant="small" className="text-lg font-normal text-black">
          {title}
        </Typography>
      </DialogFooter>
    </Dialog>
  );
};

export default Success;
