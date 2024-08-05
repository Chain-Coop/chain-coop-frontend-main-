import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";

export const GetWalletBalance = createAsyncThunk(
  "transaction/getWalletBalance",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetWalletBalance();
      return { transaction: data };
    } catch (error) {
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
    } catch (error) {
      const message =
        error.msg || "Network Error: Please check your internet connection.";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const SendProposal = createAsyncThunk(
  "transaction/sendProposal",
  async (body, thunkAPI) => {
    try {
      const data = await TransactionServices.SendProposal(body);
      return { landing: data };
    } catch (error) {
      console.log("Errrr", error);
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  getWalletBalance: null,
  getUsersTransaction: null,
  createProposal: null,
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

    builder.addCase(SendProposal.fulfilled, (state, action) => {
      state.createProposal = action.payload.landing;
    });
    builder.addCase(SendProposal.rejected, (state) => {
      state.createProposal = null;
    });
  },
});

const { reducer } = transactionSlice;
export default reducer;
