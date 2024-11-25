import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Loader2 } from "lucide-react";
import withdraw from "../../../../Assets/svg/dashboard/contribution/card.svg";

interface PaymentOptionProps {
  onSelect: (paymentType: "paystack") => void;
  isProcessing: boolean;
}

const PayWithPaystack: React.FC<PaymentOptionProps> = ({
  onSelect,
  isProcessing,
}) => {
  return (
    <div className="p- flex w-full flex-col gap-4 sm:w-[20em] sm:p-6 md:w-[25em] lg:w-[30em]">
      <header className="text-center">
        <h1 className="text-base font-bold text-text2 md:text-lg">
          Fund Contribution
        </h1>
      </header>

      <section className="rounded-3xl bg-white p-4">
        <div
          onClick={() => !isProcessing && onSelect("paystack")}
          className={`flex w-full flex-col justify-center gap-4 rounded-3xl bg-white transition-all
            ${isProcessing ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-gray-50"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div>
                <img
                  src={withdraw}
                  alt=""
                  className="h-8 w-8 sm:h-10 sm:w-10"
                />
              </div>
              <div>
                <p className="text-sm font-medium md:text-base">
                  Pay with PayStack
                </p>
                <small className="text-xs text-gray-500 md:text-sm">
                  Fund with Naira Cards
                </small>
              </div>
            </div>
            <div>
              {isProcessing ? (
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              ) : (
                <IoIosArrowForward size={25} className="cursor-pointer" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PayWithPaystack;
