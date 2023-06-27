import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, useTheme, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import { setEveryoneAnswered, setRightAnswer } from '../../store/slices/gameSlices/gameSlice';
import { setPlayers, setRounds } from '../../store/slices/gameSlices/gameSettingSlice';
// import { handlePlayerIsReadyThunk } from '../../store/slices/gameSlices/gameSettingSlice';
// Used to redirect to the next page, needs to be replaced after ready button works.
import { useNavigate } from 'react-router-dom';

export const QuizPage = () => {
	// Used to redirect to the next page, needs to be replaced after ready button works.
	const navigate = useNavigate();
	const [countdown, setCountdown] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const { rounds, players } = useSelector((state) => state.gameSettings);
	console.log(players);
	//

	const theme = useTheme();
	const dispatch = useDispatch();

	// const { playerSocketID, hostSocketID } = useSelector((state) => state.lobby);
	const { question, answers, chosenCategory, chosenPoints, everyoneAnswered, rightAnswer } = useSelector((state) => state.game);

	const handleSetAnswer = (e) => {
		const answer = e.target.value;
		setSelectedAnswer(answer);
		socket.emit('setAnswer', { answer: answer });
	};

	useEffect(() => {
		const handlePlayerAnswered = (data) => {
			console.log('Start of handlePlayerAnswered: ' + data);
		};
		socket.on('playerAnswered', handlePlayerAnswered);
		socket.on('roundFinished', (data) => {
			dispatch(setRightAnswer(data.rightAnswer));
			dispatch(setEveryoneAnswered(!everyoneAnswered));
			dispatch(setRounds(data.roundsLeft));
		});
		socket.on('synchronizedLobby', (data) => {
			dispatch(setPlayers(data.data));
		});
	});

	useEffect(() => {
		if (everyoneAnswered) {
			setCountdown(30); // initialize countdown
			const timer = setInterval(() => {
				setCountdown((countdown) => countdown - 1);
			}, 1000);

			const redirectTimer = setTimeout(() => {
				navigate('/pointSelection');
				clearInterval(timer); // clear the countdown timer
			}, 30 * 1000);

			return () => {
				clearTimeout(redirectTimer); // clear the redirection timer
				clearInterval(timer); // clear the countdown timer
			};
		}
		// if (rounds === 0) {
		socket.on('gameFinished', (data) => {
			setTimeout(() => {
				navigate('/'); // replace '/' with the correct path to your landing page if necessary
				window.location.reload();
			}, 5000);
		});
		// }
	}, [everyoneAnswered, navigate, rounds]);

	// const handlePlayerIsReady = () => {
	// 	const socketID = hostSocketID || playerSocketID;
	// 	if (socketID) {
	// 		dispatch(handlePlayerIsReadyThunk(socketID));
	// 	}
	// };

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				backgroundImage: 'url(/QuizPattern.jpeg)',
				backgroundSize: 'cover',
			}}
		>
			{!everyoneAnswered && (
				<Box
					sx={{
						bgcolor: theme.palette.secondary.light,
						width: '800px',
						height: '500px',
						p: theme.spacing(2),
						m: theme.spacing(8),
						borderRadius: theme.spacing(4),
					}}
				>
					<Paper
						elevation={6}
						sx={{
							bgcolor: theme.palette.secondary.dark,
							p: theme.spacing(2),
							m: theme.spacing(4),
							borderRadius: theme.spacing(2),
						}}
					>
						<Grid container my={2}>
							<Grid item xs={9}>
								<Typography variant="body1" color="white" fontWeight={'medium'}>
									{'Category: ' + chosenCategory}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="body1" color="white" fontWeight={'medium'}>
									{chosenPoints + ' Points'}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
					<Box
						sx={{
							p: theme.spacing(7),
						}}
					>
						<Typography variant="body1" fontSize={'h6.fontSize'}>
							{question}
						</Typography>
					</Box>
				</Box>
			)}

			{everyoneAnswered && (
				<Box
					sx={{
						bgcolor: theme.palette.secondary.light,
						width: '800px',
						height: '500px',
						p: theme.spacing(2),
						m: theme.spacing(8),
						borderRadius: theme.spacing(4),
					}}
				>
					<Paper
						elevation={6}
						sx={{
							bgcolor: theme.palette.secondary.dark,
							p: theme.spacing(2),
							m: theme.spacing(4),
							borderRadius: theme.spacing(2),
						}}
					>
						<Grid container my={2}>
							<Grid item xs={9}>
								<Typography variant="h5" color="white" textAlign={'center'} alignContent={'center'}>
									Get ready for the next round.
									{countdown !== null && <div>Redirecting in {countdown} seconds...</div>}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
					<Box>
						<Typography variant="h3" color="initial" fontWeight={'bold'}>
							Current standings
						</Typography>
						{players.map((e, index) => (
							<Box key={index}>
								<Typography variant="body1" color="initial">
									{e.playerName}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			)}

			<Box
				sx={{
					bgcolor: theme.palette.secondary.light,
					p: theme.spacing(2),
					width: '900px',
					m: theme.spacing(2),
					borderRadius: theme.spacing(4),
				}}
			>
				{!everyoneAnswered && (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
						}}
					>
						{answers.map((answer, index) => (
							<Button
								key={index}
								variant="contained"
								value={answer}
								onClick={handleSetAnswer}
								sx={{
									my: theme.spacing(4),
									width: 'calc(50% - 25px)',
									backgroundColor: selectedAnswer === answer ? theme.palette.primary.dark : theme.palette.primary.light,
								}}
							>
								{answer}
							</Button>
						))}
					</Box>
				)}
				{everyoneAnswered && (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
						}}
					>
						{answers.map((answer, index) => (
							<Button
								key={index}
								color={rightAnswer === answer ? 'success' : 'error'}
								variant="contained"
								value={answer}
								onClick={handleSetAnswer}
								sx={{
									my: theme.spacing(4),
									width: 'calc(50% - 25px)',
								}}
							>
								{answer}
							</Button>
						))}
					</Box>
				)}
			</Box>
		</Box>
	);
};
