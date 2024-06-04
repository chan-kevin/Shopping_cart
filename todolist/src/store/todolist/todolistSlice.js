import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseURL = "http://localhost:3000/todos";
const initialState = { todos: [] };

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await fetch(baseURL);
  return response.json();
});

export const addTodo = createAsyncThunk("todos/addTodo", async (content) => {
  const response = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  return response.json();
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, content }) => {
    const response = await fetch(baseURL + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await fetch(baseURL + "/" + id, {
    method: "DELETE",
  });
  return response.json();
});

const todolistSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload.reverse();
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, content: action.payload.content };
          } else {
            return todo;
          }
        });
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      });
  },
});

export default todolistSlice.reducer;
