import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Services from "../services/landing.services";
import {
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
  ForgotPasswordResponse,
  ForgotPasswordRequest,
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
  forgotPasswordSuccess: boolean;
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
  forgotPasswordSuccess: false,
};

export const RegisterUser = createAsyncThunk<
  RegisterResponse,
  RegisterUserRequest,
  { rejectValue: string }
>("landing/register", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.auth.RegisterUser(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Registration failed";
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
    const data = await Services.auth.VerifyUserAuth(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Email verification failed";
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
    const data = await Services.auth.VerifyUserPhoneNumber(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Phone verification failed";
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
    const data = await Services.public.RESEND_LOGIN_OTP(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Failed to resend OTP";
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
    const data = await Services.auth.RESEND_VERIFY_OTP(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Failed to resend OTP";
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
    const data = await Services.auth.LoginUser(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Login failed";
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
    const data = await Services.public.JoinNewsLetter(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Failed to join newsletter";
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
    const data = await Services.public.PublicContact(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Failed to send message";
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
    const data = await Services.user.GetUserProfile();
    return data;
  } catch (error: any) {
    const message = error.msg || "Failed to fetch profile";
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
    const data = await Services.user.UploadAvatar(formData);
    return data;
  } catch (error: any) {
    const message = error.msg || "Failed to upload avatar";
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
    const data = await Services.user.ResetPassword(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Failed to reset password";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const ForgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  { rejectValue: string }
>("landing/forgotPassword", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await Services.public.FORGOT_PASSWORD(body);
    return data;
  } catch (error: any) {
    const message = error.msg || "Failed to send password reset request";
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
      state.newsLetter = null;
      state.getPublicContact = null;
      state.resetUserPassword = null;
      state.isLoading = false;
      state.error = null;
      state.registerSuccess = false;
      state.verifyEmailSuccess = false;
      state.verifyPhoneSuccess = false;
      state.loginSuccess = false;
      state.forgotPasswordSuccess = false;
      // Preserve getProfile and avatarUrl
    },
  },
  extraReducers: (builder) => {
    // RegisterUser
    builder.addCase(RegisterUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.registerSuccess = false;
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
      state.loginSuccess = false;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginData = action.payload;
      state.loginSuccess = true;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Login failed";
      state.loginSuccess = false;
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
      state.avatarUrl = action.payload.profilePhoto.url;
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

    // ForgotPassword
    builder.addCase(ForgotPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.forgotPasswordSuccess = false;
    });
    builder.addCase(ForgotPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.forgotPasswordSuccess = true;
    });
    builder.addCase(ForgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to send password reset request";
      state.forgotPasswordSuccess = false;
    });
  },
});

export const { resetAuthState } = landingSlice.actions;
export default landingSlice.reducer;
