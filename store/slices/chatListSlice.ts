import { createSlice } from "@reduxjs/toolkit";
import { getChatList } from "../../services/userApi";
import type { RootState } from "../index";

interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
// Define a type for the slice state
interface ChatListState {
  chatUserInfos?: Array<{
    conversationid: string;
    targetUserInfo: UserInfo;
  }>;
  status: string;
  error: SerializedError;
}

// Define the initial state using that type
const initialState: ChatListState = {
  chatUserInfos: undefined,
  status: "",
  error: {},
};

export const chatListSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChatList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getChatList.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.chatUserInfos = payload;
    });
    builder.addCase(getChatList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.users;

export default chatListSlice.reducer;
