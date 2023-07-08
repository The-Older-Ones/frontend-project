import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, useTheme, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SocketManager from '../../services/SocketManager';
import ScoreBoard from '../scoreboardPage/ScoreBoard';

export const QuizPage = () => {
	const navigate = useNavigate();
	const [countdown, setCountdown] = useState(null);
	const [endCountdown, setEndCountdown] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	const theme = useTheme();
	const { question, answers, chosenCategory, chosenPoints, everyoneAnswered, rightAnswer, gameFinished } = useSelector((state) => state.game);
	const { path } = useSelector((state) => state.route);
	console.log(path);

	const handleSetAnswer = (e) => {
		const answer = e.target.value;
		SocketManager.setAnswer(answer);
		setSelectedAnswer(answer);
	};

	useEffect(() => {
		// Start countdown when everyone has answered
		if (everyoneAnswered && path === '/pointSelection') {
			const delay = 5;
			setCountdown(delay);

			const countdownTimer = setInterval(() => {
				setCountdown((countdown) => countdown - 1);
			}, 1000);

			const navigateTimer = setTimeout(() => {
				if (path === '/pointSelection') {
					navigate('/pointSelection');
				}
			}, delay * 1000);

			return () => {
				clearInterval(countdownTimer);
				clearTimeout(navigateTimer);
			};
		}

		// Start countdown when the game has finished
		if (gameFinished) {
			const delay = 10; // delay in seconds
			setEndCountdown(delay);

			const countdownTimer = setInterval(() => {
				setEndCountdown((endCountdown) => endCountdown - 1);
			}, 1000);

			const navigateTimer = setTimeout(() => {
				navigate('/scoreboard');
			}, delay * 1000); // Change this value to adjust the delay before navigation

			return () => {
				clearInterval(countdownTimer);
				clearTimeout(navigateTimer);
			};
		}
	}, [everyoneAnswered, navigate, path, gameFinished]);

	useEffect(() => {
		if (path === '/scoreboard') {
			setTimeout(() => {
				navigate('/scoreboard');
			}, 10 * 1000); // Change this value to adjust the delay before navigation
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
			variant='contained'
			value={answer}
			onClick={!everyoneAnswered ? handleSetAnswer : null}
			sx={{
				my: theme.spacing(4),
				width: 'calc(50% - 25px)',
				py: theme.spacing(2),
				borderRadius: theme.spacing(4),
				backgroundColor:
					!everyoneAnswered && selectedAnswer === answer
						? theme.palette.primary.dark
						: everyoneAnswered && selectedAnswer === answer && selectedAnswer === rightAnswer
						? theme.palette.success.main
						: everyoneAnswered && selectedAnswer === answer && selectedAnswer !== rightAnswer
						? theme.palette.error.main
						: theme.palette.primary.light,
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
								<Typography variant='body1' color='white' fontWeight={'medium'}>
									{'Category: ' + chosenCategory}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' color='white' fontWeight={'medium'}>
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
						<Typography variant='body1' fontSize={'h6.fontSize'}>
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
						<Typography variant='h5' color='white' fontWeight={'bold'} textAlign={'center'}>
							{gameFinished ? 'Game has ended' : 'Get ready for the next round.'}
							{countdown !== null && <div>Redirecting to point selection page in {countdown} seconds...</div>}
							{endCountdown !== null && <div>Redirecting to scoreboard in {endCountdown} seconds...</div>}
						</Typography>
					</Paper>
					<Box>
						{gameFinished ? (
							<>
								<Typography variant='body1' fontSize={'h6.fontSize'}>
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
						<Typography variant='h6' color='white'>
							Correct Answer: {rightAnswer}
						</Typography>
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
