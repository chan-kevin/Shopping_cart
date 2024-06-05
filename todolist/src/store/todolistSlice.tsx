import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  content: string;
}

interface TodoState {
  todos: Todo[];
}

const baseURL = "http://localhost:3000/todos";
const initialState: TodoState = { todos: [] };

export const getTodos = createAsyncThunk<Todo[]>("todos/getTodos", async () => {
  const response = await fetch(baseURL);
  return response.json();
});

export const addTodo = createAsyncThunk<Todo, string>(
  "todos/addTodo",
  async (content) => {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  }
);

export const updateTodo = createAsyncThunk<
  Todo,
  { id: number; content: string }
>("todos/updateTodo", async ({ id, content }) => {
  const response = await fetch(baseURL + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  return response.json();
});

export const deleteTodo = createAsyncThunk<{ id: number }, number>(
  "todos/deleteTodo",
  async (id) => {
    const response = await fetch(baseURL + "/" + id, {
      method: "DELETE",
    });
    return response.json();
  }
);

const todolistSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getTodos.fulfilled,
        (state: TodoState, action: PayloadAction<Todo[]>) => {
          state.todos = action.payload.reverse();
        }
      )
      .addCase(
        addTodo.fulfilled,
        (state: TodoState, action: PayloadAction<Todo>) => {
          state.todos.unshift(action.payload);
        }
      )
      .addCase(
        updateTodo.fulfilled,
        (state: TodoState, action: PayloadAction<Todo>) => {
          state.todos = state.todos.map((todo) => {
            if (todo.id === action.payload.id) {
              return { ...todo, content: action.payload.content };
            } else {
              return todo;
            }
          });
        }
      )
      .addCase(
        deleteTodo.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload.id
          );
        }
      );
  },
});

export default todolistSlice.reducer;
