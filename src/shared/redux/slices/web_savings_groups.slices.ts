import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    //console.log("[GetSavingCircleByUser] Starting thunk with userID:", userID);

    try {
      //console.log("[GetSavingCircleByUser] Calling service function...");
      const data = await WebGroupSavings.GetSavingCircleByUser(userID);
      //console.log("[GetSavingCircleByUser] Service returned data:", data);

      const result = { web_group_savings: data };
      //console.log("[GetSavingCircleByUser] Returning to reducer:", result);
      return result;
    } catch (error: any) {
      //console.error("[GetSavingCircleByUser] Thunk error:", error);
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

export const GetPublicSavingCircles = createAsyncThunk(
  "savingcircle/public",
  async (_, thunkAPI) => {
    try {
      const response = await WebGroupSavings.GetPublicSavingCircles();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch public circles",
      );
    }
  },
);

export const JoinSavingCircle = createAsyncThunk(
  "savingcircle/join",
  async (circleData: { circleId: string }, thunkAPI) => {
    console.log("[JoinSavingCircle] Starting thunk with data:", circleData);

    try {
      console.log("[JoinSavingCircle] Calling service function...");
      const data = await WebGroupSavings.JoinSavingCircle(circleData);
      console.log("[JoinSavingCircle] Service returned data:", data);

      const result = { join_response: data };
      console.log("[JoinSavingCircle] Returning to reducer:", result);
      return result;
    } catch (error: any) {
      console.error("[JoinSavingCircle] Thunk error:", error);
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetUserTotalGroupBalance = createAsyncThunk(
  "savingcircle/userTotalBalance",
  async (_, thunkAPI) => {
    try {
      const data = await WebGroupSavings.GetUserTotalGroupBalance();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch total group balance",
      );
    }
  },
);

export const GetSavingCircleHistory = createAsyncThunk(
  "savingcircle/history",
  async (circleId: string, thunkAPI) => {
    try {
      const data = await WebGroupSavings.GetSavingCircleHistory(circleId);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch circle transaction history",
      );
    }
  },
);

export const InitializeSavingCirclePayment = createAsyncThunk(
  "savingcircle/initializePayment",
  async (
    paymentData: {
      circleId: string;
      userId: string;
      depositAmount: number;
      paymentType: string;
      callbackUrl: string;
    },
    thunkAPI,
  ) => {
    try {
      const data = await WebGroupSavings.InitializeSavingCirclePayment(paymentData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to initialize payment",
      );
    }
  },
);

export const MakeSavingCirclePayment = createAsyncThunk(
  "savingcircle/makePayment",
  async (
    paymentData: {
      circleId: string;
      userId: string;
      paymentType: string;
    },
    thunkAPI,
  ) => {
    try {
      const data = await WebGroupSavings.MakeSavingCirclePayment(paymentData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to process payment",
      );
    }
  },
);

export const VerifySavingCirclePayment = createAsyncThunk(
  "savingcircle/verifyPayment",
  async (reference: string, thunkAPI) => {
    try {
      const data = await WebGroupSavings.VerifySavingCirclePayment(reference);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to verify payment",
      );
    }
  },
);

interface WebGroupSavingsType {
  loading: boolean;
  error: string;
  web_group_savings: any;
  public_savings: any;
  join_response: any;
  totalGroupBalance: number | null;
  totalGroupBalanceLoading: boolean;
  totalGroupBalanceError: string | null;
  circleHistory: any[];
  historyLoading: boolean;
  historyError: string | null;
  paymentInitialization: any | null;
  payment: any | null;
  paymentVerification: any | null;
  paymentLoading: boolean;
  paymentError: string | null;
}
const initialState: WebGroupSavingsType = {
  loading: false,
  error: "",
  web_group_savings: null,
  public_savings: null,
  join_response: null,
  totalGroupBalance: null,
  totalGroupBalanceLoading: false,
  totalGroupBalanceError: null,
  circleHistory: [],
  historyLoading: false,
  historyError: null,
  paymentInitialization: null,
  payment: null,
  paymentVerification: null,
  paymentLoading: false,
  paymentError: null,
};

const webGroupSavingsSlice = createSlice({
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
          web_group_savings: action.payload.web_group_savings?.data || [],
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
        return {
          ...state,
          loading: false,
          web_group_savings: action.payload.data || [],
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
      })

      .addCase(GetPublicSavingCircles.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetPublicSavingCircles.fulfilled, (state, action) => {
        state.loading = false;
        state.public_savings = action.payload.data || [];
      })
      .addCase(GetPublicSavingCircles.rejected, (state, action) => {
        state.loading = false;
        state.public_savings = null;
        state.error =
          (action.payload as string) || "Failed to fetch public circles";
      })

      .addCase(JoinSavingCircle.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(JoinSavingCircle.fulfilled, (state, action) => {
        state.loading = false;
        state.join_response = action.payload.join_response;
      })
      .addCase(JoinSavingCircle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(GetUserTotalGroupBalance.pending, (state) => {
        state.totalGroupBalanceLoading = true;
        state.totalGroupBalanceError = null;
      })
      .addCase(GetUserTotalGroupBalance.fulfilled, (state, action) => {
        state.totalGroupBalanceLoading = false;
        state.totalGroupBalance = action.payload?.data ?? 0;
      })
      .addCase(GetUserTotalGroupBalance.rejected, (state, action) => {
        state.totalGroupBalanceLoading = false;
        state.totalGroupBalanceError = action.payload as string;
      })

      .addCase(GetSavingCircleHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(GetSavingCircleHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.circleHistory = action.payload?.data || [];
      })
      .addCase(GetSavingCircleHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload as string;
      })

      .addCase(InitializeSavingCirclePayment.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(InitializeSavingCirclePayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.paymentInitialization = action.payload;
      })
      .addCase(InitializeSavingCirclePayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload as string;
      })

      .addCase(MakeSavingCirclePayment.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(MakeSavingCirclePayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.payment = action.payload;
      })
      .addCase(MakeSavingCirclePayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload as string;
      })

      .addCase(VerifySavingCirclePayment.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(VerifySavingCirclePayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.paymentVerification = action.payload;
      })
      .addCase(VerifySavingCirclePayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload as string;
      });
  },
});

export const {
  reducer: webGroupSavingsReducer,
  actions: webGroupSavingsActions,
} = webGroupSavingsSlice;
