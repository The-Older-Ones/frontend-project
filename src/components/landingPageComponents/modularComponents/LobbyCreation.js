import { Box, Stepper, Step, StepLabel, Paper, useTheme, Typography } from '@mui/material';

import LobbyChoice from './stepper/LobbyChoice';
import CreateAvatar from './stepper/CreateAvatar';
import ConfirmLobby from './stepper/ConfirmLobby';
import { useSelector } from 'react-redux';

function LobbyCreation() {
	const theme = useTheme();

	const { activeStep } = useSelector((state) => state.lobby);

	const getStepContent = (switchIndex) => {
		switch (switchIndex) {
			case 0:
				return <CreateAvatar />;
			case 1:
				return <LobbyChoice />;
			case 2:
				return <ConfirmLobby />;
			default:
				<Typography variant='h4' color='initial'>
					Unkown stepIndex
				</Typography>;
		}
	};

	return (
		<Paper
			elevation={3}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: theme.spacing(2),
				width: '75%',
				backgroundColor: theme.palette.primary.main,
				borderRadius: '4px',
			}}
		>
			<Box id='lobbyCreation'>
				<Stepper activeStep={activeStep}>
					<Step key={0} style={{ display: activeStep === 0 ? 'block' : 'none' }}>
						<StepLabel>
							<Typography variant='h6'>Create your Avatar and enter your game name.</Typography>
						</StepLabel>
					</Step>
					<Step key={1} style={{ display: activeStep === 1 ? 'block' : 'none' }}>
						<StepLabel>
							<Typography variant='h6'>Select to host or join lobby and get your code</Typography>
						</StepLabel>
					</Step>
					<Step key={2} last style={{ display: activeStep === 2 ? 'block' : 'none' }}>
						<StepLabel>
							<Typography variant='h6'>Confirm your choices.</Typography>
						</StepLabel>
					</Step>
				</Stepper>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>{getStepContent(activeStep)}</Box>
			</Box>
		</Paper>
	);
}

export default LobbyCreation;
