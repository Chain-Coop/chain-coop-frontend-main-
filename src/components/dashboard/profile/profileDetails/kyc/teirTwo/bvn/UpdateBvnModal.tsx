import React, { useState } from "react";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import FormInput from "../../../../../../common/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { UpdateBvn } from "../../../../../../../shared/redux/slices/kyc.slices";
import { AppDispatch } from "../../../../../../../shared/redux/store";
import { toast } from "react-toastify";
import { GetUserProfile } from "../../../../../../../shared/redux/slices/landing.slices";

interface BvnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateBvnModal = ({ isOpen, onClose }: BvnModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [idNumber, setIdNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loading } = useSelector((state: any) => state.kyc) || {
    loading: false,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await dispatch(UpdateBvn({ idNumber }));

      if (UpdateBvn.fulfilled.match(result)) {
        console.log("result", result);
        toast.success("BVN updated successfully!");
        await dispatch(GetUserProfile());
        onClose();
      } else if (UpdateBvn.rejected.match(result)) {
        toast.error(
          typeof result.payload === "string" && result.payload
            ? result.payload
            : "Failed to update BVN",
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog
        size="md"
        open={isOpen}
        handler={onClose}
        className="py-14"
        dismiss={{ enabled: false }}
      >
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={onClose}
            className="absolute left-4 top-4 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>
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
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
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
    </>
  );
};

export default UpdateBvnModal;
