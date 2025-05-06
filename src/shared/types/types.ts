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
  isModalOpen?: boolean;
  toggleModal?: () => void;
  amount?: string;
  error?: string;
  handleAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContinue?: () => void;
  withdrawalLimit?: number;
  walletType?: "naira" | "crypto";
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

export interface Card {
  authorization_code: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  card_type: string;
  bank: string;
  brand: string;
}

export interface PaymentOptionProps {
  onSelect: (paymentType: "paystack") => void;
  isProcessing: boolean;
  isOpen: boolean;
  onClose: () => void;
  handler?: () => void;
  error?: string;
  handleCloseError?: () => void;
}

export interface firstOpenGroupType {
  savings_title: string;
  savings_description: string;
  savings_currency: string;
  currency_image: string;
}

export interface secondOpenGroupType {
  total_saving_amount: string;
  savings_frequency: string;
  start_date: string;
  end_date: string;
}

export interface thirdOpenGroupType {
  daily_deposit: number;
  savings_image: Blob | null;
  agree: boolean;
}

export interface openGroupFormType {
  firstForm: firstOpenGroupType;
  secondForm: secondOpenGroupType;
  thirdForm: thirdOpenGroupType;
}

export interface WithdrawUserPoolPayload {
  poolId_bytes: string;
  pin: string;
}

export interface Pool {
  _id: string;
  poolId: string;
  tokenSymbol: string;
  poolType: "periodic" | "oneTime";
  reason: string;
  initialAmount: string;
  duration: number;
  totalAmount: string;
  tokenAddress: string;
  lockType: 0 | 1 | 2;
  isActive: boolean;
  interval?: string;
  periodicAmount?: number | string;
  createdAt?: string;
}

export interface CryptoTransaction {
  _id: string;
  user: string;
  transactionType: "SAVE" | "WITHDRAW" | "TRANSFER" | string;
  amount: number;
  Token: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
