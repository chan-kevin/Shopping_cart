import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  password: string;
}

interface UserState {
  username: string | null;
  accessToken: string | null;
}

const initialState: UserState = { username: null, accessToken: null };

const baseURL = "http://localhost:5000/users";

export const signup = createAsyncThunk<User, User>(
  "todos/signup",
  async ({ username, password }, { dispatch }) => {
    try {
      const response = await fetch(baseURL + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const user = await response.json();
      dispatch(login({ username: user.username, password: password }));
      return user;
    } catch (err) {
      alert(err);
    }
  }
);

export const login = createAsyncThunk<UserState, User>(
  "todos/login",
  async ({ username, password }) => {
    try {
      const response = await fetch(baseURL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      return response.json();
    } catch (err) {
      alert(err);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state: UserState, action: PayloadAction<UserState>) => {
        state.username = action.payload.username;
        state.accessToken = action.payload.accessToken;
      }
    );
  },
});

export default userSlice.reducer;
