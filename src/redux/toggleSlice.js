import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = toggleSlice.actions;

export default toggleSlice.reducer;
