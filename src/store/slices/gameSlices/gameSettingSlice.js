import { createSlice } from '@reduxjs/toolkit';
import { hostIGN, hostSocketID } from '../landingPageSlices/lobbySlice';

const gameSettingSlice = createSlice({
	name: 'gameSettings',
	initialState: {
		categories: [],
		playerNumber: 0,
		rounds: 0,
		players: [],
		lockedCategory: [],
	},
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload;
		},
		setPlayerNumber: (state, action) => {
			state.playerNumber = action.payload;
		},
		setRounds: (state, action) => {
			state.rounds = action.payload;
		},
		setPlayers: (state, action) => {
			Object.entries(action.payload.lobbyMember).forEach(([socketId, playerName]) => {
				const playerExists = state.players.find((player) => player.socketId === socketId);
				if (!playerExists) {
					const player = {
						playerName,
						socketId,
					};
					state.players.push(player);
				}
			});
		},
	},
});

export const getHostInfo = () => (dispatch, getState) => {
	const state = getState();
	const hostID = hostSocketID(state);
	const ign = hostIGN(state);
	const lobbyMember = {
		[hostID]: ign,
	};
	if (hostID && ign) dispatch(setPlayers({ lobbyMember }));
};

export const { setCategories, setPlayerNumber, setRounds, setPlayers } = gameSettingSlice.actions;
export default gameSettingSlice.reducer;
