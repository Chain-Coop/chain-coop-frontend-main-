import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../redux/slices/message.slices";

/**
 * Creates an async thunk with standard error handling
 *
 * @param typePrefix Action type prefix
 * @param payloadCreator Function that creates the payload
 * @param options Additional options
 * @returns Async thunk with standardized error handling
 */
export function createAppThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: (arg: ThunkArg) => Promise<Returned>,
  options: {
    transformSuccess?: (data: Returned) => any;
    errorMessagePath?: string;
  } = {},
) {
  const {
    transformSuccess = (data) => ({ transaction: data }),
    errorMessagePath = "error",
  } = options;

  return createAsyncThunk<any, ThunkArg>(typePrefix, async (arg, thunkAPI) => {
    try {
      const data = await payloadCreator(arg);
      return transformSuccess(data);
    } catch (error: any) {
      // Handle error message
      const message =
        error[errorMessagePath] ||
        error.msg ||
        "An error occurred. Please try again.";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  });
}

/**
 * Standard error handler for async thunks
 */
export const handleAsyncError = (error: any, thunkAPI: any) => {
  let message = error.error || "An error occurred. Please try again.";

  if (!error.response) {
    message = "Network error. Please check your internet connection.";
  }
  thunkAPI.dispatch(setMessage(message));
  return thunkAPI.rejectWithValue(message);
};
