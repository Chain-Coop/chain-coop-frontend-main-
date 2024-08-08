import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import LandingServices from "../services/landing.services";

export const RegisterUser = createAsyncThunk(
  "landing/registerUser",
  async (body, thunkAPI) => {
    try {
      const data = await LandingServices.RegisterUser(body);
      return { landing: data };
    } catch (error) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const LoginUser = createAsyncThunk(
  "landing/loginUser",
  async (body, thunkAPI) => {
    try {
      const data = await LandingServices.LoginUser(body);
      return { landing: data };
    } catch (error) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const VerifyUserAuth = createAsyncThunk(
  "landing/verifyauth",
  async (body, thunkAPI) => {
    try {
      const data = await LandingServices.VerifyUserAuth(body);
      return { landing: data };
    } catch (error) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

<<<<<<< HEAD
=======
export const CreateUserPin = createAsyncThunk(
  "landing/createPin",
  async (body, thunkAPI) => {
    try {
      const data = await LandingServices.CreateUserPin(body);
      return { landing: data };
    } catch (error) {
      const message = error.msg;
      console.log("message", message);
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
export const PublicContact = createAsyncThunk(
  "landing/publicContact",
  async (body, thunkAPI) => {
    try {
      const data = await LandingServices.PublicContact(body);
      return { landing: data };
    } catch (error) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

<<<<<<< HEAD
export const GetUserProfile = createAsyncThunk(
  "landing/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const data = await LandingServices.GetUserProfile();
      return data;
    } catch (error) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

=======
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
const initialState = {
  getUserRegistered: null,
  getloginUser: null,
  getResetOtp: null,
  getPublicContact: null,
  getUserPin: null,
<<<<<<< HEAD
  getProfile: null,
=======
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
};

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.getUserRegistered = action.payload.landing;
    });
    builder.addCase(RegisterUser.rejected, (state) => {
      state.getUserRegistered = null;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.getloginUser = action.payload.landing;
    });
    builder.addCase(LoginUser.rejected, (state) => {
      state.getloginUser = null;
    });
    builder.addCase(VerifyUserAuth.fulfilled, (state, action) => {
      state.verifyAuthData = action.payload.landing;
    });
    builder.addCase(VerifyUserAuth.rejected, (state) => {
      state.verifyAuthData = null;
    });
<<<<<<< HEAD
=======
    builder.addCase(CreateUserPin.fulfilled, (state, action) => {
      state.getUserPin = action.payload.landing;
    });
    builder.addCase(CreateUserPin.rejected, (state) => {
      state.getUserPin = null;
    });
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
    builder.addCase(PublicContact.fulfilled, (state, action) => {
      state.getPublicContact = action.payload.landing;
    });
    builder.addCase(PublicContact.rejected, (state) => {
      state.getPublicContact = null;
    });
<<<<<<< HEAD

    builder.addCase(GetUserProfile.fulfilled, (state, action) => {
      state.getProfile = action.payload;
    });
    builder.addCase(GetUserProfile.rejected, (state, action) => {
      state.getProfile = null;
      const errorMessage =
        action.error.message || "Failed to fetch user profile.";
      setMessage(errorMessage);
    });
=======
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
  },
});

const { reducer } = landingSlice;
export default reducer;
