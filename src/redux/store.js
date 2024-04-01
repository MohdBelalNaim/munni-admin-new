import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../redux/toggleSlice";
export const store = configureStore({
  reducer: {
    toggleReducer,
  },
});
