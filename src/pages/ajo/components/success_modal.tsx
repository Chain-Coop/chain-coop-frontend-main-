import { IoClose } from "react-icons/io5";
import { BsPatchCheck } from "react-icons/bs";
import { Dialog, DialogBody, Typography } from "@material-tailwind/react";
import { FaChevronRight } from "react-icons/fa";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  return (
    <Dialog
      open={open}
      size="xs"
      handler={onClose}
      className="flex items-center justify-center backdrop-blur-sm backdrop-brightness-75"
    >
      <DialogBody className="flex w-[100%] flex-col items-center justify-center rounded-xl bg-white p-6">
        <button
          onClick={onClose}
          className="flex h-[30px] w-[30px] items-center justify-center self-start rounded-full bg-[#72889D1A]"
        >
          <IoClose className="text-[20px] text-[#430280]" />
        </button>
        <BsPatchCheck className="text-[70px] text-[#61C040]" />
        <Typography
          variant="paragraph"
          className="my-3 font-asap text-[16px] font-[600]"
        >
          Group successfully created
        </Typography>
        <Typography
          variant="paragraph"
          className="flex items-center gap-1 font-asap text-[16px] font-[700] text-[#440080]"
        >
          Invite members{" "}
          <span>
            <FaChevronRight />
          </span>
        </Typography>
      </DialogBody>
    </Dialog>
  );
};

export default SuccessModal;
