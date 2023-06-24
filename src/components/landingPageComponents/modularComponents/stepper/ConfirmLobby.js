import React from 'react';
import { Typography, Box, Button, Stack, Paper, useTheme, Avatar } from '@mui/material';
import { setActiveStep, setPlayerSocketId } from '../../../../store/slices/landingPageSlices/lobbySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import socket from '../../../../socket';
import { setCategories } from '../../../../store/slices/gameSlices/gameSettingSlice';

function ConfirmLobby() {
	const dispatch = useDispatch();
	const theme = useTheme();
	const navigate = useNavigate();
	const { activeStep, ign, lobbyCode, host } = useSelector((state) => state.lobby);
	const { accessToken } = useSelector((state) => state.auth);

	return (
		<Paper
			elevation={3}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				p: theme.spacing(6),
				width: '100%',
				height: '100%',
				backgroundColor: theme.palette.primary.dark,
				borderRadius: '4px',
				m: theme.spacing(3),
				gap: theme.spacing(2),
			}}
		>
			<Box id="confirmLobby" display={'flex'} flexDirection={'column'} alignItems={'center'} gap={theme.spacing(3)}>
				<Typography variant="h6">
					<span style={{ fontWeight: 'bold' }}>Your player name:</span> {ign}
				</Typography>
				<Typography variant="h6">
					<span style={{ fontWeight: 'bold' }}>Lobby Code: </span> {lobbyCode}
				</Typography>
				<Avatar alt="avatar" sx={{ width: 80, height: 80 }} />
				<Box>
					<Stack spacing={2} direction="row">
						<Button variant="contained" color="error" onClick={() => dispatch(setActiveStep(activeStep - 1))}>
							Go Back
						</Button>
						<Button
							variant="contained"
							color="success"
							onClick={() => {
								if (!host) {
									socket.emit('joinLobby', {
										gameId: lobbyCode,
										playerName: ign,
										token: accessToken || undefined,
									});
									socket.on('joinedLobby', (data) => {
										console.log(data.socketId);
										dispatch(setPlayerSocketId(data.socketId));
										dispatch(setCategories(data.settings.list));
									});
								}
								navigate('/lobby');
							}}
						>
							Confirm
						</Button>
					</Stack>
				</Box>
			</Box>
		</Paper>
	);
}

export default ConfirmLobby;
