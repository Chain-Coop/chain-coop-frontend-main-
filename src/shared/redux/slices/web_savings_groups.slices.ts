import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TransactionServices from "../services/transaction.services";
import { setMessage } from "./message.slices";
import WebGroupSavings from "../services/web_savings_group.services";

const handleAsyncError = (error: any, thunkAPI: any) => {
  let message = error.error || "An error occurred. Please try again.";

  if (!error.response) {
    message = "Network error. Please check your internet connection.";
  }
  thunkAPI.dispatch(setMessage(message));
  return thunkAPI.rejectWithValue(message);
};

export const GetAllSavingCircles = createAsyncThunk(
  "savingcircle/circles",
  async (_, thunkAPI) => {
    try {
      const data = await WebGroupSavings.GetAllSavingCircles();
      return { web_group_savings: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetSavingCircleByUser = createAsyncThunk(
  "savingcircle/getByUserID",
  async (userID: string, thunkAPI) => {
    try {
      const data = await WebGroupSavings.GetSavingCircleByUser(userID);
      return { web_group_savings: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetSavingCircleByID = createAsyncThunk(
  "savingcircle/getByCircleID",
  async (circleID: string, thunkAPI) => {
    try {
      const data = await WebGroupSavings.GetSavingCircleByID(circleID);
      return { web_group_savings: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const CreateSavingsCircle = createAsyncThunk(
  "savingcircle/create",
  async (formData: any, thunkAPI) => {
    try {
      const response = await WebGroupSavings.CreateSavingsCircle(formData);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

interface WebGroupSavingsType {
  loading: boolean;
  error: string;
  web_group_savings: any;
}

const initialState: WebGroupSavingsType = {
  loading: false,
  error: "",
  web_group_savings: null,
};

export const WebGroupSavingsSlice = createSlice({
  name: "web_group_savings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllSavingCircles.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllSavingCircles.fulfilled, (state, action) => {
        state.loading = false;
        return {
          ...state,
          web_group_savings: action.payload.web_group_savings,
        };
      })
      .addCase(GetAllSavingCircles.rejected, (state, action) => {
        state.loading = false;
        return {
          ...state,
          web_group_savings: null,
          error:
            (action.payload as string) ||
            "Failed to fetch all savings details!",
        };
      })

      .addCase(GetSavingCircleByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSavingCircleByUser.fulfilled, (state, action) => {
        state.loading = false;
        return {
          ...state,
          web_group_savings: action.payload.web_group_savings,
        };
      })
      .addCase(GetSavingCircleByUser.rejected, (state, action) => {
        state.loading = false;
        return {
          ...state,
          web_group_savings: null,
          error:
            (action.payload as string) ||
            "Failed to fetch user's savings details!",
        };
      })

      .addCase(GetSavingCircleByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSavingCircleByID.fulfilled, (state, action) => {
        state.loading = false;
        return {
          ...state,
          web_group_savings: action.payload.web_group_savings,
        };
      })
      .addCase(GetSavingCircleByID.rejected, (state, action) => {
        state.loading = false;
        return {
          ...state,
          web_group_savings: null,
          error:
            (action.payload as string) ||
            "Failed to fetch savings details by it's ID!",
        };
      })

      .addCase(CreateSavingsCircle.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateSavingsCircle.fulfilled, (state, action) => {
        state.loading = false;
        state.web_group_savings = action.payload;
        return state;
      })
      .addCase(CreateSavingsCircle.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to create savings circle!";
        return state;
      });
  },
});
