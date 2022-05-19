import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../../services/notificationApi";
import type { RootState } from "../index";

interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
// Define a type for the slice state
interface NotificationState {
  senderInfo?: Array<UserInfo>;
  status: string;
  error: SerializedError;
}

// Define the initial state using that type
const initialState: NotificationState = {
  senderInfo: undefined,
  status: "",
  error: {},
};

export const notificationSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.senderInfo = payload;
    });
    builder.addCase(getNotifications.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.users;

export default notificationSlice.reducer;
