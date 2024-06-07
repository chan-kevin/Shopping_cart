import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  content: string;
}

interface TodoState {
  todos: Todo[];
}

const baseURL = "http://localhost:5000/todos";
const initialState: TodoState = { todos: [] };

export const getTodos = createAsyncThunk<Todo[]>("todos/getTodos", async () => {
  const response = await fetch(baseURL);
  return response.json();
});

export const addTodo = createAsyncThunk<Todo, string>(
  "todos/addTodo",
  async (content) => {
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      return response.json();
    } catch (err) {
      alert("failed to add todo");
    }
  }
);

export const updateTodo = createAsyncThunk<
  Todo,
  { id: string; content: string }
>("todos/updateTodo", async ({ id, content }) => {
  try {
    const response = await fetch(baseURL + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  } catch (err) {
    alert("failed to update todo");
  }
});

export const deleteTodo = createAsyncThunk<{ id: string }, string>(
  "todos/deleteTodo",
  async (id) => {
    try {
      const response = await fetch(baseURL + "/" + id, {
        method: "DELETE",
      });
      return response.json();
    } catch (err) {
      alert("failed to delete todo");
    }
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
        (state, action: PayloadAction<{ id: string }>) => {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload.id
          );
        }
      );
  },
});

export default todolistSlice.reducer;
