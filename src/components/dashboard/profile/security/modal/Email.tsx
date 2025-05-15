import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ResendEmailOtp } from "../../../../../shared/redux/slices/landing.slices";
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
import { RootState } from "../../../../../shared/redux/rootReducer";
import { useAppSelector } from "../../../../../shared/redux/reduxHooks";
import { useUserProfile } from "../../../../../shared/Hooks/useUserProfile";

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
  const { isLoading, error } = useAppSelector(
    (state: RootState) => state.landing,
  );
  const { profileDetails } = useUserProfile();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setEmail(profileDetails?.email || "");
  }, [profileDetails?.email, setEmail]);

  const handleOtpMail = async () => {
    try {
      setSubmitting(true);
      const resultAction = await dispatch(ResendEmailOtp({ email }));

      if (ResendEmailOtp.fulfilled.match(resultAction)) {
        onEmailSent();
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
    } finally {
      setSubmitting(false);
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
          disabled={isLoading || submitting}
          loading={isLoading || submitting}
          className="flex w-[70%] items-center justify-center rounded-full bg-text2 p-3 text-sm font-normal normal-case"
        >
          Reset
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EmailStep;
