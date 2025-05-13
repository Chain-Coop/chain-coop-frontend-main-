import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import bell from "../../../../../../Assets/svg/dashboard/wallet/bell.svg"

interface BtcCoreNoticeModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLightning: () => void;
}

const BtcCoreNoticeModal: React.FC<BtcCoreNoticeModalProps> = ({
  open,
  onClose,
  onSwitchToLightning,
}) => (
  <Dialog open={open} handler={onClose} size="sm" className="p-10">
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute left-0 -top-5 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        aria-label="Close modal"
      >
        <IoClose size={22} />
      </button>
      <DialogHeader className="flex gap-2 items-center font-semibold text-2xl justify-center text-[#31005C] ">
        <h1>Notice</h1>
        <img className="w-5 h-5" src={bell} alt="notificationBell" />
      </DialogHeader>
      <DialogBody className="px-6 pb-2 pt-0 text-center">
        <div className="mb-4 text-lg text-center text-[#31005C]">
          BTC Core is slow and has high fees. We recommend you use BTC Lightning
          for faster and cheaper payment
        </div>
      </DialogBody>
      <DialogFooter className="flex gap-2 px-6 pb-6">
        <Button className="flex-1 bg-text2" onClick={onClose}>
          Continue
        </Button>
        <Button
          variant="outlined"
          color="deep-purple"
          className="flex-1 text-text1"
          onClick={() => {
            onSwitchToLightning();
            onClose();
          }}
        >
          Switch to BTC Lightning
        </Button>
      </DialogFooter>
    </div>
  </Dialog>
);

export default BtcCoreNoticeModal;
