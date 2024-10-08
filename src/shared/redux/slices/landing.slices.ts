import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import LandingServices from "../services/landing.services";
import React from "react";


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

export const PublicContact = createAsyncThunk(
  "landing/publicContact",
  async (body:any, thunkAPI) => {
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

const initialState = {
  getUserRegistered: null,
  getloginUser: null,
  getResetOtp: null,
  getPublicContact: null,
  getUserPin: null,
  getProfile: null,
  avatarUrl: null,
};

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
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
    builder.addCase(VerifyUserAuth.fulfilled, (state: any, action) => {
      state.verifyAuthData = action.payload.landing;
    });
    builder.addCase(VerifyUserAuth.rejected, (state: any) => {
      state.verifyAuthData = null;
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
  },
});

const { reducer } = landingSlice;
export default reducer;
