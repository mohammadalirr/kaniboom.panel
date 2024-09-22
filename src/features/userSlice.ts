import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserScheme {
  username: string;
  role: string;
}

const initialState = {
  username: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserScheme>) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
