import React, { useEffect } from 'react';
import { Box, Stack, Button, Grid, useTheme, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import { setEveryoneAnswered } from '../../store/slices/gameSlices/gameSlice';

export const QuizPage = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
    const {players} = useSelector((state) => state.gameSettings);
	const { question, answers, chosenCategory, chosenPoints, everyoneAnswered } = useSelector((state) => state.game);
    console.log(players);
	const handleSetAnswer = (e) => {
		const answer = e.target.value;
		socket.emit('setAnswer', { answer: answer });
	};

	useEffect(() => {
		const handlePlayerAnswered = (data) => {
			console.log(data);
		};
		socket.on('playerAnswered', handlePlayerAnswered);
		socket.on('roundFinished', (data) => {
            console.log(data);
			dispatch(setEveryoneAnswered(!everyoneAnswered));
		});
	});

	return (
		<Stack
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box
				sx={{
					bgcolor: theme.palette.secondary.light,
					width: '800px',
					height: '500px',
					p: '16px',
					m: '50px',
				}}
			>
				<Paper
					elevation={6}
					sx={{
						bgcolor: theme.palette.secondary.main,
						padding: '20px',
					}}
				>
					<Grid container my={2}>
						<Grid item xs={9}>
							{'Category: ' + chosenCategory}
						</Grid>
						<Grid item xs={3}>
							{chosenPoints + ' Points'}
						</Grid>
					</Grid>
				</Paper>
				<Box padding="20px">{question}</Box>
			</Box>
			<Box
				sx={{
					bgcolor: theme.palette.secondary.light,
					p: '16px',
					width: '900px',
					m: theme.spacing(2),
				}}
			>
				{
					<Grid container my={4} rowSpacing={2} columnSpacing={1} m={4}>
						{answers.map((answer, index) => (
							<Grid item xs={6} key={index}>
								<Button bgcolor={theme.palette.primary.light} variant="contained" value={answer} onClick={handleSetAnswer}>
									{answer}
								</Button>
							</Grid>
						))}
					</Grid>
				}
                {
					<Grid container my={4} rowSpacing={2} columnSpacing={1} m={4}>
						{answers.map((answer, index) => (
							<Grid item xs={6} key={index}>
								<Button bgcolor={theme.palette.primary.light} variant="contained" value={answer} onClick={handleSetAnswer}>
									{answer}
								</Button>
							</Grid>
						))}
					</Grid>
				}
			</Box>
		</Stack>
	);
};
