import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import KycServices from "../services/kyc.services";

export const phoneNumberOtp = createAsyncThunk(
  "kyc/sendOtp",
  async (body: any, thunkAPI) => {
    try {
      const data = await KycServices.phoneNumberOtp(body);
      return data;
    } catch (error: any) {
      const message = error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

interface KycState {
  kycOtp: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: KycState = {
  kycOtp: null,
  loading: false,
  error: null,
};

export const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(phoneNumberOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(phoneNumberOtp.fulfilled, (state, action) => {
      state.kycOtp = action.payload.landing;
    });
    builder.addCase(phoneNumberOtp.rejected, (state) => {
      state.kycOtp = null;
    });
  },
});

export default kycSlice.reducer;
