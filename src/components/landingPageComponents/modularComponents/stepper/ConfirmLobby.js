import React from 'react';
import { Typography, Box, Button, Stack, Paper, useTheme, Avatar } from '@mui/material';
import { setActiveStep } from '../../../../store/slices/landingPageSlices/lobbySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SocketManager from '../../../../services/SocketManager';
import { setRoute } from '../../../../store/slices/routeSlice';

function ConfirmLobby() {
	const dispatch = useDispatch();
	const theme = useTheme();
	const navigate = useNavigate();
	const { activeStep, ign, lobbyCode, host, avatarIndex, avatars } = useSelector((state) => state.lobby);
	const { accessToken } = useSelector((state) => state.auth);

	const joinLobby = () => {
		SocketManager.joinLobby(lobbyCode, ign, accessToken);
	};

	return (
		<Paper
			elevation={3}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				p: theme.spacing(6),
				width: '100%',
				height: '355px',
				backgroundColor: theme.palette.primary.dark,
				borderRadius: theme.spacing(4),
				m: theme.spacing(3),
				gap: theme.spacing(2),
				justifyContent: 'center',
				alignContent: 'center',
			}}
		>
			<Box id='confirmLobby' display={'flex'} flexDirection={'column'} alignItems={'center'} gap={theme.spacing(3)}>
				<Typography variant='h6'>
					<span style={{ fontWeight: 'bold' }}>Your player name:</span> {ign}
				</Typography>
				<Typography variant='h6'>
					<span style={{ fontWeight: 'bold' }}>Lobby Code: </span> {lobbyCode}
				</Typography>
				<Avatar alt='avatar' src={avatars[avatarIndex]} sx={{ width: 80, height: 80 }} />
				<Box>
					<Stack spacing={2} direction='row'>
						<Button sx={{ py: theme.spacing(2), borderRadius: theme.spacing(4) }} variant='contained' color='error' onClick={() => dispatch(setActiveStep(activeStep - 1))}>
							Go Back
						</Button>
						<Button
							sx={{ py: theme.spacing(2), borderRadius: theme.spacing(4) }}
							variant='contained'
							color='success'
							onClick={() => {
								if (!host) {
									joinLobby();
								}
								navigate('/lobby');
								dispatch(setRoute('/lobby'));
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
