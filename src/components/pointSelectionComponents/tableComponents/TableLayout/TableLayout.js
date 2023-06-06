import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../../socket';
import { setQuestion, setAnswers, setIsChosen, setChosenCategory, setChosenPoints, newQuestionSelected } from '../../../../store/slices/gameSlices/gameSlice';

const TableLayout = () => {
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

	const rows = [
		[100, 100, 100, 100, 100],
		[200, 200, 200, 200, 200],
		[300, 300, 300, 300, 300],
		[600, 600, 600, 600, 600],
		[1000, 1000, 1000, 1000, 1000],
	];

	return (
		<Grid container spacing={9}>
			<Grid item xs={12}>
				<Grid container>
					{gameCategories.map((category, index) => (
						<Grid item xs key={index}>
							<Paper elevation={6} sx={{ display: 'flex', justifyContent: 'center', my: 2, mx: 2 }}>
								<Typography variant="h6">{category}</Typography>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Grid>
			{rows.map((row, index) => (
				<Grid item xs={12} key={index}>
					<Grid container>
						{row.map((cell, cellIndex) => (
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
										sx={{ width: '100%' }}
										value={[index, cellIndex]}
										onClick={(e) => {
											handleClick(e);
										}}
									>
										{cell}
									</Button>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Grid>
			))}
		</Grid>
	);
};

export default TableLayout;
