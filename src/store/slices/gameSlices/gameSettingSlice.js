import { createSlice } from '@reduxjs/toolkit';

const gameSettingSlice = createSlice({
	name: 'gameSettings',
	initialState: {
		categories: [],
		playerNumber: 0,
		rounds: 0,

		players: [],
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
				const player = {
					playerName,
					socketId,
				};
				state.players = [...state.players, player];
			});
		},
	},
});

export const { setCategories, setPlayerNumber, setRounds, setPlayers } = gameSettingSlice.actions;
export default gameSettingSlice.reducer;
