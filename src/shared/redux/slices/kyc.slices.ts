import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import KycServices from "../services/kyc.services";

export const kycWhatsAppOtp = createAsyncThunk(
  "kyc/sendOtp",
  async (_, thunkAPI) => {
    try {
      const data = await KycServices.kycWhatsAppOtp();
      return data;
    } catch (error: any) {
      const message = error.message || "An error occurred";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const VerifykycWhatsAppOtp = createAsyncThunk(
  "kyc/verifykycWhatsAppOtp",
  async (codeData: { code: string }, thunkAPI) => {
    try {
      const data = await KycServices.VerifykycWhatsAppOtp(codeData);
      return { landing: data };
    } catch (error: any) {
      thunkAPI.dispatch(setMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface KycState {
  kycOtp: Record<string, any> | null;
  verifyWhatAppOtp: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: KycState = {
  kycOtp: null,
  verifyWhatAppOtp: null,
  loading: false,
  error: null,
};

export const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(kycWhatsAppOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(kycWhatsAppOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.kycOtp = action.payload.landing;
        state.error = null;
      })
      .addCase(kycWhatsAppOtp.rejected, (state, action) => {
        state.loading = false;
        state.kycOtp = null;
        state.error = (action.payload as string) || "Failed to send OTP";
      })

      .addCase(VerifykycWhatsAppOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifykycWhatsAppOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyWhatAppOtp = action.payload.landing;
        state.error = null;
      })
      .addCase(VerifykycWhatsAppOtp.rejected, (state, action) => {
        state.loading = false;
        state.verifyWhatAppOtp = null;
        state.error = (action.payload as string) || "Failed to verify OTP";
      });
  },
});

export default kycSlice.reducer;
