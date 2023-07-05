import React from 'react';
import { Card, Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

function Header() {
	const theme = useTheme();
	const { nextPlayer, players } = useSelector((state) => state.gameSettings);

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
				<Typography variant="h2" component="h1" fontWeight="bold">
					Choose points
				</Typography>
				{/* TODO: Change this to the next player choosing */}
				<Typography variant="h5">Next player choosing: {nextPlayer === null ? players[0].playerName : nextPlayer.playerName}</Typography>
			</Card>
		</Box>
	);
}

export default Header;
