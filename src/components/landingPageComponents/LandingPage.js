import React from 'react';
import { Box, Card, Typography, useTheme } from '@mui/material';
import { Filter1, Filter2, Filter3, Filter4, Filter5 } from '@mui/icons-material';
import Header from './modularComponents/Header';
import LobbyCreation from './modularComponents/LobbyCreation';

function LandingPage() {
	const theme = useTheme();

	const mainContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		minHeight: '100vh', // this ensures that mainContainerStyle takes up at least the full height of the viewport
		background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
	};

	const cardContainerStyle = {
		display: 'flex',
		flexWrap: 'wrap', // added this line
		justifyContent: 'space-around', // changed from 'space-evenly' to 'space-around' for better spacing when wrapping occurs
		alignItems: 'center',
		width: '100%',
		padding: '1rem', // added padding to prevent cards from sticking to the edges
	};

	const cardStyle = {
		position: 'relative', // added this line to establish a context for absolute positioning
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '2rem',
		height: '200px',
		width: '100%',
		maxWidth: '500px',
		background: theme.palette.secondary.main,
		marginBottom: '1rem',
	};

	const iconStyle = {
		position: 'absolute', // the icon will be positioned absolutely within the card
		top: '1rem', // adjust as necessary to create space at the top
		width: '100%', // this makes sure the icon is centered horizontally
		textAlign: 'center', // this centers the icon horizontally
	};

	return (
		<div>
			<Header />
			<Box style={mainContainerStyle}>
				<LobbyCreation />
				<Typography variant='h3' style={{ textAlign: 'center', marginTop: '10rem', marginBottom: '2rem' }}>
					How to play
				</Typography>

				<div style={cardContainerStyle}>
					<Card style={cardStyle}>
						<div style={iconStyle}>
							<Filter1 />
						</div>
						<Typography variant='h5' style={{ textAlign: 'center', margin: '2rem 2rem 0 0' }}>
							As a Host, create a lobby, share the lobby code with your friends to join. <br />
							As a Player, join a lobby with the lobby code.
						</Typography>
					</Card>
					<Card style={cardStyle}>
						<div style={iconStyle}>
							<Filter2 />
						</div>
						<Typography variant='h5' style={{ textAlign: 'center', margin: '2rem 2rem 0 0' }}>
							The host will select five categories for the game.
						</Typography>
					</Card>
					<Card style={cardStyle}>
						<div style={iconStyle}>
							<Filter3 />
						</div>
						<Typography variant='h5' style={{ textAlign: 'center', margin: '2rem 2rem 0 0' }}>
							Choose a question from the board: <br />
							100 points are easier questions. <br />
							1000 points are the hardest.
						</Typography>
					</Card>
					<Card style={cardStyle}>
						<div style={iconStyle}>
							<Filter4 />
						</div>
						<Typography variant='h5' style={{ textAlign: 'center', margin: '2rem 2rem 0 0' }}>
							Answer questions before time runs out.
						</Typography>
					</Card>
					<Card style={cardStyle}>
						<div style={iconStyle}>
							<Filter5 />
						</div>
						<Typography variant='h5' style={{ textAlign: 'center', margin: '2rem 2rem 0 0' }}>
							Be smarter than your friends and win the game!
						</Typography>
					</Card>
				</div>
			</Box>
		</div>
	);
}

export default LandingPage;
