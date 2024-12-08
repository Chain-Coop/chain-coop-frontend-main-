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

export const updateNotificationStatus = createAsyncThunk(
  "notificationApplication/updateNotificationStatus",
  async (notificationId: string, thunkAPI) => {
    try {
      const response =
        await notificationServices.updateNotificationStatus(notificationId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
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
  updateNotification: null;
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
  updateNotification: null,
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
      })
      .addCase(updateNotificationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateNotificationStatus.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.updateNotification = action.payload;
        },
      )
      .addCase(updateNotificationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update Notification";
      });
  },
});

const { reducer } = notificationSlice;

export default reducer;
