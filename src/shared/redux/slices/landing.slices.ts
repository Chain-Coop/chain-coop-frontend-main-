import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import LandingServices from "../services/landing.services";

export const RegisterUser = createAsyncThunk(
  "landing/registerUser",
  async (body: any, thunkAPI) => {
    try {
      const data = await LandingServices.RegisterUser(body);
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const LoginUser = createAsyncThunk(
  "landing/loginUser",
  async (body: any, thunkAPI) => {
    try {
      const data = await LandingServices.LoginUser(body);
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const JoinNewsLetter = createAsyncThunk(
  "landing/joinNewsLetter",
  async (body: any, thunkAPI) => {
    try {
      const response = await LandingServices.JoinNewsLetter(body);
      return response;
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const VerifyUserAuth = createAsyncThunk(
  "landing/verifyauth",
  async (body: any, thunkAPI) => {
    try {
      const data = await LandingServices.VerifyUserAuth(body);
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const VerifyUserPhoneNumber = createAsyncThunk(
  "landing/verifyPhoneNumber",
  async (body: any, thunkAPI) => {
    try {
      const data = await LandingServices.VerifyUserPhoneNumber(body);
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const PublicContact = createAsyncThunk(
  "landing/publicContact",
  async (body: any, thunkAPI) => {
    try {
      const data = await LandingServices.PublicContact(body);
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetUserProfile = createAsyncThunk(
  "landing/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const data = await LandingServices.GetUserProfile();
      return data;
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  "landing/uploadProfile",
  async (body: any, thunkAPI) => {
    try {
      const data = await LandingServices.UploadAvatar(body);
      return data;
    } catch (error: any) {
      const message = error.message || "Something went wrong!";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const ResetPassword = createAsyncThunk(
  "landing/resetPassword",
  async (body: any, thunkAPI) => {
    try {
      const data = await LandingServices.ResetPassword(body);
      return data;
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  getUserRegistered: null,
  getloginUser: null,
  newsLetter: null,
  getResetOtp: null,
  getPublicContact: null,
  getUserPin: null,
  getProfile: null,
  avatarUrl: null,
  resetUserPassword: null,
  verifyPhone: null,
  verifyAuthData: null, // Added to initialState
  isLoading: false,
  error: null,
  success: false,
};

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    resetPasswordState: (state) => {
      state.success = false;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.getUserRegistered = action.payload.landing;
    });
    builder.addCase(RegisterUser.rejected, (state) => {
      state.getUserRegistered = null;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.getloginUser = action.payload.landing;
    });
    builder.addCase(LoginUser.rejected, (state) => {
      state.getloginUser = null;
    });
    builder.addCase(VerifyUserAuth.pending, (state) => {
      state.isLoading = true;
      state.verifyAuthData = null;
    });
    builder.addCase(VerifyUserAuth.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.verifyAuthData = action.payload.landing;
    });
    builder.addCase(VerifyUserAuth.rejected, (state: any) => {
      state.isLoading = false;
      state.verifyAuthData = null;
    });
    builder.addCase(VerifyUserPhoneNumber.fulfilled, (state: any, action) => {
      state.verifyPhone = action.payload.landing;
    });
    builder.addCase(VerifyUserPhoneNumber.rejected, (state: any) => {
      state.verifyPhone = null;
    });
    builder.addCase(PublicContact.fulfilled, (state, action) => {
      state.getPublicContact = action.payload.landing;
    });
    builder.addCase(PublicContact.rejected, (state) => {
      state.getPublicContact = null;
    });
    builder.addCase(GetUserProfile.fulfilled, (state, action) => {
      state.getProfile = action.payload;
    });
    builder.addCase(GetUserProfile.rejected, (state, action) => {
      state.getProfile = null;
      const errorMessage =
        action.error.message || "Failed to fetch user profile.";
      setMessage(errorMessage);
    });
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.avatarUrl = action.payload.data.publicURL;
    });
    builder.addCase(JoinNewsLetter.fulfilled, (state: any, action) => {
      state.newsLetter = action.payload;
    });
    builder.addCase(JoinNewsLetter.rejected, (state) => {
      state.newsLetter = null;
    });
    builder.addCase(ResetPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(ResetPassword.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.success = true;
      state.resetUserPassword = action.payload;
    });
    builder.addCase(ResetPassword.rejected, (state) => {
      state.isLoading = false;
      state.resetUserPassword = null;
    });
  },
});

const { reducer } = landingSlice;

export const { resetPasswordState } = landingSlice.actions;
export default reducer;
