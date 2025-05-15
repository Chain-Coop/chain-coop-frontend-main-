import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../shared/redux/store";
import OtpPin from "../../../../../shared/utils/OtpInput";
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
import {
  VerifyUserAuth,
  ResendEmailOtp,
  resetAuthState,
} from "../../../../../shared/redux/slices/landing.slices";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../../shared/redux/reduxHooks";
import { RootState } from "../../../../../shared/redux/rootReducer";
import { Alert } from "@mui/material";

interface OtpInputProps {
  otp: string;
  setOtp: (otp: string) => void;
  onClose: () => void;
  onOtpEntered: () => void;
  isOpen: boolean;
  email: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  otp,
  setOtp,
  onClose,
  onOtpEntered,
  isOpen,
  email,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, error, verifyEmailSuccess } = useAppSelector(
    (state: RootState) => state.landing,
  );
  const [localError, setLocalError] = useState("");
  const [submittedOtp, setSubmittedOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState<number>(0);

  useEffect(() => {
    dispatch(resetAuthState());

    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (otp.length === 6 && !submittedOtp) {
      handleVerify();
    }
  }, [otp]);

  useEffect(() => {
    if (verifyEmailSuccess && submittedOtp) {
      toast.success("OTP verified successfully");
      onOtpEntered();
      dispatch(resetAuthState());
    }

    if (error && submittedOtp) {
      toast.error(error);
      setLocalError(error);
      setOtp("");
      setSubmittedOtp(false);
    }
  }, [verifyEmailSuccess, error, onOtpEntered, submittedOtp, dispatch]);

  useEffect(() => {
    const countdown =
      resendTimer > 0 &&
      setInterval(() => setResendTimer(resendTimer - 1), 1000);
    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [resendTimer]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setLocalError("Please enter a 6-digit OTP");
      return;
    }

    setLocalError("");
    setSubmittedOtp(true);
    dispatch(resetAuthState());
    dispatch(VerifyUserAuth({ otp, email }));
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email is missing. Please try again.");
      return;
    }

    dispatch(resetAuthState());
    setSubmittedOtp(false);

    dispatch(ResendEmailOtp({ email }))
      .unwrap()
      .then((response) => {
        toast.success(response.msg || "OTP sent successfully");
        setResendTimer(30);
        setOtp("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getResendButtonText = () => {
    if (isLoading && !submittedOtp) return "Sending OTP...";
    if (resendTimer > 0) return `Resend OTP (${resendTimer}s)`;
    return "Resend OTP";
  };

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
          Reset Password
        </Typography>
        <Typography
          color="gray"
          className="mt-1 text-sm font-normal sm:text-base"
        >
          Enter Your OTP code
        </Typography>
      </DialogHeader>

      <DialogBody>
        <div className="mb-4 flex justify-center sm:mb-6">
          <OtpPin
            length={6}
            value={otp}
            className="mt-2 sm:mt-4"
            onChange={setOtp}
            gap={1}
          />
        </div>

        {(localError || error) && (
          <Alert severity="error" className="mx-auto my-2 w-fit">
            {localError || error}
          </Alert>
        )}

        {isLoading && submittedOtp && (
          <Typography className="text-center text-xs text-gray-600 sm:text-sm">
            Verifying OTP...
          </Typography>
        )}
      </DialogBody>

      <DialogFooter className="flex flex-col items-center justify-center gap-3">
        <Button
          variant="filled"
          onClick={handleVerify}
          disabled={isLoading || otp.length !== 6}
          loading={isLoading && submittedOtp}
          className="flex w-full justify-center rounded-full bg-text2 text-sm font-normal normal-case sm:w-[60%] sm:py-3 lg:py-2"
        >
          Verify
        </Button>

        <Button
          variant="text"
          onClick={handleResendOtp}
          disabled={isLoading || resendTimer > 0}
          className="flex justify-center text-sm font-normal normal-case text-gray-700"
        >
          {getResendButtonText()}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default OtpInput;
