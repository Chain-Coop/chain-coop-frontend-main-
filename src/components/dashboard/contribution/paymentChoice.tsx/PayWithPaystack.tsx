import { IoIosArrowForward } from "react-icons/io";
import withdraw from "../../../../Assets/svg/dashboard/contribution/card.svg";
import {
  Button,
  Dialog,
  Typography,
  Spinner,
  DialogHeader,
} from "@material-tailwind/react";

interface PaymentOptionProps {
  onSelect: (paymentType: "paystack") => void;
  isProcessing: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const PayWithPaystack: React.FC<PaymentOptionProps> = ({
  onSelect,
  isProcessing,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      open={isOpen}
      handler={onClose}
      size="sm"
      className="bg-[#ECECF2] p-6"
    >
      <div className="flex flex-col gap-6 p-4">
        <DialogHeader className="text-center">
          <Typography
            variant="h5"
            className="text-base font-bold text-text2 md:text-lg"
          >
            Fund Contribution
          </Typography>
        </DialogHeader>

        <section className="rounded-2xl bg-white p-4">
          <div
            onClick={() => !isProcessing && onSelect("paystack")}
            className={`flex w-full flex-col justify-center rounded-xl transition-all
              ${isProcessing ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-gray-50"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div>
                  <img
                    src={withdraw}
                    alt="withdraw"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  />
                </div>
                <div>
                  <Typography className="text-sm font-medium text-black md:text-base">
                    Pay with PayStack
                  </Typography>
                  <Typography className="text-xs text-gray-500 md:text-sm">
                    Fund with Naira Cards
                  </Typography>
                </div>
              </div>
              <Button
                variant="text"
                loading={isProcessing}
                className="p-0 shadow-none hover:shadow-none"
              >
                {!isProcessing && (
                  <IoIosArrowForward size={25} className="text-black" />
                )}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Dialog>
  );
};

export default PayWithPaystack;
