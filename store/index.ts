import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import myPageSlice from "./slices/myPageSlice";
import usersSlice from "./slices/usersSlice";
import notificationSlice from "./slices/notification";
import chatListSlice from "./slices/chatListSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    myInfo: myPageSlice,
    notificationInfo: notificationSlice,
    chatList: chatListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
