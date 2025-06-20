import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import KycServices from "../services/kyc.services";

export const kycPhoneOtp = createAsyncThunk(
  "kyc/kycPhoneOtp",
  async (_, thunkAPI) => {
    try {
      const data = await KycServices.kycPhoneOtp();
      return data;
    } catch (error: any) {
      const message = error.message || "An error occurred";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const VerifykycPhoneOtp = createAsyncThunk(
  "kyc/verifykycPhoneOtp",
  async (codeData: { code: string; reference: string }, thunkAPI) => {
    try {
      const data = await KycServices.VerifykycPhoneOtp(codeData);
      return { landing: data };
    } catch (error: any) {
      thunkAPI.dispatch(setMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const kycWhatsAppOtp = createAsyncThunk(
  "kyc/verify-otp",
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
  async (codeData: { code: string; reference?: string }, thunkAPI) => {
    try {
      const data = await KycServices.VerifykycWhatsAppOtp(codeData);
      return { landing: data };
    } catch (error: any) {
      thunkAPI.dispatch(setMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const UpdateBvn = createAsyncThunk(
  "kyc/updteBvn",
  async (body: any, thunkAPI) => {
    try {
      const data = await KycServices.UpdateBvn(body);
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      thunkAPI.dispatch(setMessage(errorMessage));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const VerifyBvnDetails = createAsyncThunk(
  "kyc/verifyBvnDetails",
  async (body: any, thunkAPI) => {
    try {
      const data = await KycServices.VerifyBvnDetails(body);
      return data;
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

interface KycState {
  kycOtp: Record<string, any> | null;
  kycPhoneNumOtp: Record<string, any> | null;
  verifySmsOtp: string | null;
  verifyWhatAppOtp: string | null;
  loading: boolean;
  error: string | null;
  uploadBvn: string | null;
  verifyUserBvn: string | null;
}

const initialState: KycState = {
  kycOtp: null,
  verifySmsOtp: null,
  verifyWhatAppOtp: null,
  kycPhoneNumOtp: null,
  verifyUserBvn: null,
  uploadBvn: null,
  loading: false,
  error: null,
};

export const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(kycPhoneOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(kycPhoneOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.kycPhoneNumOtp = action.payload.landing;
        state.error = null;
      })
      .addCase(kycPhoneOtp.rejected, (state, action) => {
        state.loading = false;
        state.kycPhoneNumOtp = null;
        state.error = (action.payload as string) || "Failed to  send OTP";
      })

      .addCase(VerifykycPhoneOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifykycPhoneOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verifySmsOtp = action.payload.landing;
        state.error = null;
      })
      .addCase(VerifykycPhoneOtp.rejected, (state, action) => {
        state.loading = false;
        state.verifyWhatAppOtp = null;
        state.error = (action.payload as string) || "Failed to verify OTP";
      })

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
      })
      .addCase(UpdateBvn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateBvn.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadBvn = action.payload;
      })

      .addCase(UpdateBvn.rejected, (state) => {
        state.loading = false;
        state.uploadBvn = null;
      })
      .addCase(VerifyBvnDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyBvnDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyUserBvn = action.payload;
      })

      .addCase(VerifyBvnDetails.rejected, (state) => {
        state.loading = false;
        state.verifyUserBvn = null;
      });
  },
});

export default kycSlice.reducer;
