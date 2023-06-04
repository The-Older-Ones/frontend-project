import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
	name: 'game',
	initialState: {
		question: null,
		answers: [],
		isChosen: false,
		chosenCategory: null,
		chosenPoints: 0,
        everyoneAnswered: false,
	},
	reducers: {
		setQuestion: (state, action) => {
			state.question = action.payload;
		},
		setAnswers: (state, action) => {
			state.answers = action.payload;
		},
		setIsChosen: (state, action) => {
			state.isChosen = action.payload;
		},
		setChosenCategory: (state, action) => {
			state.chosenCategory = action.payload;
		},
		setChosenPoints: (state, action) => {
			state.chosenPoints = action.payload;
		},
        setEveryoneAnswered: (state, action) => {
            state.everyoneAnswered = action.payload;
        }
	},
});

export const { setQuestion, setAnswers, setIsChosen, setChosenCategory, setChosenPoints, setEveryoneAnswered } = gameSlice.actions;
export default gameSlice.reducer;
