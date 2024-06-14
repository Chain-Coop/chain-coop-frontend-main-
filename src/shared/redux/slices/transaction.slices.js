import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";

export const GetWalletBalance = createAsyncThunk(
  "transaction/getWalletBalance",
  async (thunkAPI) => {
    try {
      const data = await TransactionServices.GetWalletBalance();
      return { transaction: data };
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
  },
);

export const GetUsersTransaction = createAsyncThunk(
  "transaction/getUsersTransaction",
  async (thunkAPI) => {
    try {
      const data = await TransactionServices.GetUsersTransaction();
      return { transaction: data };
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
  },
);

const initialState = {
  getWalletBalance: null,
  getUsersTransaction: null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetWalletBalance.fulfilled, (state, action) => {
      state.getWalletBalance = action.payload.transaction;
    });
    builder.addCase(GetWalletBalance.rejected, (state) => {
      state.getWalletBalance = null;
    });
    builder.addCase(GetUsersTransaction.fulfilled, (state, action) => {
      state.getUsersTransaction = action.payload.transaction;
    });
    builder.addCase(GetUsersTransaction.rejected, (state) => {
      state.getUsersTransaction = null;
    });
  },
});

const { reducer } = transactionSlice;
export default reducer;
