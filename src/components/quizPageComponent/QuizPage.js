import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, useTheme, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SocketManager from '../../services/SocketManager';
import ScoreBoard from '../scoreboardPage/ScoreBoard';
import { setRoute } from '../../store/slices/routeSlice';
import { setNextPlayer } from '../../store/slices/gameSlices/gameSettingSlice';

export const QuizPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [countdown, setCountdown] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const { players, nextPlayer } = useSelector((state) => state.gameSettings);

	const theme = useTheme();
	const { question, answers, chosenCategory, chosenPoints, everyoneAnswered, rightAnswer, gameFinished, leaderboard } = useSelector((state) => state.game);
	const { path } = useSelector((state) => state.route);
	console.log(path);

	const scoreBoard = leaderboard.map((element) => {
		const playerName = players.find((player) => player.socketId === element.socketId)?.playerName;
		return { ...element, playerName };
	});

	const sortedLeaderboard = scoreBoard.map((obj) => obj).sort((a, b) => b.points - a.points);
	const samePointsArray = [];

	for (let i = 0; i < sortedLeaderboard.length - 1; i++) {
		if (sortedLeaderboard[i].points === sortedLeaderboard[i + 1].points) {
			samePointsArray.push(sortedLeaderboard[i]);
			samePointsArray.push(sortedLeaderboard[i + 1]);
		} else {
			break;
		}
	}

	const handleSetAnswer = (e) => {
		const answer = e.target.value;
		SocketManager.setAnswer(answer);
		setSelectedAnswer(answer);
		if (nextPlayer === null) {
			dispatch(setNextPlayer(players[0]));
		} else {
			const currentPlayerIndex = players.findIndex((player) => player.socketId === nextPlayer.socketId);
			const nextPlayerIndex = currentPlayerIndex + 1;
			const nextInTurn = players[nextPlayerIndex];
			dispatch(setNextPlayer(nextInTurn));
		}
	};

	const handleGoToScorePage = () => {
		dispatch(setRoute('/scoreboard'));
	};

	const showWinner = () => {
		if (samePointsArray.length === 0) {
			return sortedLeaderboard[0].playerName;
		} else {
			return samePointsArray.map((element) => element.playerNam).join(' and ');
		}
	};

	useEffect(() => {
		if (everyoneAnswered && path === '/pointSelection') {
			setCountdown(10);

			const countdownTimer = setInterval(() => {
				setCountdown((countdown) => countdown - 1);
			}, 1000);

			const navigateTimer = setTimeout(() => {
				if (path === '/pointSelection') {
					navigate('/pointSelection');
				}
			}, 10 * 1000); // Change this value to adjust the delay before navigation

			return () => {
				clearInterval(countdownTimer);
				clearTimeout(navigateTimer);
			};
		}
	}, [everyoneAnswered, navigate, path]);

	useEffect(() => {
		if (path === '/scoreboard') {
			navigate('/scoreboard');
		}
	}, [path, navigate]);

	const BoxStyling = ({ children }) => (
		<Box
			sx={{
				bgcolor: theme.palette.secondary.light,
				width: '800px',
				height: '500px',
				p: theme.spacing(2),
				m: theme.spacing(4),
				borderRadius: theme.spacing(4),
			}}
		>
			{children}
		</Box>
	);

	const AnswerButton = ({ answer, index }) => (
		<Button
			key={index}
			variant="contained"
			value={answer}
			onClick={!everyoneAnswered ? handleSetAnswer : null}
			sx={{
				my: theme.spacing(4),
				width: 'calc(50% - 25px)',
				py: theme.spacing(2),
				borderRadius: theme.spacing(4),
				backgroundColor:
					!everyoneAnswered && selectedAnswer === answer ? theme.palette.primary.dark : everyoneAnswered && rightAnswer === answer ? theme.palette.success.main : theme.palette.primary.light,
			}}
		>
			{answer}
		</Button>
	);

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
				<BoxStyling>
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
				</BoxStyling>
			)}

			{everyoneAnswered && (
				<BoxStyling>
					<Paper
						elevation={6}
						sx={{
							bgcolor: theme.palette.secondary.dark,
							p: theme.spacing(2),
							m: theme.spacing(4),
							borderRadius: theme.spacing(2),
							display: 'flex',
							width: '80%',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{/* <Grid container my={2}> */}
						{/* <Grid item> */}
						<Typography variant="h5" color="white" fontWeight={'bold'} textAlign={'center'}>
							{gameFinished ? 'Game has ended' : 'Get ready for the next round.'}
							{countdown !== null && <div>Redirecting in {countdown} seconds...</div>}
						</Typography>
						{/* </Grid> */}
						{/* </Grid> */}
					</Paper>
					<Box>
						{gameFinished ? (
							<>
								<Typography variant="body1" fontSize={'h6.fontSize'}>
									{question}
								</Typography>
							</>
						) : (
							<ScoreBoard />
						)}
					</Box>
				</BoxStyling>
			)}

			{everyoneAnswered && (
				<Box
					sx={{
						display: 'flex',
					}}
				>
					<Box
						sx={{
							bgcolor: theme.palette.success.main,
							p: theme.spacing(2),
							mx: theme.spacing(2),
							borderRadius: theme.spacing(4),
							whiteSpace: 'nowrap',
						}}
					>
						<Typography variant="h6" color="white">
							Correct Answer: {rightAnswer}
						</Typography>
					</Box>
					{gameFinished && (
						<Button
							variant="contained"
							color="primary"
							onClick={handleGoToScorePage}
							sx={{
								p: theme.spacing(2),
								borderRadius: theme.spacing(4),
								width: '50%',
							}}
						>
							See the end result.
						</Button>
					)}
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
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						flexWrap: 'wrap',
					}}
				>
					{answers.map((answer, index) => (
						<AnswerButton answer={answer} index={index} key={answer} />
					))}
				</Box>
			</Box>
		</Box>
	);
};
