import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";

export const GetWalletBalance = createAsyncThunk(
  "transaction/getWalletBalance",
  async (thunkAPI) => {
    try {
      const data = await TransactionServices.GetWalletBalance();
      return { transaction: data};
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
  },
});

const { reducer } = transactionSlice;
export default reducer;
