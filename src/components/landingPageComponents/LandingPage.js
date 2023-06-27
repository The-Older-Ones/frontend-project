import React from 'react';
import { Box } from '@mui/material';
import Header from './modularComponents/Header';
import LobbyCreation from './modularComponents/LobbyCreation';

function LandingPage() {
	const mainContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		// backgroundImage: `url('./pxfuel.jpg')`,
		// backgroundImage: 'url(./Background1.png)',
		// backgroundImage: 'url(./Background2.png)',
		backgroundImage: 'url(./Background3-blur.jpg)',
		backgroundSize: 'cover',
	};

	return (
		<Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header />
			<Box sx={mainContainerStyle}>
				<LobbyCreation />
			</Box>
		</Box>
	);
}

export default LandingPage;
