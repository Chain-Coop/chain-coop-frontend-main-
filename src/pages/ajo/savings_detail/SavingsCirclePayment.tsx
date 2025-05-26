import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useSavingCirclePayment } from "../../../shared/Hooks/useTransactions";
import { IoClose } from "react-icons/io5";

export interface CircleData {
  _id: string;
  name: string;
  depositAmount: number;
  [key: string]: any; // Allow additional circle data
}

export interface PaymentConfig {
  method?: string;
  provider?: string;
  callbackUrl?: string;
  additionalData?: Record<string, any>;
}

export interface SavingsCirclePaymentProps {
  // Required props
  isOpen: boolean;
  onClose: () => void;
  circleId: string;
  userId: string;
  depositAmount: number;
  circleName: string;

  // Optional props
  paymentConfig?: PaymentConfig;

  // Customization props
  className?: string;
  modalClassName?: string;
  headerClassName?: string;
  closeButtonClassName?: string;
  closeIconClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  amountLabelClassName?: string;
  amountValueClassName?: string;
  methodLabelClassName?: string;
  methodValueClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  snackbarClassName?: string;
  alertClassName?: string;

  // Custom callbacks
  onPaymentStart?: () => void;
  onPaymentSuccess?: (response: any) => void;
  onPaymentError?: (error: any) => void;
  onCloseError?: () => void;
  onModalClose?: () => void;
}

const SavingsCirclePayment: React.FC<SavingsCirclePaymentProps> = ({
  isOpen,
  onClose,
  circleId,
  userId,
  depositAmount,
  circleName,
  paymentConfig = {},
  className = "",
  modalClassName = "",
  headerClassName = "",
  closeButtonClassName = "",
  closeIconClassName = "",
  titleClassName = "",
  bodyClassName = "",
  amountLabelClassName = "",
  amountValueClassName = "",
  methodLabelClassName = "",
  methodValueClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  snackbarClassName = "",
  alertClassName = "",
  onPaymentStart,
  onPaymentSuccess,
  onPaymentError,
  onCloseError,
  onModalClose,
}) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { initializePayment, isLoading } = useSavingCirclePayment();

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      onPaymentStart?.();

      const circleData: CircleData = {
        _id: circleId,
        name: circleName,
        depositAmount,
        ...paymentConfig.additionalData,
      };

      const callbackUrl =
        paymentConfig.callbackUrl ||
        `${window.location.origin}/dashboard/payment-callback?circleName=${encodeURIComponent(circleName)}&circleData=${encodeURIComponent(
          JSON.stringify(circleData),
        )}`;

      const response = await initializePayment({
        circleId,
        userId,
        depositAmount,
        paymentType: paymentConfig.provider || "paystack",
        callbackUrl,
      });

      if (response?.data?.redirect_url) {
        onPaymentSuccess?.(response);
        window.location.href = response.data.redirect_url;
      } else {
        const errorMessage = "Failed to initialize payment. Please try again.";
        setError(errorMessage);
        onPaymentError?.({ message: errorMessage });
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while processing payment. Please try again.";
      setError(errorMessage);
      onPaymentError?.(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    onClose();
    onModalClose?.();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm backdrop-brightness-75 ${className}`}
      >
        <div
          className={`w-full max-w-md rounded-xl bg-white p-6 ${modalClassName}`}
        >
          <div
            className={`flex w-full items-center justify-between ${headerClassName}`}
          >
            <h4
              className={`font-asap text-[20px] font-[600] text-[#1E1E1E] ${titleClassName}`}
            >
              Fund Savings Circle
            </h4>
            <button
              onClick={handleClose}
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#72889D1A] ${closeButtonClassName}`}
            >
              <IoClose
                className={`text-[20px] text-[#430280] ${closeIconClassName}`}
              />
            </button>
          </div>

          <div className={`mt-6 w-full space-y-4 ${bodyClassName}`}>
            <div className="flex justify-between">
              <span className={`text-gray-600 ${amountLabelClassName}`}>
                Amount
              </span>
              <span className={`font-semibold ${amountValueClassName}`}>
                ${(depositAmount || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={`text-gray-600 ${methodLabelClassName}`}>
                Payment Method
              </span>
              <span className={`font-semibold ${methodValueClassName}`}>
                {paymentConfig.method || "Paystack"}
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing || isLoading}
            className={`mt-8 w-full rounded-md bg-[#440080] py-2 text-white disabled:opacity-50 ${buttonClassName}`}
          >
            <span className={buttonTextClassName}>
              {isProcessing || isLoading
                ? "Processing..."
                : "Proceed to Payment"}
            </span>
          </button>
        </div>
      </div>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => {
          setError(null);
          onCloseError?.();
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }}
        className={snackbarClassName}
      >
        <Alert
          onClose={() => {
            setError(null);
            onCloseError?.();
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
          className={alertClassName}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SavingsCirclePayment;
