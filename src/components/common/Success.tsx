import {
  Dialog,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import success from "../../Assets/svg/auth/sucess.svg";
import { IoMdClose } from "react-icons/io";

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
      <div className="relative">
        <DialogHeader className="flex items-center justify-center">
          <button
            onClick={onClose}
            className="absolute left-2 top-0 p-2 text-text2 transition-colors hover:text-gray-700"
            type="button"
          >
            <IoMdClose size={24} />
          </button>

          <img
            src={success}
            alt="Success Icon"
            className="sm:w-[3em] lg:w-[4em]"
          />
        </DialogHeader>
      </div>
      <DialogFooter className="flex items-center justify-center">
        <Typography variant="small" className="text-lg font-normal text-black">
          {title}
        </Typography>
      </DialogFooter>
    </Dialog>
  );
};

export default Success;
