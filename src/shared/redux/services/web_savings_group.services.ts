// store/thunks/createSavingsCircle.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "./headers";
import { useSelector } from "react-redux";

const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

const handleApiError = (error: any) => {
  if (!error.response) {
    throw new Error("Network Error: Please check your internet connection.");
  } else {
    throw error.response.data;
  }
};

const CreateSavingsCircle = createAsyncThunk(
  "savingcircle/create",
  async (formData: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/savingcircle/create`,
        formData,
        {
          headers: {
            ...authHeader(),
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong",
      );
    }
  },
);

const GetAllSavingCircles = async () => {
  const url = `${API_URL}/savingcircle/circles`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GetSavingCircleByUser = async (userID: string) => {
  const url = `${API_URL}/savingcircle/user/${userID}`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GetSavingCircleByID = async (circleID: string) => {
  const url = `${API_URL}/savingcircle/${circleID}`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const WebGroupSavings = {
  CreateSavingsCircle,
  GetAllSavingCircles,
  GetSavingCircleByUser,
  GetSavingCircleByID,
};

export default WebGroupSavings;
