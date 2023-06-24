import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		modalOpen: false,
		ruleSetOpen: false,
	},
	reducers: {
		openModal: (state) => {
			state.modalOpen = true;
		},
		closeModal: (state) => {
			state.modalOpen = false;
		},
		openRuleModal: (state) => {
			state.ruleSetOpen = true;
		},
		closeRuleModal: (state) => {
			state.ruleSetOpen = false;
		},
	},
});

export const { openModal, closeModal, openRuleModal, closeRuleModal } = loginSlice.actions;
export default loginSlice.reducer;
