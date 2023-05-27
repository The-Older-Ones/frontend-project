import React from 'react';
import socket from '../../../../socket';

import { Box, Typography, Paper, Button, useTheme, TextField, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep, setHost, setLobbyCode, setLobbySelection } from '../../../../store/slices/landingPageSlices/lobbySlice';
import { setSocketID } from '../../../../store/slices/landingPageSlices/socketSlice';

function LobbyChoice() {
	const theme = useTheme();
	const { ign, activeStep, host, lobbySelection, lobbyCode } = useSelector((state) => state.lobby);
	const { accessToken } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleChoice = (value) => {
		dispatch(setHost(value));
		dispatch(setLobbySelection(true));
	};

	socket.on('gameCreated', function (data) {
		console.log(data.gameId);
		dispatch(setLobbyCode(data.gameId));
		console.log(data.socketId);
		dispatch(setSocketID(data.socketId));
		console.log(data.playerName);
	});

	return (
		<Paper
			elevation={3}
			style={{
				my: theme.spacing(2),
				padding: '32px',
				width: '50%',
				height: '75%',
				backgroundColor: theme.palette.secondary.light,
				borderRadius: '4px',
				margin: '10px',
			}}
		>
			{!lobbySelection && (
				<Box id='chooseLobby' display={'flex'} flexDirection={'column'} alignItems={'center'} gap={theme.spacing(6)}>
					<Typography variant='h4' component={'h1'} color='textPrimary'>
						Select an option
					</Typography>
					<Stack spacing={2} direction='column'>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => {
								socket.emit('createGame', { playerName: ign, token: accessToken });
								handleChoice(true);
							}}
						>
							Host a lobby
						</Button>
						<Button variant='contained' color='secondary' onClick={() => handleChoice(false)}>
							Join a lobby
						</Button>
						<Button variant='contained' color='error' onClick={() => dispatch(setActiveStep(activeStep - 1))}>
							Go Back
						</Button>
					</Stack>
				</Box>
			)}

			{lobbySelection && host && (
				<Box id='lobbyCode' display={'flex'} flexDirection={'column'} alignItems={'center'} gap={theme.spacing(6)}>
					<Stack spacing={1} direction='column'>
						<Typography variant='h4' color='initial' align='center'>
							Here is your lobby code.
						</Typography>
						<Typography variant='h6' color='initial' align='center'>
							Share it to let people join your lobby!
						</Typography>
					</Stack>
					<Typography variant='p' color='initial'>
						{lobbyCode}
					</Typography>
					<Box>
						<Stack spacing={2} direction='row'>
							<Button variant='contained' color='error' onClick={() => dispatch(setLobbySelection(false))}>
								Cancel
							</Button>
							<Button variant='contained' color='secondary' onClick={() => dispatch(setActiveStep(activeStep + 1))}>
								Next Step
							</Button>
						</Stack>
					</Box>
				</Box>
			)}
			{lobbySelection && !host && (
				<Box id='lobbyCode' display={'flex'} flexDirection={'column'} alignItems={'center'} gap={theme.spacing(6)}>
					<Typography variant='h4' color='intial'>
						Enter your lobby code.
					</Typography>
					<TextField id='joinCode' label='Enter lobby code' value={lobbyCode} onChange={(e) => dispatch(setLobbyCode(e.target.value))} />
					<Box>
						<Stack spacing={2} direction='row'>
							<Button variant='contained' color='error' onClick={() => dispatch(setLobbySelection(false))}>
								Go Back
							</Button>
							<Button variant='contained' color='secondary' onClick={() => dispatch(setActiveStep(activeStep + 1))}>
								Next step
							</Button>
						</Stack>
					</Box>
				</Box>
			)}
		</Paper>
	);
}

export default LobbyChoice;