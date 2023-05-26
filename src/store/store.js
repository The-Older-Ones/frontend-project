import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/landingPageSlices/loginSlice";
import authReducer from "./slices/landingPageSlices/authSlice";
import lobbyReducer from "./slices/landingPageSlices/lobbySlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    auth: authReducer,
    lobby: lobbyReducer,
  },
  devTools: true,
});
