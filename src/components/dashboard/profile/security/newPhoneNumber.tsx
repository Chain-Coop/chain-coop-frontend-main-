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
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import { PhoneNumberInput } from "../../../common/phoneNumberInput";
import { UPDATE_PHONE_NUMBER } from "../../../../shared/redux/services/landing.services";
import { useAppSelector } from "../../../../shared/redux/reduxHooks";
import { RootState } from "../../../../shared/redux/rootReducer";
import { GetUserProfile } from "../../../../shared/redux/slices/landing.slices";

interface NewPhoneNumberProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewPhoneNumber = ({
  isOpen,
  onClose,
  onSuccess,
}: NewPhoneNumberProps) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { getProfile } = useAppSelector((state: RootState) => state.landing);

  // const handleSubmit = async () => {
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     const response = await UPDATE_PHONE_NUMBER("/auth/change_phone_number", {
  //       newPhoneNumber,
  //       userId: getProfile?.id,
  //     });

  //     if (response.status === 200) {
  //       await GetUserProfile();
  //       onSuccess();
  //     } else {
  //       const errorMsg = response.data?.msg || "Failed to update phone number";
  //       setError(errorMsg);
  //       toast.error(errorMsg);
  //     }
  //   } catch (error: any) {
  //     const errorMsg = error?.message || "Failed to update phone number";
  //     setError(errorMsg);
  //     toast.error(errorMsg);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
      className="bg-[#E9E9E9] p-4 sm:p-6"
      dismiss={{ enabled: false }}
    >
      <DialogHeader className="relative flex flex-col justify-center text-center">
        <IconButton
          variant="text"
          color="gray"
          onClick={onClose}
          className="absolute left-2 top-2 h-10 w-10 p-2"
          ripple={false}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <IoMdClose size={24} className="m-auto text-gray-700" />
        </IconButton>

        <Typography variant="h4" className="text-xl font-semibold sm:text-2xl">
          Update Phone Number
        </Typography>
        <Typography
          color="gray"
          className="mt-1 text-sm font-normal sm:text-base"
        >
          Enter your new phone number
        </Typography>
      </DialogHeader>

      <DialogBody>
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="phoneNumber-input"
            className="text-textPrimary mb-2 flex font-semibold"
          >
            Phone Number
          </label>
          <PhoneNumberInput
            value={newPhoneNumber}
            onChange={setNewPhoneNumber}
          />
        </div>

        {error && (
          <Typography color="red" className="text-center text-xs sm:text-sm">
            {error}
          </Typography>
        )}
      </DialogBody>

      <DialogFooter className="flex justify-center">
        <Button
          variant="filled"
          // onClick={handleSubmit}
          disabled={isLoading || !newPhoneNumber}
          loading={isLoading}
          className="flex w-full justify-center rounded-full bg-text2 text-sm font-normal normal-case sm:w-[60%] sm:py-3 lg:py-2"
        >
          Update Phone Number
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default NewPhoneNumber;
