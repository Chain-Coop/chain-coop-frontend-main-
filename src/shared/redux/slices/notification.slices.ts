import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import notificationServices from "../services/notification.services";

export const getAllNotification = createAsyncThunk(
  "notificationApplication/getAllNotification",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await notificationServices.getAllNotification(page, limit);
    return {
      notifications: response.notifications,
      totalPages: Math.ceil(response.totalCount / limit),
      totalCount: response.totalCount,
      currentPage: page,
    };
  },
);

interface ApplicationState {
  loading: boolean;
  error: string | null;
  allNotification: {
    notifications: any[];
    totalPages: number;
    currentPage: number;
    totalCount: number;
  };
}

const initialState: ApplicationState = {
  loading: false,
  error: null,
  allNotification: {
    notifications: [],
    totalPages: 0,
    currentPage: 1,
    totalCount: 0,
  },
};

export const notificationSlice = createSlice({
  name: "notificationApplication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllNotification.fulfilled,
        (
          state,
          action: PayloadAction<{
            notifications: any[];
            totalPages: number;
            currentPage: number;
            totalCount: number;
          }>,
        ) => {
          state.loading = false;
          state.allNotification = action.payload;
        },
      )
      .addCase(getAllNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

const { reducer } = notificationSlice;

export default reducer;
