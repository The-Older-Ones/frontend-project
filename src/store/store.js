import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/landingPageSlices/loginSlice';
import authReducer from './slices/landingPageSlices/authSlice';
import lobbyReducer from './slices/landingPageSlices/lobbySlice';
import socketReducer from './slices/landingPageSlices/socketSlice';
import categoriesReducer from './slices/lobbyPageSlices/categorySlice';

export const store = configureStore({
	reducer: {
		login: loginReducer,
		auth: authReducer,
		lobby: lobbyReducer,
		socket: socketReducer,
		categories: categoriesReducer,
	},
	devTools: true,
});
