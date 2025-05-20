import { InputHTMLAttributes } from "react";

export interface ApiError {
  msg: string;
}

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
  id: string;
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
  depositAmount: number;
  savings_image: File | null;
  agree: boolean;
}

export interface openGroupFormType {
  firstForm: firstOpenGroupType;
  secondForm: secondOpenGroupType;
  thirdForm: thirdOpenGroupType;
}

export interface PrepareDataType {
  name: string;
  description?: string;
  depositAmount: number;
  currency: string;
  savingFrequency: string;
  goalAmount: number;
  groupType: string;
  startDate: string;
  endDate: string;
  userId: string;
  image?: Blob;
}

export interface WithdrawUserPoolPayload {
  poolId_bytes: string;
  pin: string;
}

export interface WithdrawAutoUserPoolPayload {
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
  transactions: {
    txHash: string;
  };
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
  cryptoAsset: string;
  reference: string;
  status: string;
  rate: number;
  __v?: number;
}

export interface OrderData {
  amountInLocalCurrency: number;
  cryptoAsset: string;
  reference: string;
  transactionReference: string;
  currency: string;
  amountInCryptoAsset: number;
  cryptoRate: number;
  network?: string;
}

export interface OnrampConfirmResult {
  bankName: string;
  accountName: string;
  accountNumber: string;
  fiatAmount: number;
  message?: string;
}

export interface Web3State {
  onrampConfirmLoading: boolean;
  onrampConfirmError: string | null;
  onrampConfirmResult: OnrampConfirmResult | null;
}

export interface BankTransferProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  bankName: string;
  accountName: string;
  accountNumber: string;
  fiatAmount: number | string;
}

export interface ConfirmingPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface TokenInfo {
  tokenAddress: string;
  balance: number;
  tokenSymbol: string;
  network?: string;
}
