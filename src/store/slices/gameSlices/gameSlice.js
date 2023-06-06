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
		rightAnswer: null,
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
		},
		setRightAnswer: (state, action) => {
			state.rightAnswer = action.payload;
		},
		// NEW used after initally redirecting all players to the quiz page
		newQuestionSelected: (state) => {
			state.everyoneAnswered = false;
		},
	},
});

export const { setQuestion, setAnswers, setIsChosen, setChosenCategory, setChosenPoints, setEveryoneAnswered, setRightAnswer, newQuestionSelected } = gameSlice.actions;
export default gameSlice.reducer;
