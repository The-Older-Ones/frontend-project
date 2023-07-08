import { createSlice } from '@reduxjs/toolkit';

const lobbySlice = createSlice({
	name: 'lobby',
	initialState: {
		ign: '',
		host: false,
		hostSocketID: undefined,
		playerSocketID: undefined,
		avatar: '',
		avatars: ['/avataaars1.png', '/avataaars2.png', '/avataaars3.png', '/avataaars4.png', '/avataaars5.png', '/avataaars6.png'],
		avatarIndex: 0,
		colorIndex: 0,
		activeStep: 0,
		lobbySelection: false,
		lobbyCode: '',
	},
	reducers: {
		setIGN: (state, action) => {
			state.ign = action.payload;
		},
		setHostSocketID: (state, action) => {
			state.hostSocketID = action.payload;
		},
		setPlayerSocketId: (state, action) => {
			state.playerSocketID = action.payload;
			console.log('LOBBY SLICE: ' + action.payload);
			console.log('LOBBY SLICE: ' + state.playerSocketID);
		},
		setActiveStep: (state, action) => {
			if (state.activeStep <= 2 && state.activeStep >= 0) {
				state.activeStep = action.payload;
			}
		},
		setHost: (state, action) => {
			state.host = action.payload;
		},

		setLobbySelection: (state, action) => {
			state.lobbySelection = action.payload;
		},
		setLobbyCode: (state, action) => {
			state.lobbyCode = action.payload;
		},
		setAvatarIndex: (state, action) => {
			state.avatarIndex = action.payload;
		},
		setAvatar: (state, action) => {
			state.avatar = action.payload;
		}
	},
});

export const { setIGN, setActiveStep, setHost, setLobbySelection, setLobbyCode, setHostSocketID, setPlayerSocketId, setAvatar, setAvatarIndex, setAvatarUpdate } = lobbySlice.actions;

export default lobbySlice.reducer;

export const hostSocketID = (state) => state.lobby.hostSocketID;
export const hostIGN = (state) => state.lobby.ign;
