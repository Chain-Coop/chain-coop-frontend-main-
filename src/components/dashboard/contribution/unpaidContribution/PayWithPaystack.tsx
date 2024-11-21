import React from "react";
import { IoIosArrowForward } from "react-icons/io";
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
    <div className="flex w-[30em] flex-col gap-6 p-6">
      <header className="text-center">
        <h1 className="text-lg font-bold text-text2">Fund Contribution</h1>
      </header>

      <section className="rounded-3xl bg-white p-6">
        <div
          onClick={() => onSelect("paystack")}
          className="flex w-full cursor-pointer flex-col justify-center gap-4 rounded-3xl bg-white p-2"
        >
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div>
                <img src={withdraw} alt="" />
              </div>
              <div>
                <p className="font-medium">Pay with PayStack</p>
                <small className="text-gray-500">Fund with Naira Cards</small>
              </div>
            </div>
            <div>
              <IoIosArrowForward size={25} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PayWithPaystack;
