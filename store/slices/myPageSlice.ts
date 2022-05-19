import { createSlice } from "@reduxjs/toolkit";
import { getMyPage } from "../../services/userApi";
import type { RootState } from "../index";

interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
// Define a type for the slice state
interface MyPageState {
  myInfo?: UserInfo;
  status: string;
  error: SerializedError;
}

// Define the initial state using that type
const initialState: MyPageState = {
  myInfo: undefined,
  status: "",
  error: {},
};

export const myPageSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyPage.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getMyPage.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.myInfo = payload;
    });
    builder.addCase(getMyPage.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.users;

export default myPageSlice.reducer;
