// routeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const routeSlice = createSlice({
	name: 'route',
	initialState: {
        path: '/',
    },
	reducers: {
		setRoute: (state, action) => {
			state.path = action.payload;
		},
	},
});

export const { setRoute } = routeSlice.actions;

export default routeSlice.reducer;
