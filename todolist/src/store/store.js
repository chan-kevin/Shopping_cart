import { configureStore } from "@reduxjs/toolkit";
import todolistReducer from "./todolistSlice";

export const store = configureStore({
  reducer: {
    todolist: todolistReducer,
  },
});
