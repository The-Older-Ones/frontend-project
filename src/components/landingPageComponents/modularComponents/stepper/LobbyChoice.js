import React from 'react';
import SocketManager from '../../../../services/SocketManager';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, Paper, Button, useTheme, TextField, Stack, Tooltip } from '@mui/material';
// import { ContentPaste } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep, setHost, setLobbyCode, setLobbySelection } from '../../../../store/slices/landingPageSlices/lobbySlice';

function LobbyChoice() {
	const theme = useTheme();
	const { ign, activeStep, host, lobbySelection, lobbyCode, avatarIndex } = useSelector((state) => state.lobby);
	const { accessToken } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleChoice = (value) => {
		dispatch(setHost(value));
		dispatch(setLobbySelection(true));
	};

	const createGame = () => {
		SocketManager.createGame(ign, accessToken, avatarIndex);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(lobbyCode).then(() => {
			toast.success('Code was copied to the clipboard', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		});
	};

	return (
		<Paper
			elevation={3}
			sx={{
				p: theme.spacing(6),
				width: '100%',
				height: '355px',
				backgroundColor: theme.palette.primary.dark,
				borderRadius: theme.spacing(4),
				m: theme.spacing(3),
				justifyContent: 'center',
				alignContent: 'center',
			}}
		>
			{!lobbySelection && (
				<Box id="chooseLobby" display={'flex'} flexDirection={'column'} alignItems={'center'} gap={theme.spacing(6)}>
					<Typography variant="h4" component={'h1'} color="textPrimary">
						Select an option
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(3), justifyContent: 'center', alignContent: 'center', justifyItems: 'center' }}>
						<Button
							sx={{
								py: theme.spacing(2),
								borderRadius: theme.spacing(4),
							}}
							variant="contained"
							color="secondary"
							onClick={() => {
								createGame();
								handleChoice(true);
							}}
						>
							Host a lobby
						</Button>
						<Button
							sx={{
								py: theme.spacing(2),
								borderRadius: theme.spacing(4),
							}}
							variant="contained"
							color="secondary"
							onClick={() => {
								handleChoice(false);
							}}
						>
							Join a lobby
						</Button>
						<Button sx={{ py: theme.spacing(2), borderRadius: theme.spacing(4) }} variant="contained" color="error" onClick={() => dispatch(setActiveStep(activeStep - 1))}>
							Go Back
						</Button>
					</Box>
				</Box>
			)}

			{lobbySelection && host && (
				<Box id="lobbyCode" display={'flex'} flexDirection={'column'} alignItems={'center'} gap={theme.spacing(6)}>
					<Stack spacing={1} direction="column">
						<Typography variant="h4" color="initial" align="center">
							Here is your lobby code.
						</Typography>
						<Typography variant="h6" color="initial" align="center">
							Share it to let people join your lobby!
						</Typography>
					</Stack>
					<Box onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
						<Tooltip title="Click to copy" arrow>
							<Typography variant="h2" color="initial">
								{lobbyCode}
							</Typography>
						</Tooltip>
					</Box>
					<Box>
						<Stack spacing={2} direction="row">
							<Button sx={{ py: theme.spacing(2), borderRadius: theme.spacing(4) }} variant="contained" color="error" onClick={() => dispatch(setLobbySelection(false))}>
								Go Back
							</Button>
							<Button sx={{ py: theme.spacing(2), borderRadius: theme.spacing(4) }} variant="contained" color="secondary" onClick={() => dispatch(setActiveStep(activeStep + 1))}>
								Next Step
							</Button>
						</Stack>
					</Box>
				</Box>
			)}
			{lobbySelection && !host && (
				<Box id="lobbyCode" display={'flex'} flexDirection={'column'} alignItems={'center'} gap={theme.spacing(6)}>
					<Typography variant="h4" color="intial">
						Enter your lobby code.
					</Typography>
					<TextField id="joinCode" color='secondary' sx={{ bgcolor: theme.palette.primary.main }} variant='filled' label="Enter lobby code" value={lobbyCode} onChange={(e) => dispatch(setLobbyCode(e.target.value))} />
					<Box>
						<Stack spacing={2} direction="row">
							<Button sx={{ py: theme.spacing(2), borderRadius: theme.spacing(4) }} variant="contained" color="error" onClick={() => dispatch(setLobbySelection(false))}>
								Go Back
							</Button>
							<Button sx={{ py: theme.spacing(2), borderRadius: theme.spacing(4) }} variant="contained" color="secondary" onClick={() => dispatch(setActiveStep(activeStep + 1))}>
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
