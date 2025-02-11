import { InputHTMLAttributes } from "react";

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStepOneClick?: () => void;
  onSuccess?: (reference: string) => void;
  isVerified?: boolean;
  open?: boolean;
  reference?: string;
  onSwitchToWhatsapp?: () => void;
  onVerificationSuccess?: () => void;
  onBack?: () => void;
  title?: string;
}

export interface WithdrawAmountModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  amount: string;
  error: string;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContinue: () => void;
  withdrawalLimit: number;
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  rightElement?: React.ReactNode;
  elementPosition?: "left" | "right";
  helperText?: React.ReactNode;
  customInput?: React.ReactNode;
  paddingY?: string;
}

export interface PinModalProps {
  isOpen: boolean;
  onClose: (account?: any) => void;
  onClick?: () => void;
  onSubmit: (pin: string) => void;
  title: string;
  header: string;
  error?: string;
  loading?: boolean;
  pin: string;
  onPinChange: (pin: string) => void;
}
export interface PINInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
  showVisibilityToggle?: boolean;
  label?: string;
  gap?: number;
}
