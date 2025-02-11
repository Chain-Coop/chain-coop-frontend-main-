import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../shared/redux/store";
import { toast } from "react-toastify";
import { kycWhatsAppOtp } from "../../../../../../../shared/redux/slices/kyc.slices";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface WhatsAppVerificationModalProps {
  onClose: () => void;
  onBack: () => void;
  onOtpSuccess: (reference: string) => void;
  open: boolean;
}

const WhatsappOtpModal: React.FC<WhatsAppVerificationModalProps> = ({
  onClose,
  onBack,
  onOtpSuccess,
  open,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getOtp = async (e: React.MouseEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await dispatch(kycWhatsAppOtp()).unwrap();
      toast.success(response.message);
      onOtpSuccess(response.reference);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      className="py-4"
      size="sm"
      dismiss={{
        outsidePress: false,
      }}
    >
      <DialogHeader className="justify-center">
        <h2 className="text-base font-bold leading-tight sm:text-lg md:text-lg">
          WhatsApp Verification
        </h2>
      </DialogHeader>

      <DialogBody>
        <article className="px-2 text-center sm:px-3">
          <p className="text-sm font-medium text-gray-600">
            Generate an OTP code that will be sent to your WhatsApp number.
          </p>
        </article>

        <div className="mt-[1em] flex justify-center">
          <Button
            onClick={getOtp}
            disabled={loading}
            loading={loading}
            className={`bg-transparent text-center text-lg font-semibold normal-case text-text2 shadow-none ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {loading ? "Generating..." : "Generate OTP"}
          </Button>
        </div>
      </DialogBody>

      <DialogFooter className="justify-center">
        <button onClick={onBack} className="text-sm font-semibold text-red-500">
          Back to SMS verification
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default WhatsappOtpModal;
