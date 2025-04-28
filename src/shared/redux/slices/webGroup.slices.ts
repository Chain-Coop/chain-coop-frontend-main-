import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import webGroupServices from "../services/web3.services";

interface webGroupState {}

const initialState: webGroupState = {
  loading: false,
  error: null,
};
export const WebGroupSlices = createSlice({
  name: "webGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default WebGroupSlices.reducer;
