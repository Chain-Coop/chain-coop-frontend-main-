import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Services from "../services/landing.services";
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
  ContactRequest,
  ContactResponse,
  UserProfileResponse,
  UploadAvatarResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../../types";
import { setMessage } from "./message.slices";

interface LandingState {
  loginData: LoginResponse | null;
  registerUserData: RegisterResponse | null;
  verifyPhone: VerifyPhoneResponse | null;
  getProfile: UserProfileResponse | null;
  avatarUrl: string | null;
  newsLetter: JoinNewsLetterResponse | null;
  getPublicContact: ContactResponse | null;
  resetUserPassword: ResetPasswordResponse | null;
  isLoading: boolean;
  error: string | null;
  registerSuccess: boolean;
  verifyEmailSuccess: boolean;
  verifyPhoneSuccess: boolean;
  loginSuccess: boolean;
}

const initialState: LandingState = {
  loginData: null,
  registerUserData: null,
  verifyPhone: null,
  getProfile: null,
  avatarUrl: null,
  newsLetter: null,
  getPublicContact: null,
  resetUserPassword: null,
  isLoading: false,
  error: null,
  registerSuccess: false,
  verifyEmailSuccess: false,
  verifyPhoneSuccess: false,
  loginSuccess: false, 
};

export const RegisterUser = createAsyncThunk<
  RegisterResponse,
  RegisterUserRequest,
  { rejectValue: string }
>("landing/register", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.auth.RegisterUser("/auth/register", body);
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Registration failed";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const VerifyUserAuth = createAsyncThunk<
  VerifyEmailResponse,
  VerifyEmailRequest,
  { rejectValue: string }
>("landing/verifyEmail", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.auth.VerifyUserAuth("/auth/verify_otp", body);
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Email verification failed";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const VerifyUserPhoneNumber = createAsyncThunk<
  VerifyPhoneResponse,
  VerifyPhoneRequest,
  { rejectValue: string }
>("landing/verifyPhone", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.auth.VerifyUserPhoneNumber(
      "/auth/verify_whatsapp_otp",
      body,
    );
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Phone verification failed";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const ResendEmailOtp = createAsyncThunk<
  ResendEmailOtpResponse,
  ResendEmailOtpRequest,
  { rejectValue: string }
>("landing/resendEmailOtp", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.public.RESEND_LOGIN_OTP(
      "/auth/resend_otp",
      body,
    );
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Failed to resend OTP";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const ResendVerifyOtp = createAsyncThunk<
  ResendVerifyOtpResponse,
  ResendVerifyOtpRequest,
  { rejectValue: string }
>("landing/resendVerifyOtp", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.auth.RESEND_VERIFY_OTP(
      "/auth/resend_whatsapp_otp",
      body,
    );
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Failed to resend OTP";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const LoginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>("landing/login", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.auth.LoginUser("/auth/login", body);
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Login failed";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const JoinNewsLetter = createAsyncThunk<
  JoinNewsLetterResponse,
  JoinNewsLetterRequest,
  { rejectValue: string }
>("landing/newsLetter", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.public.JoinNewsLetter(
      "/news-letter/join",
      body,
    );
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Failed to join newsletter";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const PublicContact = createAsyncThunk<
  ContactResponse,
  ContactRequest,
  { rejectValue: string }
>("landing/publicContact", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.public.PublicContact("/contact-us", body);
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Failed to send message";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const GetUserProfile = createAsyncThunk<
  UserProfileResponse,
  void,
  { rejectValue: string }
>("landing/getProfile", async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.user.GetUserProfile("/auth/user");
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Failed to fetch profile";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const uploadAvatar = createAsyncThunk<
  UploadAvatarResponse,
  FormData,
  { rejectValue: string }
>("landing/uploadAvatar", async (formData, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.user.UploadAvatar(
      "/profile/upload_profile_picture",
      formData,
    );
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Failed to upload avatar";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const ResetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordRequest,
  { rejectValue: string }
>("landing/resetPassword", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.user.ResetPassword(
      "/auth/reset_password",
      body,
    );
    return data;
  } catch (error) {
    const message = (error as ApiError).msg || "Failed to reset password";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loginData = null;
      state.registerUserData = null;
      state.verifyPhone = null;
      state.getProfile = null;
      state.avatarUrl = null;
      state.newsLetter = null;
      state.getPublicContact = null;
      state.resetUserPassword = null;
      state.isLoading = false;
      state.error = null;
      state.registerSuccess = false;
      state.verifyEmailSuccess = false;
      state.verifyPhoneSuccess = false;
      state.loginSuccess = false; // Added
    },
  },
  extraReducers: (builder) => {
    // RegisterUser
    builder.addCase(RegisterUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.registerSuccess = false;
      state.verifyEmailSuccess = false;
      state.verifyPhoneSuccess = false;
      state.loginSuccess = false; // Added
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registerUserData = action.payload;
      state.registerSuccess = true;
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Registration failed";
      state.registerSuccess = false;
    });

    // VerifyUserAuth (Email)
    builder.addCase(VerifyUserAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.verifyEmailSuccess = false;
      state.verifyPhoneSuccess = false;
      state.loginSuccess = false; // Added
    });
    builder.addCase(VerifyUserAuth.fulfilled, (state) => {
      state.isLoading = false;
      state.verifyEmailSuccess = true;
    });
    builder.addCase(VerifyUserAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Email verification failed";
      state.verifyEmailSuccess = false;
    });

    // VerifyUserPhoneNumber
    builder.addCase(VerifyUserPhoneNumber.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.verifyPhoneSuccess = false;
      state.loginSuccess = false; // Added
    });
    builder.addCase(VerifyUserPhoneNumber.fulfilled, (state, action) => {
      state.isLoading = false;
      state.verifyPhone = action.payload;
      state.verifyPhoneSuccess = true;
    });
    builder.addCase(VerifyUserPhoneNumber.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Phone verification failed";
      state.verifyPhoneSuccess = false;
    });

    // ResendEmailOtp
    builder.addCase(ResendEmailOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(ResendEmailOtp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(ResendEmailOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to resend OTP";
    });

    // ResendVerifyOtp
    builder.addCase(ResendVerifyOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(ResendVerifyOtp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(ResendVerifyOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to resend OTP";
    });

    // LoginUser
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.loginSuccess = false; // Added
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginData = action.payload;
      state.loginSuccess = true; // Added
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Login failed";
      state.loginSuccess = false; // Added
    });

    // JoinNewsLetter
    builder.addCase(JoinNewsLetter.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(JoinNewsLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newsLetter = action.payload;
    });
    builder.addCase(JoinNewsLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to join newsletter";
    });

    // PublicContact
    builder.addCase(PublicContact.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PublicContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getPublicContact = action.payload;
    });
    builder.addCase(PublicContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to send message";
    });

    // GetUserProfile
    builder.addCase(GetUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getProfile = action.payload;
    });
    builder.addCase(GetUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch profile";
    });

    // uploadAvatar
    builder.addCase(uploadAvatar.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.avatarUrl = action.payload.publicURL;
    });
    builder.addCase(uploadAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to upload avatar";
    });

    // ResetPassword
    builder.addCase(ResetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(ResetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resetUserPassword = action.payload;
    });
    builder.addCase(ResetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to reset password";
    });
  },
});

export const { resetAuthState } = landingSlice.actions;
export default landingSlice.reducer;
