import { createSlice } from "@reduxjs/toolkit";
import { excuteLogin } from "../../services/authApi";
import type { RootState } from "../index";

interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
// Define a type for the slice state
interface authState {
  auth: Array<object>;
  status: string;
  error: SerializedError;
}

// Define the initial state using that type
const initialState: authState = {
  auth: [],
  status: "",
  error: {},
};

export const authSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(excuteLogin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(excuteLogin.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.auth = payload;
    });
    builder.addCase(excuteLogin.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.users;

export default authSlice.reducer;
