import React, { useEffect } from 'react';
import { Box, Stack, Button, List, Divider, Grid, useTheme, Paper, Typography, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { CheckCircle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import { setEveryoneAnswered, setRightAnswer } from '../../store/slices/gameSlices/gameSlice';
import { setPlayerIsReady, setPlayers } from '../../store/slices/gameSlices/gameSettingSlice';

export const QuizPage = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { players } = useSelector((state) => state.gameSettings);
	const { playerSocketID, hostSocketID } = useSelector((state) => state.lobby);
	const { question, answers, chosenCategory, chosenPoints, everyoneAnswered, rightAnswer } = useSelector((state) => state.game);

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
			dispatch(setRightAnswer(data.rightAnswer));
			dispatch(setEveryoneAnswered(!everyoneAnswered));
		});
		socket.on('synchronizedLobby', (data) => {
			console.log(data);
			dispatch(setPlayers(data.data));
		});
	});

	const handlePlayerIsReady = () => {
		const socketID = hostSocketID || playerSocketID;
		if (socketID) {
			dispatch(setPlayerIsReady({ socketID }));
			socket.emit('lobbySynchro', { data: players });
		}
	};

	return (
		<Stack
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{!everyoneAnswered && (
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
			)}

			{everyoneAnswered && (
				<Box
					sx={{
						bgcolor: theme.palette.secondary.light,
						width: '800px',
						height: '500px',
						p: theme.spacing(2),
						m: theme.spacing(6),
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
								<Typography variant="h5" color="initial" textAlign={'center'} alignContent={'center'}>
									Are all players ready for the next round?
								</Typography>
							</Grid>
						</Grid>
					</Paper>
					<Box padding="20px">
						<List
							sx={{
								bgcolor: theme.palette.primary.main,
								m: theme.spacing(2),
							}}
						>
							{players.map((player, index) => (
								<React.Fragment key={index}>
									<Divider />
									<ListItem>
										<ListItemIcon>
											<ListItemAvatar>
												<Avatar>
													<PersonIcon />
												</Avatar>
											</ListItemAvatar>
										</ListItemIcon>
										<ListItemText primary={player.playerName} />
										<ListItemIcon>
											{player.readyForNextRound && (
												<ListItemAvatar>
													<CheckCircle color="success" fontSize="large" />
												</ListItemAvatar>
											)}
										</ListItemIcon>
									</ListItem>
									<Divider />
								</React.Fragment>
							))}
						</List>
						<Button variant="contained" color="success" onClick={handlePlayerIsReady}>
							I am ready
						</Button>
					</Box>
				</Box>
			)}

			<Box
				sx={{
					bgcolor: theme.palette.secondary.light,
					p: '16px',
					width: '900px',
					m: theme.spacing(2),
				}}
			>
				{!everyoneAnswered && (
					<Grid container my={4} rowSpacing={2} columnSpacing={1} m={4}>
						{answers.map((answer, index) => (
							<Grid item xs={6} key={index}>
								<Button bgcolor={theme.palette.primary.light} variant="contained" value={answer} onClick={handleSetAnswer}>
									{answer}
								</Button>
							</Grid>
						))}
					</Grid>
				)}
				{everyoneAnswered && (
					<Grid container my={4} rowSpacing={2} columnSpacing={1} m={4}>
						{answers.map((answer, index) => (
							<Grid item xs={6} key={index}>
								<Button variant="contained" color={rightAnswer === answer ? 'success' : 'error'}>
									{answer}
								</Button>
							</Grid>
						))}
					</Grid>
				)}
			</Box>
		</Stack>
	);
};
