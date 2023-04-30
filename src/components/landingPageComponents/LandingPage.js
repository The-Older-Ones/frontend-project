import React, { useState } from 'react';
import { Box, Typography, TextField, Avatar, Paper, IconButton, useTheme } from '@mui/material';
import { PlayArrow, ArrowForward, ArrowBack, Filter1, Filter2, Filter3 } from '@mui/icons-material';

function LandingPage() {
	const theme = useTheme();

	const mainContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 'calc(100vh - 96px)', // Updated
		width: '100%',
		background: `linear-gradient(${theme.palette.secondary.main}, white)`,
		padding: '0',
	};

	const titleStyle = {
        marginTop: "32px",
		marginBottom: '32px',
		fontSize: '5rem',
	};

	const inputBoxStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '32px',
		width: '25%',
		backgroundColor: theme.palette.primary.main,
		borderRadius: '4px',
		marginBottom: '32px', // add margin-bottom
	};

	const textFieldStyle = {
		backgroundColor: theme.palette.secondary.light,
		// borderRadius: '32px',
		marginBottom: '16px',
	};

	const avatarGridStyle = {
		display: 'flex',
		alignItems: 'center',
		marginTop: '16px',
		marginBottom: '16px',
	};

	const playButtonStyle = {
		width: '128px',
		height: '48px',
		backgroundColor: 'forestgreen',
	};

	const howToPlayStyle = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		minHeight: '48px',
		padding: '16px',
		backgroundColor: 'transparent',
		color: theme.palette.text.primary,
		marginTop: '400px', // add margin-top
		marginBottom: '32px', // add margin-bottom
	};

	const howToPlayListStyle = {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: '100%',
		padding: '20px',
		listStyle: 'none',
	};

	const listItemStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	};

	/**
	 * state management for the color picker, same procedure can be done for the avatars
	 * should be done with redux later, just for demonstration purposes
	 */
	const colors = ['Red', 'Green', 'Blue'];
	const [currentColorIndex, setCurrentColorIndex] = useState(0);

	const handlePreviousColor = () => {
		setCurrentColorIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : colors.length - 1));
	};

	const handleNextColor = () => {
		setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
	};

	const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png'];
	const numberedIcons = [<Filter1 />, <Filter2 />, <Filter3 />];

	return (
		<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Box style={mainContainerStyle}>
				<Typography variant='h1' style={titleStyle}>
					Triviosa
				</Typography>
				<Paper elevation={3} style={inputBoxStyle}>
					<TextField label="What's your name?" variant='filled' fullWidth sx={textFieldStyle} />
					<Typography style={{ marginTop: '16px', marginBottom: '8px' }}>Choose an Avatar</Typography>
					<Box style={avatarGridStyle}>
						<IconButton>
							<ArrowBack />
						</IconButton>
						<Avatar alt='avatar' src={avatars[0]} sx={{ width: 80, height: 80 }} />
						<IconButton>
							<ArrowForward />
						</IconButton>
					</Box>
					<Box style={avatarGridStyle}>
						<IconButton onClick={handlePreviousColor}>
							<ArrowBack />
						</IconButton>
						<Typography>{colors[currentColorIndex]}</Typography>
						<IconButton onClick={handleNextColor}>
							<ArrowForward />
						</IconButton>
					</Box>
					<IconButton color='secondary' style={playButtonStyle}>
						<PlayArrow fontSize='large' />
					</IconButton>
				</Paper>
				<Box style={howToPlayStyle}>
					<Typography fontSize={'2rem'}>How to play</Typography>
					<ul style={howToPlayListStyle}>
						{[
							'Choose 5 categories for the questions.',
							'Choose a question from the board: 100 points are easier questions 1000 points are the hardest.',
							'Answer questions before time runs out.',
						].map((text, index) => (
							<li key={index} style={listItemStyle}>
								{numberedIcons[index]}
								<Typography fontSize={'1.5rem'}>{text}</Typography>
							</li>
						))}
					</ul>
				</Box>
			</Box>
		</Box>
	);
}

export default LandingPage;
