import axios, { AxiosError } from "axios";
import authHeader from "./headers";
import {
  ApiError,
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  RegisterResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyPhoneRequest,
  VerifyPhoneResponse,
  ResendEmailOtpRequest,
  ResendEmailOtpResponse,
  ResendVerifyOtpRequest,
  ResendVerifyOtpResponse,
  JoinNewsLetterRequest,
  JoinNewsLetterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ContactRequest,
  ContactResponse,
  UserProfileResponse,
  UploadAvatarResponse,
} from "../../types";

const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

const handleAxiosError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    return (
      axiosError.response?.data || { msg: "Network Error: Please try again." }
    );
  }
  return { msg: "An unexpected error occurred." };
};

export async function RegisterUser(
  endpoint: string,
  data: RegisterUserRequest,
): Promise<RegisterResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<RegisterResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function VerifyUserAuth(
  endpoint: string,
  data: VerifyEmailRequest,
): Promise<VerifyEmailResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<VerifyEmailResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function VerifyUserPhoneNumber(
  endpoint: string,
  data: VerifyPhoneRequest,
): Promise<VerifyPhoneResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<VerifyPhoneResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function RESEND_LOGIN_OTP(
  endpoint: string,
  data: ResendEmailOtpRequest,
): Promise<ResendEmailOtpResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<ResendEmailOtpResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function RESEND_VERIFY_OTP(
  endpoint: string,
  data: ResendVerifyOtpRequest,
): Promise<ResendVerifyOtpResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<ResendVerifyOtpResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function LoginUser(
  endpoint: string,
  data: LoginRequest,
): Promise<LoginResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<LoginResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function JoinNewsLetter(
  endpoint: string,
  data: JoinNewsLetterRequest,
): Promise<JoinNewsLetterResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<JoinNewsLetterResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function PublicContact(
  endpoint: string,
  data: ContactRequest,
): Promise<ContactResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<ContactResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetUserProfile(
  endpoint: string,
): Promise<UserProfileResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.get<UserProfileResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function UploadAvatar(
  endpoint: string,
  formData: FormData,
): Promise<UploadAvatarResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<UploadAvatarResponse>(url, formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function ResetPassword(
  endpoint: string,
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<ResetPasswordResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function FORGOT_PASSWORD(
  endpoint: string,
  data: { email: string },
): Promise<{ msg: string }> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<{ msg: string }>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function UPDATE_PHONE_NUMBER(
  endpoint: string,
  data: { phoneNumber: string },
): Promise<{ msg: string }> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<{ msg: string }>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function RESET_PASSWORD(
  endpoint: string,
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios.post<ResetPasswordResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

const Services = {
  auth: {
    LoginUser,
    RegisterUser,
    VerifyUserAuth,
    VerifyUserPhoneNumber,
    RESEND_VERIFY_OTP,
  },
  public: {
    JoinNewsLetter,
    PublicContact,
    FORGOT_PASSWORD,
    RESEND_LOGIN_OTP,
    UPDATE_PHONE_NUMBER,
    RESET_PASSWORD,
  },
  user: {
    GetUserProfile,
    UploadAvatar,
    ResetPassword,
  },
};

export default Services;
