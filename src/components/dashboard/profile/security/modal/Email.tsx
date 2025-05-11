import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUserProfile from "../../../../../shared/Hooks/useUserProfile";
import { ResetPassword } from "../../../../../shared/redux/slices/landing.slices";
import { AppDispatch } from "../../../../../shared/redux/store";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import FormInput from "../../../../common/FormInput";
import { IoMdClose } from "react-icons/io";

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  onEmailSent: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const EmailStep = ({
  email,
  setEmail,
  onEmailSent,
  isOpen,
  onClose,
}: EmailStepProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { profileDetails } = useUserProfile();
  const { isLoading, error, success } = useSelector(
    (state: any) => state.landing,
  );

  useEffect(() => {
    setEmail(profileDetails?.email);
  }, [profileDetails?.email, setEmail]);

  useEffect(() => {
    if (success) {
      onEmailSent();
    }
  }, [success, onEmailSent]);

  const handleOtpMail = async () => {
    try {
      await dispatch(ResetPassword({ email }));
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
      className="p-4 "
      dismiss={{ enabled: false }}
    >
      <DialogHeader className="relative justify-center pt-10">
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

        <Typography variant="h4" className="font-semibold">
          Reset Password
        </Typography>
      </DialogHeader>

      <DialogBody>
        <FormInput
          label="Email"
          type="email"
          value={email}
          readOnly
          className="border-none"
          labelClassName="text-text2"
          inputWrapperClassName="text-black font-normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <Typography color="red" className="text-center">
            {error}
          </Typography>
        )}
      </DialogBody>

      <DialogFooter className="flex justify-center">
        <Button
          variant="filled"
          onClick={handleOtpMail}
          disabled={isLoading}
          loading={isLoading}
          className="flex w-[70%] items-center justify-center rounded-full bg-text2 p-3 text-sm font-normal normal-case"
        >
          {isLoading ? "Please Wait..." : "Reset"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EmailStep;
