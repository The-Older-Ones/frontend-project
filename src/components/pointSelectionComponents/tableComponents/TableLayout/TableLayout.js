// import React, { useEffect, useState, useMemo } from 'react';
// import { Grid, Paper, Typography, Button, LinearProgress, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import SocketManager from '../../../../services/SocketManager';
// import { BaseColors } from '../../../../theme/theme';
// import { setChosenCategory, setChosenPoints } from '../../../../store/slices/gameSlices/gameSlice';

// const TableLayout = () => {
// 	const rows = useMemo(
// 		() => [
// 			[100, 100, 100, 100, 100],
// 			[200, 200, 200, 200, 200],
// 			[300, 300, 300, 300, 300],
// 			[600, 600, 600, 600, 600],
// 			[1000, 1000, 1000, 1000, 1000],
// 		],
// 		[]
// 	);

// 	const navigate = useNavigate();
// 	const { isChosen } = useSelector((state) => state.game);
// 	const { path } = useSelector((state) => state.route);
// 	const dispatch = useDispatch();
// 	const { gameCategories } = useSelector((state) => state.gameSettings);
// 	const handleClick = (event) => {
// 		const pointPosition = event.target.value;
// 		const points = rows[pointPosition[0]][0];
// 		const chosenCategory = gameCategories[pointPosition[2]];
// 		dispatch(setChosenCategory(chosenCategory));
// 		dispatch(setChosenPoints(points));
// 		SocketManager.giveQuestion(chosenCategory, points);
// 	};

// 	const [timer, setTimer] = useState(30); // Timer value in seconds
// 	const [randomButtonSelected, setRandomButtonSelected] = useState(false);

// 	useEffect(() => {
// 		const countdown = setInterval(() => {
// 			setTimer((prevTimer) => prevTimer - 1);
// 		}, 1000);

// 		return () => {
// 			clearInterval(countdown);
// 		};
// 	}, []);

// 	useEffect(() => {
// 		if (timer === 0 && !randomButtonSelected) {
// 			const randomRowIndex = Math.floor(Math.random() * rows.length);
// 			const randomCellIndex = Math.floor(Math.random() * rows[randomRowIndex].length);
// 			const points = rows[randomRowIndex][0];
// 			const chosenCategory = gameCategories[randomCellIndex];
// 			dispatch(setChosenCategory(chosenCategory));
// 			dispatch(setChosenPoints(points));
// 			SocketManager.giveQuestion(chosenCategory, points);
// 			setRandomButtonSelected(true);
// 		}
// 	}, [timer, randomButtonSelected, dispatch, gameCategories, rows]);

// 	useEffect(() => {
// 		if (isChosen) {
// 			setTimer(30); // Reset the timer when a button is manually chosen
// 		}
// 	}, [isChosen]);

// 	useEffect(() => {
// 		if (path === '/quiz') {
// 			navigate('/quiz');
// 		}
// 	}, [path, navigate]);

// 	const columnColors = [BaseColors.categoryOne, BaseColors.categoryTwo, BaseColors.categoryThree, BaseColors.categoryFour, BaseColors.categoryFive];

// 	return (
// 		<Box m={0}>
// 			<Grid container spacing={8}>
// 				<Grid item xs={12}>
// 					<LinearProgress variant='determinate' value={(timer / 30) * 100} color='error' />
// 					<Typography variant='h6' align='center'>
// 						{timer > 0 ? `Time remaining: ${timer}` : 'Time is up! Random question will be selected.'}
// 					</Typography>
// 				</Grid>
// 				<Grid item xs={12}>
// 					<Grid container>
// 						{gameCategories.map((category, index) => (
// 							<Grid item xs key={index}>
// 								<Paper elevation={6} sx={{ display: 'flex', justifyContent: 'center', my: 2, mx: 2, bgcolor: columnColors[index] }}>
// 									<Typography variant='h6' fontWeight={'bold'}>
// 										{category}
// 									</Typography>
// 								</Paper>
// 							</Grid>
// 						))}
// 					</Grid>
// 				</Grid>
// 				{rows.map((row, index) => (
// 					<Grid item xs={12} key={index}>
// 						<Grid container>
// 							{row.map((cell, cellIndex) => {
// 								return (
// 									<Grid item xs key={cellIndex}>
// 										<Paper
// 											elevation={2}
// 											sx={{
// 												display: 'flex',
// 												justifyContent: 'center',
// 												mx: 3,
// 											}}
// 										>
// 											<Button
// 												variant='contained'
// 												sx={{ width: '100%', bgcolor: columnColors[cellIndex] }}
// 												value={[index, cellIndex]}
// 												onClick={(e) => {
// 													handleClick(e);
// 												}}
// 											>
// 												{cell}
// 											</Button>
// 										</Paper>
// 									</Grid>
// 								);
// 							})}
// 						</Grid>
// 					</Grid>
// 				))}
// 			</Grid>
// 		</Box>
// 	);
// };

// export default TableLayout;

import React, { useEffect, useReducer, useMemo } from 'react';
import { Grid, Paper, Typography, Button, LinearProgress, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SocketManager from '../../../../services/SocketManager';
import { BaseColors } from '../../../../theme/theme';
import { setChosenCategory, setChosenPoints } from '../../../../store/slices/gameSlices/gameSlice';

const TIMER_VALUE = 30;
const ROW_VALUES = [
	[100, 100, 100, 100, 100],
	[200, 200, 200, 200, 200],
	[300, 300, 300, 300, 300],
	[600, 600, 600, 600, 600],
	[1000, 1000, 1000, 1000, 1000],
];

const initialState = { timer: TIMER_VALUE, randomButtonSelected: false };
const reducer = (state, action) => {
	switch (action.type) {
		case 'DECREMENT_TIMER':
			return { ...state, timer: state.timer - 1 };
		case 'RESET_TIMER':
			return { ...state, timer: TIMER_VALUE };
		case 'SET_RANDOM_BUTTON_SELECTED':
			return { ...state, randomButtonSelected: true };
		default:
			return state;
	}
};

const TableLayout = () => {
	const [state, dispatchState] = useReducer(reducer, initialState);
	const theme = useTheme();
	const navigate = useNavigate();
	const { isChosen } = useSelector((state) => state.game);
	const { path } = useSelector((state) => state.route);
	const dispatch = useDispatch();
	const { gameCategories } = useSelector((state) => state.gameSettings);

	const COLUMN_COLORS = useMemo(() => [BaseColors.categoryOne, BaseColors.categoryTwo, BaseColors.categoryThree, BaseColors.categoryFour, BaseColors.categoryFive], []);

	const handleClick = (event) => {
		const pointPosition = event.target.value;
		const points = ROW_VALUES[pointPosition[0]][0];
		const chosenCategory = gameCategories[pointPosition[2]];
		dispatch(setChosenCategory(chosenCategory));
		dispatch(setChosenPoints(points));
		SocketManager.giveQuestion(chosenCategory, points);
	};

	useEffect(() => {
		const countdown = setInterval(() => {
			dispatchState({ type: 'DECREMENT_TIMER' });
		}, 1000);

		return () => {
			clearInterval(countdown);
		};
	}, []);

	useEffect(() => {
		if (state.timer === 0 && !state.randomButtonSelected) {
			const randomRowIndex = Math.floor(Math.random() * ROW_VALUES.length);
			const randomCellIndex = Math.floor(Math.random() * ROW_VALUES[randomRowIndex].length);
			const points = ROW_VALUES[randomRowIndex][0];
			const chosenCategory = gameCategories[randomCellIndex];
			dispatch(setChosenCategory(chosenCategory));
			dispatch(setChosenPoints(points));
			SocketManager.giveQuestion(chosenCategory, points);
			dispatchState({ type: 'SET_RANDOM_BUTTON_SELECTED' });
		}
	}, [state.timer, state.randomButtonSelected, dispatch, gameCategories]);

	useEffect(() => {
		if (isChosen) {
			dispatchState({ type: 'RESET_TIMER' });
		}
	}, [isChosen]);
	useEffect(() => {
		if (path === '/quiz') {
			navigate('/quiz');
		}
	}, [path, navigate]);

	return (
		<Box m={0}>
			<Grid container spacing={8}>
				<Grid item xs={12}>
					<LinearProgress variant="determinate" value={(state.timer / TIMER_VALUE) * 100} color="error" />
					<Typography variant="h6" align="center">
						{state.timer > 0 ? `Time remaining: ${state.timer}` : 'Time is up! Random question will be selected.'}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container>
						{gameCategories.map((category, index) => (
							<Grid item xs key={category}>
								<Paper elevation={6} sx={{ display: 'flex', justifyContent: 'center', my: 2, mx: 2, bgcolor: COLUMN_COLORS[index] }}>
									<Typography variant="h6" fontWeight={'bold'}>
										{category}
									</Typography>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Grid>
				{ROW_VALUES.map((row, rowIndex) => (
					<Grid item xs={12} key={rowIndex}>
						<Grid container>
							{row.map((cell, cellIndex) => (
								<Grid item xs key={`${rowIndex}-${cellIndex}`}>
									<Paper
										elevation={2}
										sx={{
											display: 'flex',
											justifyContent: 'center',
											mx: 3,
											borderRadius: theme.spacing(4)
										}}
									>
										<Button
											variant="contained"
											sx={{ width: '100%', bgcolor: COLUMN_COLORS[cellIndex], py: theme.spacing(2), borderRadius: theme.spacing(4) }}
											value={[rowIndex, cellIndex]}
											onClick={(e) => {
												handleClick(e);
											}}
										>
											<Typography variant="h5" color="initial" fontWeight={"bold"}>{cell}</Typography>
										</Button>
									</Paper>
								</Grid>
							))}
						</Grid>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default TableLayout;
