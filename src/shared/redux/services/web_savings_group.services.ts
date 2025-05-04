// store/thunks/createSavingsCircle.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "./headers";


const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

const createSavingsCircle = createAsyncThunk(
  "savingcircle/create",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/savingcircle/create`, formData, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);

export default createSavingsCircle;
