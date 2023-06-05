import { createSlice } from '@reduxjs/toolkit';
// Import socket.io connection, this triggers the connection.
import socket from '../../../socket';

const socketSlice = createSlice({
	name: 'socket',
	initialState: {
		isConnected: false,
	},
	reducers: {
		setConnected: (state, action) => {
			state.isConnected = action.payload;
		},

	},
});

export const { setConnected } = socketSlice.actions;
export default socketSlice.reducer;
