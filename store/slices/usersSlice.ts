import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../services/userApi";
import type { RootState } from "../index";

interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
// Define a type for the slice state
interface UserState {
  users: Array<UserInfo>;
  status: string;
  error: SerializedError;
}

// Define the initial state using that type
const initialState: UserState = {
  users: [],
  status: "",
  error: { code: "" },
};

export const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.users = payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.users;

export default usersSlice.reducer;
