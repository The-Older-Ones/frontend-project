import { toast } from 'react-toastify';
import { Box, TextField, Avatar, Paper, IconButton, useTheme, FormControl, Button } from '@mui/material';
import { setActiveStep, setIGN, setAvatarIndex } from '../../../../store/slices/landingPageSlices/lobbySlice';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

function CreateAvatar() {
	const theme = useTheme();
	const { user } = useSelector((state) => state.auth);

	const { avatars, avatarIndex } = useSelector((state) => state.lobby);
	const { ign, activeStep } = useSelector((state) => state.lobby);

	const dispatch = useDispatch();

	const handleAvatarChange = (direction) => {
		let newIndex = direction === 'next' ? avatarIndex + 1 : avatarIndex - 1;
		if (newIndex < 0) newIndex = avatars.length - 1;
		if (newIndex === avatars.length) newIndex = 0;
		dispatch(setAvatarIndex(newIndex));
	};

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
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}
			>
				<FormControl>
					<TextField
						label={user ? '' : "What's your name?"}
						variant='filled'
						sx={{ my: theme.spacing(2), bgcolor: theme.palette.primary.main }}
						value={ign}
						placeholder={user ? user.user : ''}
						onChange={(e) => dispatch(setIGN(e.target.value))}
						color='secondary'
					/>
				</FormControl>

				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: theme.spacing(2), gap: theme.spacing(2) }}>
					<IconButton onClick={() => handleAvatarChange('prev')}>
						<ArrowBack />
					</IconButton>
					<Avatar alt='avatar' src={avatars[avatarIndex]} sx={{ width: 120, height: 120 }} />
					<IconButton onClick={() => handleAvatarChange('next')}>
						<ArrowForward />
					</IconButton>
				</Box>

				<FormControl>
					<Button
						sx={{
							m: theme.spacing(2),
							py: theme.spacing(2),
							borderRadius: theme.spacing(4),
						}}
						size='large'
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
						Create Avatar
					</Button>
				</FormControl>
			</Box>
		</Paper>
	);
}

export default CreateAvatar;
