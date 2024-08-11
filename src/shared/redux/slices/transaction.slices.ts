import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";

export const GetWalletBalance = createAsyncThunk(
  "transaction/getWalletBalance",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetWalletBalance();
      return { transaction: data };
    } catch (error: any) {
      const message =
        error.msg || "Network Error: Please check your internet connection.";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
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
      const message =
        error.msg || "Network Error: Please check your internet connection.";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const sendProposal = createAsyncThunk(
  "transaction/sendProposal",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await TransactionServices.SendProposal(formData); // Use the correct service function
      return { transaction: response.data }; // Adjust based on actual response structure
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
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
      const message =
        error.msg || "Network Error: Please check your internet connection.";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  getWalletBalance: null,
  getUsersTransaction: null,
  createProposal: null,
  userProposal: null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetWalletBalance.fulfilled, (state, action) => {
        state.getWalletBalance = action.payload.transaction;
      })
      .addCase(GetWalletBalance.rejected, (state) => {
        state.getWalletBalance = null;
      })
      .addCase(GetUsersTransaction.fulfilled, (state, action) => {
        state.getUsersTransaction = action.payload.transaction;
      })
      .addCase(GetUsersTransaction.rejected, (state) => {
        state.getUsersTransaction = null;
      });

    builder.addCase(sendProposal.fulfilled, (state: any, action: any) => {
      state.createProposal = action.payload.transaction;
    });
    builder.addCase(sendProposal.rejected, (state) => {
      state.createProposal = null;
    });

    builder.addCase(GetProposal.fulfilled, (state, action) => {
      state.userProposal = action.payload.transaction;
    });
    builder.addCase(GetProposal.rejected, (state) => {
      state.userProposal = null;
    });
  },
});

const { reducer } = transactionSlice;
export default reducer;
