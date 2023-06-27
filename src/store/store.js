import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/landingPageSlices/loginSlice';
import authReducer from './slices/landingPageSlices/authSlice';
import lobbyReducer from './slices/landingPageSlices/lobbySlice';
import socketReducer from './slices/landingPageSlices/socketSlice';
import gameSettingReducer from './slices/gameSlices/gameSettingSlice';
import gameReducer from './slices/gameSlices/gameSlice';
import routeReducer from './slices/routeSlice';

export const store = configureStore({
	reducer: {
		login: loginReducer,
		auth: authReducer,
		lobby: lobbyReducer,
		socket: socketReducer,
		gameSettings: gameSettingReducer,
		game: gameReducer,
		route: routeReducer,
	},
	devTools: true,
});
