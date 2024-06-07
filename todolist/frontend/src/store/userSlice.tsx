import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  password: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = { users: [] };

const baseURL = "http://localhost:5000/users";

export const signUp = createAsyncThunk<User, User>(
  "todos/signUp",
  async ({ username, password }) => {
    const response = await fetch(baseURL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      signUp.fulfilled,
      (state: UserState, action: PayloadAction<User>) => {}
    );
  },
});

export default userSlice.reducer;
