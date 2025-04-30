import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import web3Services from "../services/web3.services";
import { WithdrawUserPoolPayload } from "../../types/types";

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
      const message =
        error?.response?.data?.message ||
        error?.data?.message ||
        error?.message ||
        "An unknown error occurred while creating the pool";
      return thunkAPI.rejectWithValue({ message });
    }
  },
);

export const CreatePeriodicPool = createAsyncThunk(
  "web3/createPeriodicPool",
  async (body: any, thunkAPI) => {
    try {
      const data = await web3Services.CreatePeriodicPool(body);
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.data?.message ||
        error?.message ||
        "An unknown error occurred while creating the pool";
      return thunkAPI.rejectWithValue({ message });
    }
  },
);

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
      const message =
        error?.response?.data?.message ||
        error?.data?.message ||
        error?.message ||
        "An unknown error occurred while funding the pool";
      return thunkAPI.rejectWithValue({ message });
    }
  },
);

interface UpdateAutoPoolPayload {
  id?: string;
  body: { amount: string };
}

export const UpdateAutoPool = createAsyncThunk<
  any,
  UpdateAutoPoolPayload,
  { rejectValue: { message: string } }
>("web3/updateAutoPool", async ({ id, body }, { rejectWithValue }) => {
  if (!id) {
    return rejectWithValue({ message: "Pool ID is missing." });
  }
  try {
    const data = await web3Services.UpdateAutoPool({ id, body });
    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.data?.message ||
      error?.message ||
      "An unknown error occurred while updating the pool";
    return rejectWithValue({ message });
  }
});

export const WithdrawUserPool = createAsyncThunk<
  any,
  WithdrawUserPoolPayload,
  { rejectValue: { message: string } }
>("web3/withdrawUserPool", async (payload, { rejectWithValue }) => {
  try {
    const response = await web3Services.WithdrawUserPool(payload);
    return response;
  } catch (error: any) {
    const message =
      error?.message || "An unknown error occurred during withdrawal.";

    return rejectWithValue({ message });
  }
});

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

export const StopPeriodicPool = createAsyncThunk<
  any,
  string,
  { rejectValue: { message: string } }
>("web3/stopPeriodicPool", async (poolId, { rejectWithValue }) => {
  try {
    const response = await web3Services.StopPeriodicPool(poolId);
    return response;
  } catch (error: any) {
    const message =
      error?.message || "An unknown error occurred stopping the pool.";
    return rejectWithValue({ message });
  }
});

export const ResumePeriodicPool = createAsyncThunk<
  any,
  string,
  { rejectValue: { message: string } }
>("web3/resumePeriodicPool", async (poolId, { rejectWithValue }) => {
  try {
    const response = await web3Services.ResumePeriodicPool(poolId);
    return response;
  } catch (error: any) {
    const message =
      error?.message || "An unknown error occurred resuming the pool.";
    return rejectWithValue({ message });
  }
});

interface CryptoState {
  actvateCryptWallet: Record<string, any> | null;
  cryptoBalance: number;
  cryptoWalletDetails: Record<string, any> | null;
  registerUserPool: null;
  updateRegisteredUserPool: null;
  userPools: Record<string, any> | null;
  userTokens: string | null;
  loading: boolean;
  userPoolsLoading: boolean;
  error: string | null;
  userPoolsError: string | null;
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
  userPoolsLoading: false,
  error: null,
  userPoolsError: null,
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
        state.error = (action.payload as string) || "Failed to fetch balance";
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

      .addCase(CreatePeriodicPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreatePeriodicPool.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(CreatePeriodicPool.rejected, (state, action) => {
        state.loading = false;
        state.registerUserPool = null;
        state.error =
          (action.payload as string) || "Failed to  register user Pool";
      })

      .addCase(GetAllUserPools.pending, (state) => {
        state.userPoolsLoading = true;
        state.userPoolsError = null;
      })
      .addCase(GetAllUserPools.fulfilled, (state, action) => {
        state.userPoolsLoading = false;
        state.userPools = action.payload.data;
        state.userPoolsError = null;
      })
      .addCase(GetAllUserPools.rejected, (state, action) => {
        state.userPoolsLoading = false;
        state.userPoolsError = (action.payload as string) || "Failed to fetch user pools";
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

      .addCase(UpdateAutoPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateAutoPool.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(UpdateAutoPool.rejected, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = null;
        state.error = action.payload?.message || "Failed to update Pool";
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
        state.error = action.payload?.message || "Failed to withdraw Pool";
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
      })

      .addCase(StopPeriodicPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(StopPeriodicPool.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("StopPeriodicPool fulfilled:", action.payload);
      })
      .addCase(StopPeriodicPool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to stop pool";
      })

      .addCase(ResumePeriodicPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ResumePeriodicPool.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("ResumePeriodicPool fulfilled:", action.payload);
      })
      .addCase(ResumePeriodicPool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to resume pool";
      });
  },
});

export default Web3Slices.reducer;
