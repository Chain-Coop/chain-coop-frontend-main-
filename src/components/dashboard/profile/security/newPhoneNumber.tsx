import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../shared/redux/store";
import {
  GetUserProfile,
  UpdatePhoneNumber,
} from "../../../../shared/redux/slices/landing.slices";
import { useUserProfile } from "../../../../shared/Hooks/useUserProfile";
import { PhoneNumberInput } from "../../../common/phoneNumberInput";
import { UpdatePhoneNumberRequest } from "../../../../shared/types";

interface NewPhoneNumberProps {
  otp: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewPhoneNumber: React.FC<NewPhoneNumberProps> = ({
  otp,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { profileDetails } = useUserProfile();
  const dispatch: AppDispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (!newPhoneNumber) {
      setError("Please enter a new phone number");
      return;
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(newPhoneNumber)) {
      setError("Please enter a valid phone number (e.g., +1234567890)");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const payload: UpdatePhoneNumberRequest = {
        userId: profileDetails?.id || "",
        otp,
        newPhoneNumber,
      };
      const response = await dispatch(UpdatePhoneNumber(payload)).unwrap();
      if (response) {
        await dispatch(GetUserProfile()).unwrap();
        toast.success("Phone number updated successfully");
        onSuccess();
      } else {
        throw new Error("Failed to update phone number");
      }
    } catch (error: any) {
      const errorMessage = error || "Failed to update phone number";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      open={isOpen}
      handler={onClose}
      size="sm"
      className="bg-[#E9E9E9] p-4 sm:p-6"
      dismiss={{ enabled: false }}
    >
      <DialogHeader className="relative flex justify-center px-2 text-center sm:px-4">
        <div className="absolute left-2 top-2">
          <IconButton
            variant="text"
            color="gray"
            onClick={onClose}
            className="h-10 w-10 p-0 hover:bg-gray-100"
            disabled={isLoading}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            placeholder=""
          >
            <IoMdClose size={24} className="text-text2" />
          </IconButton>
        </div>
        <Typography variant="h5" className="text-2xl font-semibold">
          Update Phone Number
        </Typography>
      </DialogHeader>
      <DialogBody className="overflow-y-auto text-center text-black">
        <Typography className="font-normal">
          Enter your new phone number
        </Typography>
        <div className="mt-4">
          <PhoneNumberInput
            value={newPhoneNumber}
            onChange={(value) => setNewPhoneNumber(value)}
            disabled={isLoading}
          />
          {error && (
            <Typography color="red" className="mt-2 text-sm">
              {error}
            </Typography>
          )}
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          loading={isLoading}
          className="flex items-center gap-2 rounded-full bg-text2 text-lg font-normal normal-case text-white"
        >
          Update Phone Number
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default NewPhoneNumber;
