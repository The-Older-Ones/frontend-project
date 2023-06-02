import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = [];

// Define the slice
const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			return action.payload;
		},
	},
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
