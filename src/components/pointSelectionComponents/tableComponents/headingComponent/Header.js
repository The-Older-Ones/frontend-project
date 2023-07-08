import React from 'react';
import { Card, Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

function Header() {
	const { currentPlayerIndex, players } = useSelector((state) => state.gameSettings);
	const currentPlayerName = players[currentPlayerIndex]?.playerName || null;

	const theme = useTheme();

	return (
		<Box
			sx={{
				minHeight: theme.spacing(10),
				display: 'flex',
				justifyContent: 'center',
				bgcolor: theme.palette.secondary.main,
			}}
		>
			<Card
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					my: theme.spacing(2),
					px: theme.spacing(10),
				}}
			>
				<Typography variant='h2' component='h1' fontWeight='bold'>
					Choose Points
				</Typography>
				<Typography variant='h4' component='h2' fontWeight='bold'>
					{currentPlayerName ? `${currentPlayerName} is choosing` : 'No player is choosing'}
				</Typography>
			</Card>
		</Box>
	);
}

export default Header;
