import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";

// src/types.ts
export interface ApiError {
  msg: string;
  status?: number;
}

export interface BackendError {
  status?: number;
  error?: string;
  msg?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  recaptchaToken?: string;
}

export interface LoginResponse {
  success: boolean;
  _id: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
  token: string;
  role: string;
  membershipStatus: string;
  membershipPaymentStatus: string;
}

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  membershipType: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    _id: string;
    email: string;
    token: string;
  };
}

export interface VerifyEmailRequest {
  otp: string;
  email: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  data: {
    _id: string;
    email: string;
    isVerified: boolean;
  };
}

export interface VerifyPhoneRequest {
  otp: string;
  userId: string;
  phoneNumber: string;
}

export interface VerifyPhoneResponse {
  success: boolean;
  data: {
    _id: string;
    phoneNumber: string;
    isVerified: boolean;
  };
}

export interface ResendEmailOtpRequest {
  email: string;
}

export interface ResendEmailOtpResponse {
  success: boolean;
  msg: string;
}

export interface ResendVerifyOtpRequest {
  phoneNumber: string;
}

export interface ResendVerifyOtpResponse {
  success: boolean;
  msg: string;
}

export interface JoinNewsLetterRequest {
  email: string;
}

export interface JoinNewsLetterResponse {
  success: boolean;
  msg: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  msg: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  msg: string;
}

export interface UserProfileResponse {
  success: boolean;
  _id: string;
  email: string;
  role: string;
  membershipType: string;
  username: string;
  phoneNumber: string;
  membershipStatus: string;
  membershipPaymentStatus: string;
  Tier: number;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  isWalletActivated: boolean;
  isBitcoinWalletActivated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  isPinCreated: boolean;
  profilePhoto?: {
    url: string;
    imageId: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  msg: string;
}

export interface UploadAvatarResponse {
  success: boolean;
  msg: string;
  profilePhoto: {
    url: string;
    imageId: string;
  };
}

export interface UpdatePhoneNumberRequest {
  userId: string;
  otp: string;
  newPhoneNumber: string;
}

export interface UpdatePhoneNumberResponse {
  success: boolean;
  msg: string;
}

export interface GetWalletBalanceResponse {
  _id: string;
  balance: number;
  pin: string;
  user: string;
  isPinCreated: boolean;
  hasWithdrawnBefore: boolean;
  bankAccounts: BankAccount[];
  fundedProjects: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  Card: CardData;
}

export interface FundWalletRequest {
  amount: number;
  paymentMethod?: string;
}

export interface FundWalletResponse {
  paymentUrl: string;
}

export interface VerifyFundWalletRequest {
  transactionId: string;
}

export interface VerifyFundWalletResponse {
  success: boolean;
  data: {
    transactionId: string;
    status: string;
  };
}

export interface Transaction {
  _id: string;
  amount: number;
  label: string;
  ref: string;
  type: "credit" | "debit";
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetUsersTransactionResponse extends Array<Transaction> {}

export interface BankAccount {
  accountNumber: string;
  bankCode: string;
  accountName: string;
  bankId: number;
  bankName: string;
  _id: string;
}

export interface WithdrawalFromWalletRequest {
  accountNumber: string;
  bankCode: string;
  amount: number;
  bankName: string;
  pin: string;
}

export interface WithdrawalFromWalletResponse {
  success: boolean;
  data: {
    withdrawalId: string;
    amount: number;
    status: string;
  };
}

export interface GetAllBanksResponse {
  success: boolean;
  data: Array<{
    bankCode: string;
    bankName: string;
  }>;
}

export interface GetAccountNameRequest {
  bankCode: string;
  accountNumber: string;
}
export interface GetAccountNameResponse {
  msg: string;
  result: {
    status: boolean;
    message: string;
    data: {
      account_number: string;
      account_name: string;
      bank_id: number;
    };
  };
}

export interface GeneratePinOTPResponse {
  success: boolean;
  data: {
    otpId: string;
  };
}

export interface CreateTransactionPinRequest {
  newpin: string;
  otp: string;
}

export interface CreateTransactionPinResponse {
  success: boolean;
  msg: string;
}

export interface DeleteCardRequest {
  cardId: string;
}

export interface DeleteCardResponse {
  success: boolean;
  msg: string;
}

export interface GetUsersContributionHistoryResponse {
  success: boolean;
  data: {
    contributions: Array<{
      contributionId: string;
      amount: number;
      date: string;
      status: string;
    }>;
    total: number;
    page: number;
    limit: number;
  };
}

export interface PayContributionRequest {
  contributionId: string;
  userId: string;
  paymentType: "card";
  cardAuthCode: string;
}

export interface PayContributionResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface PayContributionPaystackRequest {
  contributionId: string;
  userId: string;
  paymentType: "paystack";
}

export interface GetContributionDetailsByIdResponse {
  balance: number;
  contributionPlan: string;
  currency: string;
  savingsCategory: string;
  savingsType: string;
  contributionType: string;
  startDate: string;
  nextContributionDate: string;
  withdrawalDate: string;
  history: [{ savingsType: string; amount: number }];
  totalPages: number;
  currentPage: number;
  endDate: string;
}

export interface WithdrawalFromContributionRequest {
  contributionId: string;
  amount: number;
  pin: number;
}

export interface WithdrawalFromContributionResponse {
  message: string;
  amount: number;
  statusCode: number;
}

export interface PayUnPaidContributionRequest {
  contributionId: string;
  authorization_code?: string;
  paymentType?: string;
}

export interface PayUnPaidContributionResponse {
  payment: {
    info: {
      data: {
        authorization_url: string;
      };
    };
  };
}

export interface GetUnPaidBalanceResponse {
  totalAmount: number;
}

export interface GetAllProjectResponse {
  success: boolean;
  _id: string;
  title: string;
  description: string;
  status: string;
  fundBalance: number;
  projectPrice: number;
  author: {
    _id: string;
    email: string;
    username: string;
    id: string;
  };
  documentUrl: string;
  createdDate: string;
  updatedDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
  fundBalance: number;
  projectPrice: number;
  author: {
    _id: string;
    email: string;
    username: string;
    id: string;
  };
  documentUrl: string;
  createdDate: string;
  updatedDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetAllProjectResponse {
  data: Project[];
}

export interface Contribution {
  _id: string;
  savingsCategory: string;
  balance: number;
  savingsType: "Flexible" | "Lock" | "Strict";
  contributionType: "auto" | "one-time";
  endDate: string;
  contributionPlan?: string;
  amount?: number;
  currency?: string;
  startDate?: string;
  nextContributionDate?: string;
  lastContributionDate?: string;
  withdrawalDate?: string;
  status?: string;
}

export interface GetContributionBalanceResponse {
  success: boolean;
  totalBalance: number;
}

export interface GetUsersContributionHistoryResponse {
  success: boolean;
  contributions: Contribution[];
  totalPages: number;
  currentPage: string;
  totalContributions: number;
}

export interface CreateContributionPlanRequest {
  savingsCategory: string;
  contributionPlan?: string;
  amount: number;
  startDate: string;
  endDate: string;
  currency: string;
  savingsType: string;
  contributionType: string;
}

export interface CreateContributionPlanResponse {
  success: boolean;
  result: {
    contributionId: string;
    withdrawalDate: string;
  };
}

export interface PayContributionPaystackResponse {
  success: boolean;
  payment: {
    info: {
      data: {
        authorization_url: string;
      };
    };
  };
}

export interface GetWalletCardResponse {
  success: boolean;
  cards: Card[];
}
export interface PayWithPaystackProps {
  onSelect: (paymentType: "paystack") => void;
  isProcessing: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export interface Card {
  id: string;
  cardType: string;
  last4: string;
  expiry: string;
  authorization_code?: string;
  bank?: string;
}
export interface CardData {
  data: string;
  failedAttempts: number;
}

export interface Teir2KycRequest {
  paymentMethod?: string;
}

export interface Teir2KycResponse {
  status: number;
  message: string;
  verificationUrl: string;
}

export interface WithdrawalRequest {
  _id: string;
  user: string;
  amount: number;
  status: string;
  createdAt: string;
  bankDetails: {
    accountNumber: string;
    bankCode: string;
    accountName: string;
    bankName?: string;
  };
}

export interface ApproveWithdrawalRequest {
  status: "completed" | "rejected";
  reason?: string;
}

export interface Project {
  _id: string;
  title: string;
  status: string;
  documentUrl: string;
  description: string;
}

export interface Notification {
  title: string;
  message: string;
}

export interface BlogPost {
  _id: string;
  title?: string;
  summary?: string;
  content?: string;
  status?: string;
  createdBy?: {
    _id: string;
    username: string;
    lastName?: string;
    firstName?: string;
    id?: string;
  } | null;
  category?: {
    _id: string;
    name: string;
  } | null;
  coverImage?: {
    url: string;
    imageId: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface BlogCategory {
  _id: string;
  name: string;
  description?: string;
}

export interface iOTP {
  OTP: string;
  length?: number;
  width?: any;
  height?: any;
  textColor?: string;
  bgColor?: string;
  borderWidth?: number;
  borderColor?: string;
  inputType?: "text" | "password" | "tel" | "number";
}

interface iFormProps {
  label?: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: any;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  requiredColor?: string;
  optional?: boolean;
  name?: string;
  readOnly?: boolean;
  bgColor?: string;
  borderWidth?: number;
  borderColor?: string;
  className?: string;
  color?: string;
  inputRef?: any;
  fontSize?: string;
  min?: number;
  max?: number;
  paddingX?: string;
  paddingY?: string;
  labelPosition?: "block" | "flex";
  id?: string;
}

export interface iSelect extends Omit<iFormProps, "onChange"> {
  onSelect: ChangeEventHandler<HTMLSelectElement> | undefined;
  options: string[];
  icon?: ReactNode;
  labelPosition?: "flex" | "block";
  labelGap?: string;
}
