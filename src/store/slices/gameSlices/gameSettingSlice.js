import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import SocketManager from '../../../services/SocketManager';
const gameSettingSlice = createSlice({
	name: 'gameSettings',
	initialState: {
		categories: [],
		playerNumber: 0,
		rounds: 0,
		players: [],
		/**
		 *  players: [{
		 * 		socketId,
		 * 		playerName,
		 * 		readyForNextRound
		 * }]
		 */
		mappedCategories: [],
		lockedCategories: [],
		gameCategories: [],
		pending: false,
		categoryCheck: false,
		modalRuleSet: false,
		nextPlayer: null,
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
		setOpenModalRuleSet: (state) => {
			state.modalRuleSet = true;
		},
		setCloseModalRuleSet: (state) => {
			state.modalRuleSet = false;
		},
		setPlayerNumber: (state, action) => {
			state.playerNumber = action.payload;
		},
		setRounds: (state, action) => {
			state.rounds = action.payload;
		},
		setPlayers: (state, action) => {
			console.log(action);
			action.payload.forEach(({ socketId, playerName }) => {
				const playerExists = state.players.find((player) => player.socketId === socketId);
				if (!playerExists) {
					const player = {
						playerName,
						socketId,
						readyForNextRound: false,
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
				if (category.selected) {
					return category;
				} else {
					return null;
				}
			});
			state.lockedCategories = filterLockedCategories;
		},
		setGameCategories: (state) => {
			state.gameCategories = state.lockedCategories.map((category) => category.categoryName);
			toast.info('Game categories locked', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			state.categoryCheck = true;
		},
		setGuestGameCategories: (state, action) => {
			state.gameCategories = action.payload;
			state.categoryCheck = false;
		},
		setPending: (state, action) => {
			state.pending = action.payload;
		},
		setNextPlayer: (state, action) => {
			state.nextPlayer = action.payload;
		},
	},
});

// export const handlePlayerIsReadyThunk = (socketID) => {
// 	return (dispatch, getState) => {
// 		dispatch(gameSettingSlice.actions.setPlayerIsReady({ socketID }));
// 		const updatedPlayers = getState().gameSettings.players;
// 		const dataToSend = { data: updatedPlayers };
// 		console.log('Data sent to server: ', dataToSend);
// 		SocketManager.lobbySync(dataToSend);
// 	};
// };

export const {
	setCategories,
	setPlayerNumber,
	setRounds,
	setPlayers,

	setSelectedCategory,
	setGameCategories,
	setPending,
	setGuestGameCategories,
	setOpenModalRuleSet,
	setCloseModalRuleSet,
	setNextPlayer,
} = gameSettingSlice.actions;

export default gameSettingSlice.reducer;
