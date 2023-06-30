// import React, { useEffect, useState } from 'react';
// import { Box, Button, Grid, useTheme, Paper, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import SocketManager from '../../services/SocketManager';

// export const QuizPage = () => {
// 	const navigate = useNavigate();
// 	const [countdown, setCountdown] = useState(null);
// 	const [selectedAnswer, setSelectedAnswer] = useState(null);
// 	const { players } = useSelector((state) => state.gameSettings);

// 	const theme = useTheme();

// 	const { question, answers, chosenCategory, chosenPoints, everyoneAnswered, rightAnswer } = useSelector((state) => state.game);

// 	const handleSetAnswer = (e) => {
// 		const answer = e.target.value;
// 		SocketManager.setAnswer(answer);
// 		setSelectedAnswer(answer);
// 	};

// 	useEffect(() => {
// 		if (everyoneAnswered) {
// 			setCountdown(30); // initialize countdown
// 			const timer = setInterval(() => {
// 				setCountdown((countdown) => countdown - 1);
// 			}, 1000);

// 			const redirectTimer = setTimeout(() => {
// 				navigate('/pointSelection');
// 				clearInterval(timer); // clear the countdown timer
// 			}, 30 * 1000);

// 			return () => {
// 				clearTimeout(redirectTimer); // clear the redirection timer
// 				clearInterval(timer); // clear the countdown timer
// 			};
// 		}
// 	}, [everyoneAnswered, navigate]);

// 	return (
// 		<Box
// 			sx={{
// 				display: 'flex',
// 				flexDirection: 'column',
// 				alignItems: 'center',
// 				justifyContent: 'center',
// 				minHeight: '100vh',
// 				backgroundImage: 'url(/QuizPattern.jpeg)',
// 				backgroundSize: 'cover',
// 			}}
// 		>
// 			{!everyoneAnswered && (
// 				<Box
// 					sx={{
// 						bgcolor: theme.palette.secondary.light,
// 						width: '800px',
// 						height: '500px',
// 						p: theme.spacing(2),
// 						m: theme.spacing(8),
// 						borderRadius: theme.spacing(4),
// 					}}
// 				>
// 					<Paper
// 						elevation={6}
// 						sx={{
// 							bgcolor: theme.palette.secondary.dark,
// 							p: theme.spacing(2),
// 							m: theme.spacing(4),
// 							borderRadius: theme.spacing(2),
// 						}}
// 					>
// 						<Grid container my={2}>
// 							<Grid item xs={9}>
// 								<Typography variant='body1' color='white' fontWeight={'medium'}>
// 									{'Category: ' + chosenCategory}
// 								</Typography>
// 							</Grid>
// 							<Grid item xs={3}>
// 								<Typography variant='body1' color='white' fontWeight={'medium'}>
// 									{chosenPoints + ' Points'}
// 								</Typography>
// 							</Grid>
// 						</Grid>
// 					</Paper>
// 					<Box
// 						sx={{
// 							p: theme.spacing(7),
// 						}}
// 					>
// 						<Typography variant='body1' fontSize={'h6.fontSize'}>
// 							{question}
// 						</Typography>
// 					</Box>
// 				</Box>
// 			)}

// 			{everyoneAnswered && (
// 				<Box
// 					sx={{
// 						bgcolor: theme.palette.secondary.light,
// 						width: '800px',
// 						height: '500px',
// 						p: theme.spacing(2),
// 						m: theme.spacing(8),
// 						borderRadius: theme.spacing(4),
// 					}}
// 				>
// 					<Paper
// 						elevation={6}
// 						sx={{
// 							bgcolor: theme.palette.secondary.dark,
// 							p: theme.spacing(2),
// 							m: theme.spacing(4),
// 							borderRadius: theme.spacing(2),
// 						}}
// 					>
// 						<Grid container my={2}>
// 							<Grid item xs={9}>
// 								<Typography variant='h5' color='white' textAlign={'center'} alignContent={'center'}>
// 									Get ready for the next round.
// 									{countdown !== null && <div>Redirecting in {countdown} seconds...</div>}
// 								</Typography>
// 							</Grid>
// 						</Grid>
// 					</Paper>
// 					<Box>
// 						<Typography variant='h3' color='initial' fontWeight={'bold'}>
// 							Current standings
// 						</Typography>
// 						{players.map((e, index) => (
// 							<Box key={index}>
// 								<Typography variant='body1' color='initial'>
// 									{e.playerName}
// 								</Typography>
// 							</Box>
// 						))}
// 					</Box>
// 				</Box>
// 			)}

// 			<Box
// 				sx={{
// 					bgcolor: theme.palette.secondary.light,
// 					p: theme.spacing(2),
// 					width: '900px',
// 					m: theme.spacing(2),
// 					borderRadius: theme.spacing(4),
// 				}}
// 			>
// 				{!everyoneAnswered && (
// 					<Box
// 						sx={{
// 							display: 'flex',
// 							justifyContent: 'space-between',
// 							flexWrap: 'wrap',
// 						}}
// 					>
// 						{answers.map((answer, index) => (
// 							<Button
// 								key={index}
// 								variant='contained'
// 								value={answer}
// 								onClick={handleSetAnswer}
// 								sx={{
// 									my: theme.spacing(4),
// 									width: 'calc(50% - 25px)',
// 									backgroundColor: selectedAnswer === answer ? theme.palette.primary.dark : theme.palette.primary.light,
// 								}}
// 							>
// 								{answer}
// 							</Button>
// 						))}
// 					</Box>
// 				)}
// 				{everyoneAnswered && (
// 					<Box
// 						sx={{
// 							display: 'flex',
// 							justifyContent: 'space-between',
// 							flexWrap: 'wrap',
// 						}}
// 					>
// 						{answers.map((answer, index) => (
// 							<Button
// 								key={index}
// 								color={rightAnswer === answer ? 'success' : 'error'}
// 								variant='contained'
// 								value={answer}
// 								onClick={handleSetAnswer}
// 								sx={{
// 									my: theme.spacing(4),
// 									width: 'calc(50% - 25px)',
// 								}}
// 							>
// 								{answer}
// 							</Button>
// 						))}
// 					</Box>
// 				)}
// 			</Box>
// 		</Box>
// 	);
// };

import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, useTheme, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SocketManager from '../../services/SocketManager';
import ScoreBoard from '../scoreboardPage/ScoreBoard';

export const QuizPage = () => {
	const navigate = useNavigate();
	const [countdown, setCountdown] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const { players } = useSelector((state) => state.gameSettings);

	const theme = useTheme();

	const { question, answers, chosenCategory, chosenPoints, everyoneAnswered, rightAnswer } = useSelector((state) => state.game);
	const { path } = useSelector((state) => state.route);
	console.log(path);

	const handleSetAnswer = (e) => {
		const answer = e.target.value;
		SocketManager.setAnswer(answer);
		setSelectedAnswer(answer);
	};

	useEffect(() => {
		if (everyoneAnswered || path === '/pointSelection') {
			setCountdown(5);

			const countdownTimer = setInterval(() => {
				setCountdown((countdown) => countdown - 1);
			}, 1000);

			const navigateTimer = setTimeout(() => {
				if (path === '/pointSelection') {
					navigate('/pointSelection');
				}
			}, 5000); // Change this value to adjust the delay before navigation

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
				m: theme.spacing(8),
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
				py: theme.spacing(2), borderRadius: theme.spacing(4),
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
						}}
					>
						<Grid container my={2}>
							<Grid item xs={9}>
								<Typography variant='h5' color='white' textAlign={'center'} alignContent={'center'}>
									Get ready for the next round.
									{countdown !== null && <div>Redirecting in {countdown} seconds...</div>}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
					<Box>
						<Typography variant='h3' color='initial' fontWeight={'bold'}>
							Current standings
						</Typography>
						<ScoreBoard/>
					</Box>
				</BoxStyling>
			)}

			{everyoneAnswered && (
				<Box
					sx={{
						bgcolor: theme.palette.success.main,
						p: theme.spacing(2),
						m: theme.spacing(2),
						borderRadius: theme.spacing(4),
					}}
				>
					<Typography variant='h5' color='white'>
						Correct Answer: {rightAnswer}
					</Typography>
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
