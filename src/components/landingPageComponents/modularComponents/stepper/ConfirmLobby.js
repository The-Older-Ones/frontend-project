import React from 'react';
import { Typography, Box, Button, Stack, Paper, useTheme, Avatar } from '@mui/material';
import { setActiveStep } from '../../../../store/slices/landingPageSlices/lobbySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ConfirmLobby() {
	const dispatch = useDispatch();
	const theme = useTheme();
	const navigate = useNavigate();
	const { activeStep, ign, lobbyCode } = useSelector((state) => state.lobby);

	return (
		<Paper
			elevation={3}
			style={{
				my: theme.spacing(2),
				padding: '32px',
				width: '50%',
				height: '50%',
				backgroundColor: theme.palette.secondary.light,
				borderRadius: '4px',
				margin: '10px',
			}}
		>
			<Box id='confirmLobby' display={'flex'} flexDirection={'column'} alignItems={'center'} gap={theme.spacing(3)}>
				<Typography variant='h4' color='initial'>
					Confirm your choice
				</Typography>
				<Typography variant='h6'>{ign}</Typography>
				<Typography variant='h6'>Lobby Code: {lobbyCode}</Typography>
				<Avatar
					alt='avatar'
					// src={avatars[0]}
					sx={{ width: 80, height: 80 }}
				/>
				<Box>
					<Stack spacing={2} direction='row'>
						<Button variant='contained' color='error' onClick={() => dispatch(setActiveStep(activeStep - 1))}>
							Go Back
						</Button>
						<Button variant='contained' color='success' onClick={() => navigate('/lobby')}>
							Confirm
						</Button>
					</Stack>
				</Box>
			</Box>
		</Paper>
	);
}

export default ConfirmLobby;
