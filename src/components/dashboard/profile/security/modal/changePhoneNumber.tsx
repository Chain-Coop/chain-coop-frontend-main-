import { useEffect, useState } from "react";
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
import { RESEND_LOGIN_OTP } from "../../../../../shared/redux/services/landing.services";
import { toast } from "react-toastify";
import { RootState } from "../../../../../shared/redux/rootReducer";
import { useAppSelector } from "../../../../../shared/redux/reduxHooks";

interface ChangePhoneNumberProps {
  email: string;
  setEmail: (email: string) => void;
  onEmailSent: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ChangePhoneNumber = ({
  email,
  setEmail,
  onEmailSent,
  isOpen,
  onClose,
}: ChangePhoneNumberProps) => {
  const { getProfile } = useAppSelector((state: RootState) => state.landing);
  const [error, setError] = useState("");
  const [isOtpSending, setIsOtpSending] = useState(false);

  useEffect(() => {
    if (getProfile?.email) {
      setEmail(getProfile.email);
    }
  }, [getProfile?.email, setEmail]);

  const GetOtp = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setIsOtpSending(true);
    try {
      const response = await RESEND_LOGIN_OTP("/auth/resend_otp", { email });
      toast.success(response.data.msg || "OTP sent to your email");
      onEmailSent();
    } catch (error: any) {
      toast.error(error?.message || "Failed to send OTP");
      setError(error?.message || "Failed to send OTP");
    } finally {
      setIsOtpSending(false);
    }
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
      className="bg-[#E9E9E9] p-4 sm:p-6"
      dismiss={{ enabled: false }}
      s
    >
      <DialogHeader className="relative flex flex-col justify-center pt-10 text-center">
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
          Change Phone Number
        </Typography>
        <Typography
          color="gray"
          className="mt-1 text-sm font-normal sm:text-base"
        >
          We'll send an OTP to verify your identity
        </Typography>
      </DialogHeader>

      <DialogBody>
        <FormInput
          label="Email"
          type="email"
          value={email}
          readOnly
          className="border-none text-lg"
          labelClassName="text-text2"
          inputWrapperClassName="text-black font-normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <Typography color="red" className="text-center text-xs sm:text-sm">
            {error}
          </Typography>
        )}
      </DialogBody>

      <DialogFooter className="flex justify-center">
        <Button
          variant="filled"
          onClick={GetOtp}
          disabled={isOtpSending}
          loading={isOtpSending}
          className="flex w-full justify-center rounded-full bg-text2 text-sm font-normal normal-case sm:w-[60%] sm:py-3 lg:py-2"
        >
          Get OTP
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ChangePhoneNumber;
