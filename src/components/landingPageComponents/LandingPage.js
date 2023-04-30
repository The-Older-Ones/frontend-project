import React from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid, Paper } from '@mui/material';
import { useTheme } from '@emotion/react';

function LandingPage() {
    const theme = useTheme();

	const mainContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
	};

	const titleStyle = {
		marginBottom: '32px',
	};

	const inputBoxStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '24px',
		marginBottom: '40px',
	};

	const avatarGridStyle = {
		marginTop: '16px',
		marginBottom: '16px',
	};

	const howToPlayStyle = {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		padding: '16px',
		backgroundColor: '#3f51b5',
		color: 'white',
	};

	const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png'];

	return (
		<Container style={mainContainerStyle}>
			<Typography variant='h2' style={titleStyle}>
				Triviosa
			</Typography>
			<Paper style={inputBoxStyle}>
				<TextField label='Enter your name' variant='outlined' fullWidth />
				<Grid container spacing={2} style={avatarGridStyle}>
					{avatars.map((avatar) => (
						<Grid item key={avatar}>
							<Avatar alt={avatar} src={avatar} />
						</Grid>
					))}
				</Grid>
				<Button variant='contained' color='primary'>
					Play
				</Button>
			</Paper>
			<Box style={howToPlayStyle}>
				<Typography variant='h6'>How to play</Typography>
				<ul>
					<li>Enter your name and choose an avatar</li>
					<li>Click the "Play" button to start the game</li>
					<li>Answer the quiz questions within the given time</li>
				</ul>
			</Box>
		</Container>
	);
}

export default LandingPage;
