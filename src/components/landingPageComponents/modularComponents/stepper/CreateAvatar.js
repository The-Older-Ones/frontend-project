import { toast } from 'react-toastify';
import { Box, Typography, TextField, Avatar, Paper, IconButton, useTheme, FormControl, Button, Stack } from '@mui/material';

import { setActiveStep, setIGN } from '../../../../store/slices/landingPageSlices/lobbySlice';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

function CreateAvatar() {
	const theme = useTheme();
	const { user } = useSelector((state) => state.auth);
	const { ign, activeStep } = useSelector((state) => state.lobby);
	const dispatch = useDispatch();

	const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png'];
	return (
		<Paper
			elevation={3}
			sx={{
				p: theme.spacing(6),
				width: '100%',
				height: '100%',
				backgroundColor: theme.palette.primary.dark,
				borderRadius: '4px',
				m: theme.spacing(3),
			}}
		>
			<Box id='createAvatar' display={'flex'} flexDirection={'column'} alignItems={'center'}>
				<FormControl>
					<TextField
						label={user ? '' : "What's your name?"}
						variant='filled'
						fullWidth
						sx={{ bgcolor: theme.palette.primary.main }}
						value={ign}
						placeholder={user ? user.user : ''}
						onChange={(e) => dispatch(setIGN(e.target.value))}
					/>
					<Stack alignItems='center'>
						<Typography style={{ marginTop: '16px', marginBottom: '8px' }}>Choose an Avatar</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<IconButton>
								<ArrowBack />
							</IconButton>
							<Avatar alt='avatar' src={avatars[0]} sx={{ width: 80, height: 80 }} />
							<IconButton>
								<ArrowForward />
							</IconButton>
						</Box>
					</Stack>
					<Box>
						<Stack spacing={2}>
							<Button
								sx={{
									m: theme.spacing(2),
								}}
								variant='contained'
								color='secondary'
								onClick={() => {
									if (!ign) {
										toast.error({
											position: 'bottom-right',
											autoClose: 5000,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: 'light',
										});
									} else {
										dispatch(setActiveStep(activeStep + 1));
									}
								}}
							>
								Go Next
							</Button>
						</Stack>
					</Box>
				</FormControl>
			</Box>
		</Paper>
	);
}

export default CreateAvatar;
