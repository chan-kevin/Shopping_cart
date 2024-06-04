import { configureStore } from "@reduxjs/toolkit";
import todolistReducer from "./todolist/todolistSlice";

export const store = configureStore({
  reducer: {
    todolist: todolistReducer,
  },
});
