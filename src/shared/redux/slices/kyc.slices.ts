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

export const ActivateCryptoWallet = createAsyncThunk(
  "kyc/activateCryptoWallet",
  async (_, thunkAPI) => {
    try {
      const data = await KycServices.ActivateCryptoWallet();
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
  async (codeData: { code: string; reference: string }, thunkAPI) => {
    try {
      const data = await KycServices.VerifykycWhatsAppOtp(codeData);
      return { landing: data };
    } catch (error: any) {
      thunkAPI.dispatch(setMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const GetTotalCryptoWalletBalance = createAsyncThunk(
  "kyc/getCryptoWalletBalance",
  async (_, thunkAPI) => {
    try {
      const data = await KycServices.GetTotalCryptoWalletBalance();
      // console.log("ttt", data);
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetCryptoWalletDetails = createAsyncThunk(
  "kyc/getCryptoWalletDetails",
  async (_, thunkAPI) => {
    try {
      const data = await KycServices.GetCryptoWalletDetails();
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const CreatePool = createAsyncThunk(
  "kyc/createPool",
  async (body: any, thunkAPI) => {
    try {
      const data = await KycServices.CreatePool(body);
      return data;
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetAllUserPools = createAsyncThunk(
  "kyc/getAllUserPools",
  async (_, thunkAPI) => {
    try {
      const data = await KycServices.GetAllUserPools();
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const UpdateUserPool = createAsyncThunk(
  "kyc/updatePool",
  async (body: any, thunkAPI) => {
    try {
      const data = await KycServices.UpdateUserPool(body);
      return data;
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetAllUserTokens = createAsyncThunk(
  "kyc/getAllUserTokens",
  async (_, thunkAPI) => {
    try {
      const data = await KycServices.GetAllUserTokens();
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

interface KycState {
  kycOtp: Record<string, any> | null;
  actvateCryptWallet: Record<string, any> | null;
  cryptoBalance: number;
  cryptoWalletDetails: Record<string, any> | null;
  kycPhoneNumOtp: Record<string, any> | null;
  verifySmsOtp: string | null;
  verifyWhatAppOtp: string | null;
  registerUserPool: null;
  updateRegisteredUserPool: null;
  userPools: Record<string, any> | null;
  userTokens: string | null;
  loading: boolean;
  error: string | null;
  walletMessage: string | null;
}

const initialState: KycState = {
  kycOtp: null,
  actvateCryptWallet: null,
  verifySmsOtp: null,
  verifyWhatAppOtp: null,
  cryptoWalletDetails: null,
  kycPhoneNumOtp: null,
  cryptoBalance: 0,
  registerUserPool: null,
  updateRegisteredUserPool: null,
  walletMessage: null,
  userPools: null,
  userTokens: null,
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

      .addCase(ActivateCryptoWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ActivateCryptoWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.actvateCryptWallet = action.payload.landing;
        state.error = null;
      })
      .addCase(ActivateCryptoWallet.rejected, (state, action) => {
        state.loading = false;
        state.actvateCryptWallet = null;
        state.error =
          (action.payload as string) || "Failed to activate crypto wallet";
      })
      .addCase(GetTotalCryptoWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTotalCryptoWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptoBalance = action.payload.data || 0;
        state.walletMessage = action.payload.data.message || null;
        state.error = null;
      })
      .addCase(GetTotalCryptoWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.cryptoBalance = 0;
        state.walletMessage = null;
      })

      .addCase(GetCryptoWalletDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCryptoWalletDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptoWalletDetails = action.payload.data;
        state.error = null;
      })
      .addCase(GetCryptoWalletDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(CreatePool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreatePool.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(CreatePool.rejected, (state, action) => {
        state.loading = false;
        state.registerUserPool = null;
        state.error =
          (action.payload as string) || "Failed to  register user Pool";
      })

      .addCase(GetAllUserPools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllUserPools.fulfilled, (state, action) => {
        state.loading = false;
        state.userPools = action.payload.data;
        state.error = null;
      })
      .addCase(GetAllUserPools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(UpdateUserPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUserPool.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(UpdateUserPool.rejected, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = null;
        state.error = (action.payload as string) || "Failed to update Pool";
      })

      .addCase(GetAllUserTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllUserTokens.fulfilled, (state, action) => {
        state.loading = false;
        state.userTokens = action.payload.data;
        state.error = null;
      })
      .addCase(GetAllUserTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default kycSlice.reducer;
