import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import LandingServices from "../services/landing.services";

export const RegisterUser = createAsyncThunk(
  "landing/registerUser",
  async (body, thunkAPI) => {
    try {
      const data = await LandingServices.RegisterUser(body);
      return { landing: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "landing/loginUser",
  async (body, thunkAPI) => {
    try {
      const data = await LandingServices.LoginUser(body);
      return { landing: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const VerifyUserAuth = createAsyncThunk(
  "landing/verifyauth",
  async (body, thunkAPI) => {
    try {
      const data = await LandingServices.VerifyUserAuth(body);
      return { landing: data };
    } catch (error) {
      console.error(
        "Error:",
        error.response || error.message || error.toString()
      );

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const initialState = {
  getUserRegistered: null,
  getloginUser: null,
  getResetOtp: null,
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
    builder.addCase(VerifyUserAuth.fulfilled, (state, action) => {
      state.verifyAuthData = action.payload.landing;
    });
    builder.addCase(VerifyUserAuth.rejected, (state) => {
      state.verifyAuthData = null;
    });
  },
});

const { reducer } = landingSlice;
export default reducer;
