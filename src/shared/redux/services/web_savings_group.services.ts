// store/thunks/createSavingsCircle.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "./headers";
import { useSelector } from "react-redux";


const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;


const createSavingsCircle = createAsyncThunk(
  "savingcircle/create",
  async (formData: any, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/savingcircle/create`, formData, {
        headers: {
          ...authHeader(),
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);


export default createSavingsCircle;
