export interface ApiError {
  msg: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
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
  msg: string;
  user: {
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
  msg: string;
  user: {
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
  msg: string;
  user: {
    _id: string;
    phoneNumber: string;
    isVerified: boolean;
  };
}

export interface ResendEmailOtpRequest {
  email: string;
}

export interface ResendEmailOtpResponse {
  msg: string;
}

export interface ResendVerifyOtpRequest {
  phoneNumber: string;
}

export interface ResendVerifyOtpResponse {
  msg: string;
}

export interface JoinNewsLetterRequest {
  email: string;
}

export interface JoinNewsLetterResponse {
  msg: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  msg: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  msg: string;
}

export interface UserProfileResponse {
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  isPinCreated: boolean;
  profilePhoto: {
    url: string;
    imageId: string;
  };
}

export interface UploadAvatarResponse {
  publicURL: string;
}
