import { configureStore } from "@reduxjs/toolkit";
import todolistReducer from "./todolistSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    todolist: todolistReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
