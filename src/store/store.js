import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    auth: authReducer,
  },
  devTools: true,
});
