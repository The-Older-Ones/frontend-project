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
				display: 'flex',
				p: theme.spacing(6),
				width: '100%',
				height: '355px',
				backgroundColor: theme.palette.primary.dark,
				borderRadius: theme.spacing(4),
				m: theme.spacing(3),
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center',
				justifyItems: 'center',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center', // Center vertically
					alignItems: 'center', // Center horizontally
					height: '100%',
				}}
			>
				<FormControl>
					<TextField
						label={user ? '' : "What's your name?"}
						variant="filled"
						sx={{ my: theme.spacing(4), bgcolor: theme.palette.primary.main }}
						value={ign}
						placeholder={user ? user.user : ''}
						onChange={(e) => dispatch(setIGN(e.target.value))}
						color="secondary"
					/>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: theme.spacing(4), gap: theme.spacing(2) }}>
						<IconButton>
							<ArrowBack />
						</IconButton>
						<Avatar alt="avatar" src={avatars[0]} sx={{ width: 80, height: 80 }} />
						<IconButton>
							<ArrowForward />
						</IconButton>
					</Box>

					<Box>
						<Box>
							<Button
								sx={{
									m: theme.spacing(2),
									py: theme.spacing(2),
									borderRadius: theme.spacing(4),
								}}
								size="large"
								variant="contained"
								color="secondary"
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
								Create Avatar
							</Button>
						</Box>
					</Box>
				</FormControl>
			</Box>
		</Paper>
	);
}

export default CreateAvatar;
