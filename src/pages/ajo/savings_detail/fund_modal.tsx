import React, { useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { useUserProfile } from "../../../shared/Hooks/useUserProfile";

import debitIcon from "../../../Assets/svg/dashboard/ajo/fund_debit.svg";
import walletIcon from "../../../Assets/svg/dashboard/ajo/fund_wallet.svg";
import SavingsCirclePayment from "./SavingsCirclePayment";

// Define payment type options interface
export interface PaymentOption {
  icon: string;
  header: string;
  text: string;
  type: "card" | "wallet";
}

export interface FundModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  circleId: string;
  depositAmount: number;
  circleName: string;
  // Customization props
  className?: string;
  headerClassName?: string;
  closeButtonClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  paymentOptionClassName?: string;
  paymentIconClassName?: string;
  paymentTextClassName?: string;
  paymentArrowClassName?: string;
  // Custom payment options
  paymentOptions?: PaymentOption[];
  // Custom callbacks
  onClose?: () => void;
  onPaymentSelect?: (type: "card" | "wallet") => void;
}

const FundModal: React.FC<FundModalProps> = ({
  isOpen,
  setIsOpen,
  circleId,
  depositAmount,
  circleName,
  className = "",
  headerClassName = "",
  closeButtonClassName = "",
  titleClassName = "",
  bodyClassName = "",
  paymentOptionClassName = "",
  paymentIconClassName = "",
  paymentTextClassName = "",
  paymentArrowClassName = "",
  paymentOptions,
  onClose,
  onPaymentSelect,
}) => {
  const { profileDetails } = useUserProfile();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<
    "card" | "wallet" | null
  >(null);

  // Default payment options using existing icons
  const defaultPaymentOptions: PaymentOption[] = [
    {
      icon: debitIcon,
      header: "Debit/Credit Card",
      text: "Fund with dollar cards",
      type: "card",
    },
    {
      icon: walletIcon,
      header: "Pay with Chain Co-op wallet",
      text: "Fund with your existing balance",
      type: "wallet",
    },
  ];

  const options = paymentOptions || defaultPaymentOptions;

  const handlePaymentSelect = (type: "card" | "wallet") => {
    setSelectedPaymentType(type);
    setShowPayment(true);
    onPaymentSelect?.(type);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedPaymentType(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm backdrop-brightness-75 ${className}`}
      >
        <div className="w-full max-w-md rounded-xl bg-white p-6">
          <div
            className={`relative flex w-full items-center justify-center ${headerClassName}`}
          >
            <button
              onClick={handleClose}
              className={`absolute left-4 flex h-[30px] w-[30px] items-center justify-center self-start rounded-full bg-[#72889D1A] ${closeButtonClassName}`}
            >
              <IoClose className="text-[20px] text-[#430280]" />
            </button>
            <h2
              className={`font-asap text-[24px] font-[600] tracking-tighter text-[#440080] ${titleClassName}`}
            >
              Fund Group Savings
            </h2>
          </div>

          <div
            className={`flex w-full flex-col items-center justify-center rounded-xl bg-white p-3 sm:p-6 ${bodyClassName}`}
          >
            {options.map((item, index) => (
              <div
                className={`flex w-full cursor-pointer items-center justify-between border-b border-[#1E1E1E30] py-2 last:border-0 last:pb-4 ${paymentOptionClassName}`}
                key={index}
                onClick={() => handlePaymentSelect(item.type)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#72889D1A] ${paymentIconClassName}`}
                  >
                    <img
                      src={item.icon}
                      alt={item.header}
                      className="h-[20px] w-[20px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4
                      className={`font-asap text-[16px] font-[400] tracking-tight text-black ${paymentTextClassName}`}
                    >
                      {item.header}
                    </h4>
                    <p
                      className={`font-asap text-[12px] font-[400] tracking-normal text-[#546678] ${paymentTextClassName}`}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
                <FaAngleRight
                  className={`text-[16px] text-black ${paymentArrowClassName}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPayment && profileDetails?._id && (
        <SavingsCirclePayment
          isOpen={showPayment}
          onClose={handleClosePayment}
          circleId={circleId}
          userId={profileDetails._id}
          depositAmount={depositAmount}
          circleName={circleName}
        />
      )}
    </>
  );
};

export default FundModal;
