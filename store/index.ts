import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;