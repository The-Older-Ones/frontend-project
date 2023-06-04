import { createSlice } from '@reduxjs/toolkit';
import { hostIGN, hostSocketID } from '../landingPageSlices/lobbySlice';

const gameSettingSlice = createSlice({
	name: 'gameSettings',
	initialState: {
		categories: [],
		playerNumber: 0,
		rounds: 0,
		players: [],
		mappedCategories: [],
		lockedCategories: [],
		gameCategories: [],
		pending: false,
	},
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload;
			state.mappedCategories = state.categories.map((e) => {
				return {
					categoryName: e,
					selected: false,
				};
			});
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
		setSelectedCategory: (state, action) => {
			const { categoryName, selected } = action.payload;
			const mappedCategories = state.mappedCategories.map((category) => {
				if (category.categoryName === categoryName) {
					return {
						...category,
						selected: selected,
					};
				}
				return category;
			});

			state.mappedCategories = mappedCategories;
			const filterLockedCategories = state.mappedCategories.filter((category) => {
				if (category.selected) return category;
			});
			state.lockedCategories = filterLockedCategories;
		},
		setGameCategories: (state) => {
			state.gameCategories = state.lockedCategories.map((category) => category.categoryName);
		},
		setPending: (state, action) => {
			state.pending = action.payload;
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

export const { setCategories, setPlayerNumber, setRounds, setPlayers, setSelectedCategory, setGameCategories, setPending } = gameSettingSlice.actions;
export default gameSettingSlice.reducer;
