import React, { useState } from "react";
import usePasswordToggle from "../../../../../shared/utils/usePasswordToggle";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { RESET_PASSWORD } from "../../../../../shared/redux/services/landing.services";
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
import FormInput from "../../../../common/FormInput";

interface NewPasswordProps {
  email: string;
  otp: string;
  onSuccess: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const NewPassword: React.FC<NewPasswordProps> = ({
  email,
  otp,
  onSuccess,
  onClose,
  isOpen,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordType, togglePasswordType] = usePasswordToggle();
  const [confirmPasswordType, toggleConfirmPasswordType] = usePasswordToggle();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetPasswordFunc = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = `/auth/reset_password`;

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await RESET_PASSWORD(endpoint, {
        email,
        otp,
        password: newPassword,
        confirmPassword: confirmNewPassword,
      });
      setLoading(false);
      if (response?.status === 200) {
        setError("");
        onSuccess();
      } else {
        setError(response.data.msg || "Error resetting password");
      }
    } catch (error) {
      setLoading(false);
      setError("Error resetting password");
    }
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
      className="bg-[#E9E9E9] p-4"
    >
      <form onSubmit={resetPasswordFunc}>
        <DialogHeader className="relative justify-center">
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

        <DialogBody className="flex flex-col gap-6">
          <div>
            <FormInput
              label="Password"
              type={passwordType}
              id="password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              labelClassName="text-text2"
              disabled={loading}
              autoComplete="new-password"
              inputWrapperClassName="text-black font-normal"
              required
              paddingY="3"
              rightElement={
                <button type="button" onClick={togglePasswordType}>
                  {passwordType === "password" ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              }
            />
          </div>

          <div>
            <FormInput
              label="Re-Enter New Password"
              type={confirmPasswordType}
              id="confirm-password-input"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm Password"
              labelClassName="text-text2"
              inputWrapperClassName="text-black font-normal"
              disabled={loading}
              paddingY="3"
              required
              rightElement={
                <button type="button" onClick={toggleConfirmPasswordType}>
                  {confirmPasswordType === "password" ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              }
            />
          </div>

          {error && (
            <Typography
              variant="small"
              color="red"
              className="text-center font-medium"
            >
              {error}
            </Typography>
          )}
        </DialogBody>

        <DialogFooter className="flex justify-center pb-6">
          <Button
            variant="filled"
            type="submit"
            disabled={loading}
            loading={loading}
            className="flex w-60 items-center justify-center rounded-full bg-text2 p-3 text-sm font-medium normal-case text-white"
          >
            {loading ? "Resetting..." : "Reset"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default NewPassword;
