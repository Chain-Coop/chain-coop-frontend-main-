import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import webGroupServices from "../services/webGroup.services";

export const CreateContributionPlan = createAsyncThunk(
  "webGroup/createGroupContribution",
  async (body: any, thunkAPI) => {
    try {
      const data = await webGroupServices.CreateGroupContribution(body);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error || error);
    }
  },
);

interface webGroupState {
  contributionPlan: any;
  loading: boolean;
  error: string | null;
}

const initialState: webGroupState = {
  contributionPlan: null,
  loading: false,
  error: null,
};
export const WebGroupSlices = createSlice({
  name: "webGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        CreateContributionPlan.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.contributionPlan = action.payload.contribution;
          state.error = null;
        },
      )

      .addCase(CreateContributionPlan.rejected, (state, action) => {
        state.contributionPlan = null;
        state.error =
          (action as string | Record<string, unknown>) ||
          "An unknown error occurred";
      });
  },
});

export default WebGroupSlices.reducer;
