import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";

export const GetWalletBalance = createAsyncThunk(
  "transaction/getWalletBalance",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetWalletBalance();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetContributionBalance = createAsyncThunk(
  "transaction/getContributionBalance",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetContributionBalance();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetUsersTransaction = createAsyncThunk(
  "transaction/getUsersTransaction",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetUsersTransaction();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const sendProposal = createAsyncThunk(
  "transaction/sendProposal",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await TransactionServices.SendProposal(formData);
      return { transaction: response };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetProposal = createAsyncThunk(
  "transaction/getProposal",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetProposal();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetAllProject = createAsyncThunk(
  "transaction/getAllProject",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetAllProject();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const CreateContributionPlan = createAsyncThunk(
  "transaction/createContributionPlan",
  async (body:any, thunkAPI) => {
    try {
      const data = await TransactionServices.CreateContributionPlan(body);
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

const handleAsyncError = (error: any, thunkAPI: any) => {
  const message = error.message || "An error occurred. Please try again.";
  thunkAPI.dispatch(setMessage(message));
  return thunkAPI.rejectWithValue(message);
};

export const UploadPaymentReceipt = createAsyncThunk(
  "transaction/uploadPaymentReceipt",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await TransactionServices.UploadPaymentReceipt(formData);
      return { transaction: response };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const FundWallet = createAsyncThunk(
  "transaction/fundWallet",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.FundWallet(body);
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

interface TransactionState {
  getWalletBalance: any | null;
  getContributionBalance: any | null;
  getUsersTransaction: any | null;
  createProposal: any | null;
  userProposal: any | null;
  fundWalletStatus: "idle" | "loading" | "success" | "failed";
  allProjects:any,
  contributionPlan:any,
  uploadReceipt: any | null;
  fundUserWallet: any | null;
}

const initialState: TransactionState = {
  getWalletBalance: null,
  getContributionBalance: null,
  getUsersTransaction: null,
  createProposal: null,
  userProposal: null,
  fundWalletStatus: "idle",
  allProjects:null,
  contributionPlan:null,
  uploadReceipt:null,
  fundUserWallet: null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetFundWalletStatus: (state) => {
      state.fundWalletStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        GetWalletBalance.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.getWalletBalance = action.payload.transaction;
        },
      )

      .addCase(GetWalletBalance.rejected, (state) => {
        state.getWalletBalance = null;
      })
      .addCase(
        GetContributionBalance.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.getContributionBalance = action.payload.transaction;
        },
      )
      .addCase(GetContributionBalance.rejected, (state) => {
        state.getContributionBalance = null;
      })

      .addCase(
        GetUsersTransaction.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.getUsersTransaction = action.payload.transaction;
        },
      )
      .addCase(GetUsersTransaction.rejected, (state) => {
        state.getUsersTransaction = null;
      })

      .addCase(
        sendProposal.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.createProposal = action.payload.transaction;
        },
      )
      .addCase(sendProposal.rejected, (state) => {
        state.createProposal = null;
      })
      .addCase(
        GetProposal.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.userProposal = action.payload.transaction;
        },
      )
      .addCase(GetProposal.rejected, (state) => {
        state.userProposal = null;
      })
      .addCase(
        GetAllProject.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.allProjects = action.payload.transaction;
        },
      )
      .addCase(GetAllProject.rejected, (state) => {
        state.allProjects = null;
      })
      .addCase(
        CreateContributionPlan.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.contributionPlan = action.payload.transaction;
        },
      )
      .addCase(CreateContributionPlan.rejected, (state) => {
        state.contributionPlan = null;
      })

      .addCase(
        UploadPaymentReceipt.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.uploadReceipt = action.payload.transaction;
        },
      )
      .addCase(UploadPaymentReceipt.rejected, (state) => {
        state.uploadReceipt = null;
      })
  },
});

export const { resetFundWalletStatus } = transactionSlice.actions;

export default transactionSlice.reducer;
