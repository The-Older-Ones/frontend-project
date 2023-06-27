import { Box } from '@mui/material';
import LobbyBoxLayout from './LobbyBoxLayout';
import Header from '../landingPageComponents/modularComponents/Header';

function LobbyPageLayout() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
				backgroundImage: 'url(./Background3.png)',
				backgroundSize: 'cover',
			}}
		>
			<Header />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}
			>
				<LobbyBoxLayout />
			</Box>
		</Box>
	);
}

export default LobbyPageLayout;
