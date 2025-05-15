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
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  UpdatePhoneNumberRequest,
  UpdatePhoneNumberResponse,
} from "../../types";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";

const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

const handleAxiosError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    const response = axiosError.response;
    const status = response?.status;
    const data = response?.data;

    if (status === 400) {
      return { msg: data?.msg || "Invalid request data." };
    } else if (status === 401) {
      return { msg: data?.msg || "Unauthorized. Please log in." };
    } else if (status === 429) {
      return {
        msg: data?.msg || "Too many requests. Try again later.",
      };
    } else if (status === 500) {
      return {
        msg: data?.msg || "Server error. Please try again later.",
      };
    }

    return data || { msg: "Network Error: Please try again." };
  }
  return { msg: "An unexpected error occurred." };
};

export async function RegisterUser(
  data: RegisterUserRequest,
): Promise<RegisterResponse> {
  const url = `${API_URL}${API_ENDPOINTS.AUTH.REGISTER}`;
  try {
    const response = await axios.post<RegisterResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function VerifyUserAuth(
  data: VerifyEmailRequest,
): Promise<VerifyEmailResponse> {
  const url = `${API_URL}${API_ENDPOINTS.AUTH.VERIFY_OTP}`;
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
  data: VerifyPhoneRequest,
): Promise<VerifyPhoneResponse> {
  const url = `${API_URL}${API_ENDPOINTS.AUTH.VERIFY_WHATSAPP_OTP}`;
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
  data: ResendEmailOtpRequest,
): Promise<ResendEmailOtpResponse> {
  const url = `${API_URL}${API_ENDPOINTS.AUTH.RESEND_OTP}`;
  try {
    const response = await axios.post<ResendEmailOtpResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function RESEND_VERIFY_OTP(
  data: ResendVerifyOtpRequest,
): Promise<ResendVerifyOtpResponse> {
  const url = `${API_URL}${API_ENDPOINTS.AUTH.RESEND_WHATSAPP_OTP}`;
  try {
    const response = await axios.post<ResendVerifyOtpResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function LoginUser(data: LoginRequest): Promise<LoginResponse> {
  const url = `${API_URL}${API_ENDPOINTS.AUTH.LOGIN}`;
  try {
    const response = await axios.post<LoginResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function JoinNewsLetter(
  data: JoinNewsLetterRequest,
): Promise<JoinNewsLetterResponse> {
  const url = `${API_URL}${API_ENDPOINTS.PUBLIC.JOIN_NEWSLETTER}`;
  try {
    const response = await axios.post<JoinNewsLetterResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function PublicContact(
  data: ContactRequest,
): Promise<ContactResponse> {
  const url = `${API_URL}${API_ENDPOINTS.PUBLIC.CONTACT_US}`;
  try {
    const response = await axios.post<ContactResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetUserProfile(): Promise<UserProfileResponse> {
  const url = `${API_URL}${API_ENDPOINTS.USER.GET_PROFILE}`;
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
  formData: FormData,
): Promise<UploadAvatarResponse> {
  const url = `${API_URL}${API_ENDPOINTS.USER.UPLOAD_AVATAR}`;
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
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  const url = `${API_URL}${API_ENDPOINTS.AUTH.RESET_PASSWORD}`;
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
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  const url = `${API_URL}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`;
  try {
    const response = await axios.post<ForgotPasswordResponse>(url, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function UPDATE_PHONE_NUMBER(
  data: UpdatePhoneNumberRequest,
): Promise<UpdatePhoneNumberResponse> {
  const url = `${API_URL}${API_ENDPOINTS.AUTH.UPDATE_PHONE_NUMBER}`;
  try {
    const response = await axios.post<UpdatePhoneNumberResponse>(url, data);
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
    RESET_PASSWORD: ResetPassword,
  },
  user: {
    GetUserProfile,
    UploadAvatar,
    ResetPassword,
  },
};

export default Services;
