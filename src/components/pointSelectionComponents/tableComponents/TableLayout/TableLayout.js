import React, { useEffect, useState, useMemo } from 'react';
import { Grid, Paper, Typography, Button, LinearProgress, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../../socket';
import { BaseColors } from '../../../../theme';
import { setQuestion, setAnswers, setIsChosen, setChosenCategory, setChosenPoints, newQuestionSelected } from '../../../../store/slices/gameSlices/gameSlice';

const TableLayout = () => {
	const rows = useMemo(
		() => [
			[100, 100, 100, 100, 100],
			[200, 200, 200, 200, 200],
			[300, 300, 300, 300, 300],
			[600, 600, 600, 600, 600],
			[1000, 1000, 1000, 1000, 1000],
		],
		[]
	);

	const navigate = useNavigate();
	const { isChosen } = useSelector((state) => state.game);
	const dispatch = useDispatch();
	const { gameCategories } = useSelector((state) => state.gameSettings);
	const handleClick = (event) => {
		// Navigate to the quiz page and pass the selected points as state
		// navigate('/quiz', { state: { points } });
		const pointPosition = event.target.value;
		const points = rows[pointPosition[0]][0];
		const chosenCategory = gameCategories[pointPosition[2]];
		dispatch(setChosenCategory(chosenCategory));
		dispatch(setChosenPoints(points));
		socket.emit('giveQuestion', {
			category: chosenCategory,
			difficulty: points,
		});
	};

	const [timer, setTimer] = useState(30); // Timer value in seconds
	const [randomButtonSelected, setRandomButtonSelected] = useState(false);

	useEffect(() => {
		const countdown = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1);
		}, 1000);

		return () => {
			clearInterval(countdown);
		};
	}, []);

	useEffect(() => {
		if (timer === 0 && !randomButtonSelected) {
			const randomRowIndex = Math.floor(Math.random() * rows.length);
			const randomCellIndex = Math.floor(Math.random() * rows[randomRowIndex].length);
			const points = rows[randomRowIndex][0];
			const chosenCategory = gameCategories[randomCellIndex];
			dispatch(setChosenCategory(chosenCategory));
			dispatch(setChosenPoints(points));
			socket.emit('giveQuestion', {
				category: chosenCategory,
				difficulty: points,
			});
			setRandomButtonSelected(true);
		}
	}, [timer, randomButtonSelected, dispatch, gameCategories, rows]);

	useEffect(() => {
		if (isChosen) {
			setTimer(30); // Reset the timer when a button is manually chosen
		}
	}, [isChosen]);

	useEffect(() => {
		const handleChoseQuestion = (data) => {
			dispatch(setQuestion(data.question));
			dispatch(setAnswers(data.allAnswers));
			dispatch(setIsChosen(true));
			dispatch(setChosenCategory(data.category));
			dispatch(setChosenPoints(data.difficulty));
			dispatch(newQuestionSelected()); // Add this line
			navigate('/quiz');
		};
		socket.on('givenQuestion', handleChoseQuestion);
		return () => {
			socket.off('givenQuestion', handleChoseQuestion);
		};
	}, [dispatch, navigate]);

	const columnColors = [BaseColors.categoryOne, BaseColors.categoryTwo, BaseColors.categoryThree, BaseColors.categoryFour, BaseColors.categoryFive];

	return (
		<Box m={0}>
			<Grid container spacing={8}>
				<Grid item xs={12}>
					<LinearProgress variant="determinate" value={(timer / 30) * 100} color="error" />
					<Typography variant="h6" align="center">
						{timer > 0 ? `Time remaining: ${timer}` : 'Time is up! Random question will be selected.'}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container>
						{gameCategories.map((category, index) => (
							<Grid item xs key={index}>
								<Paper elevation={6} sx={{ display: 'flex', justifyContent: 'center', my: 2, mx: 2, bgcolor: columnColors[index] }}>
									<Typography variant="h6" fontWeight={"bold"}>{category}</Typography>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Grid>
				{rows.map((row, index) => (
					<Grid item xs={12} key={index}>
						<Grid container>
							{row.map((cell, cellIndex) => {
								return (
									<Grid item xs key={cellIndex}>
										<Paper
											elevation={2}
											sx={{
												display: 'flex',
												justifyContent: 'center',
												mx: 3,
											}}
										>
											<Button
												variant="contained"
												sx={{ width: '100%', bgcolor: columnColors[cellIndex] }}
												value={[index, cellIndex]}
												onClick={(e) => {
													handleClick(e);
												}}
											>
												{cell}
											</Button>
										</Paper>
									</Grid>
								);
							})}
						</Grid>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default TableLayout;
