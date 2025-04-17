import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import web3Services from "../services/web3.services";

export const ActivateCryptoWallet = createAsyncThunk(
  "web3/activateCryptoWallet",
  async (_, thunkAPI) => {
    try {
      const data = await web3Services.ActivateCryptoWallet();
      return data;
    } catch (error: any) {
      const message = error.message || "An error occurred";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetTotalCryptoWalletBalance = createAsyncThunk(
  "web3/getCryptoWalletBalance",
  async (_, thunkAPI) => {
    try {
      const data = await web3Services.GetTotalCryptoWalletBalance();
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetCryptoWalletDetails = createAsyncThunk(
  "web3/getCryptoWalletDetails",
  async (_, thunkAPI) => {
    try {
      const data = await web3Services.GetCryptoWalletDetails();
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const CreatePool = createAsyncThunk(
  "web3/createPool",
  async (body: any, thunkAPI) => {
    try {
      const data = await web3Services.CreatePool(body);
      return data;
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

{
  /*export const CreatePool = createAsyncThunk(
  "web3/createPool",
  async (body: { formData: any; pin: string }, thunkAPI) => {
    try {
      const { formData, pin } = body;

      const payload = {
        ...formData,
        pin,
      };

      const data = await web3Services.CreatePool(payload);
      return data;
    } catch (error: any) {
      const message = error.msg || "An error occurred while creating the pool";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);*/
}

export const GetAllUserPools = createAsyncThunk(
  "web3/getAllUserPools",
  async (_, thunkAPI) => {
    try {
      const data = await web3Services.GetAllUserPools();
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const UpdateUserPool = createAsyncThunk(
  "web3/updatePool",
  async (body: any, thunkAPI) => {
    try {
      const data = await web3Services.UpdateUserPool(body);
      return data;
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const WithdrawUserPool = createAsyncThunk(
  "web3/withdraw",
  async (body: any, thunkAPI) => {
    try {
      const data = await web3Services.WithdrawUserPool(body);
      return data;
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetAllUserTokens = createAsyncThunk(
  "web3/getAllUserTokens",
  async (_, thunkAPI) => {
    try {
      const data = await web3Services.GetAllUserTokens();
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

interface CryptoState {
  actvateCryptWallet: Record<string, any> | null;
  cryptoBalance: number;
  cryptoWalletDetails: Record<string, any> | null;
  registerUserPool: null;
  updateRegisteredUserPool: null;
  userPools: Record<string, any> | null;
  userTokens: string | null;
  loading: boolean;
  error: string | null;
  walletMessage: string | null;
}

const initialState: CryptoState = {
  actvateCryptWallet: null,
  cryptoWalletDetails: null,
  cryptoBalance: 0,
  registerUserPool: null,
  updateRegisteredUserPool: null,
  walletMessage: null,
  userPools: null,
  userTokens: null,
  loading: false,
  error: null,
};

export const Web3Slices = createSlice({
  name: "web3",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

      .addCase(WithdrawUserPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(WithdrawUserPool.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(WithdrawUserPool.rejected, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = null;
        state.error = (action.payload as string) || "Failed to withdraw Pool";
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

export default Web3Slices.reducer;
