import React, { useState } from "react";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import FormInput from "../../../../../../common/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { UpdateBvn } from "../../../../../../../shared/redux/slices/kyc.slices";
import { AppDispatch } from "../../../../../../../shared/redux/store";
import VerifyBvn from "./VerifyBvn";

interface BvnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateBvnModal = ({ isOpen, onClose }: BvnModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [bvn, setBvn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const { loading } = useSelector((state: any) => state.kyc) || {
    loading: false,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(UpdateBvn({ bvn }));
      setShowVerifyModal(true);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyClose = () => {
    setShowVerifyModal(false);
    onClose();
  };

  return (
    <>
      <Dialog
        size="md"
        open={isOpen && !showVerifyModal}
        handler={onClose}
        className="py-14"
        dismiss={{ enabled: false }}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader className="flex flex-col justify-center text-center">
            <Typography className="text-lg font-semibold leading-tight text-black lg:text-2xl">
              Update Your BVN
            </Typography>
            <Typography className="mt-2 font-normal text-gray-600">
              Enter your BVN for verification process.
            </Typography>
          </DialogHeader>

          <DialogBody className="mx-auto max-w-md">
            <FormInput
              label="Enter your BVN"
              type="text"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              labelClassName="text-black text-text2"
              autoComplete="off"
              className="rounded-lg"
              paddingY="3"
              maxLength={11}
              pattern="[0-9]{11}"
              placeholder="Enter 11-digit BVN"
              required
            />
          </DialogBody>

          <DialogFooter className="mx-auto max-w-sm">
            <Button
              type="submit"
              loading={loading}
              disabled={loading || isSubmitting}
              className="w-full items-center justify-center rounded-lg bg-text2 text-center text-sm font-semibold normal-case text-text5"
            >
              {loading || isSubmitting ? "Processing..." : "Next"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      <VerifyBvn
        bvn={bvn}
        isOpen={showVerifyModal}
        onClose={handleVerifyClose}
      />
    </>
  );
};

export default UpdateBvnModal;
