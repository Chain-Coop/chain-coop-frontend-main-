import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../shared/redux/store";
import { toast } from "react-toastify";
import { kycPhoneOtp } from "../../../../../../../shared/redux/slices/kyc.slices";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Button,
  DialogFooter,
} from "@material-tailwind/react";

interface TierOneSecondModalProps {
  onClose: () => void;
  onSuccess: (reference: string) => void;
  open: boolean;
}

const TierOneSecondModal: React.FC<TierOneSecondModalProps> = ({
  onClose,
  onSuccess,
  open,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const getOtp = (e: any) => {
    e.preventDefault();

    setLoading(true);

    dispatch(kycPhoneOtp())
      .unwrap()
      .then((response) => {
        setLoading(false);
        toast.success(response.message);
        onSuccess(response.reference);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    <Dialog open={open} handler={onClose} size="sm" className="bg-white py-4">
      <DialogHeader className="justify-center">
        <Typography
          variant="h2"
          className="text-base font-bold leading-tight sm:text-lg md:text-lg"
        >
          Update your Phone Number
        </Typography>
      </DialogHeader>

      <DialogBody>
        <article className="px-2 text-center sm:px-3">
          <Typography variant="small" className="font-medium text-gray-600">
            Upload your phone number for verification process.
          </Typography>
        </article>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          onClick={getOtp}
          disabled={loading}
          loading={loading}
          className="flex items-center gap-2 bg-transparent text-lg font-semibold normal-case text-text2 shadow-none"
        >
          {loading ? "Generating..." : "Generate OTP"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default TierOneSecondModal;
