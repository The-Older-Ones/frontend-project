import { Card, Box, Typography, useTheme } from '@mui/material';
import React from 'react';

function Header() {
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
          px: theme.spacing(10)
				}}
			>
				<Typography variant="h2" component="h1" fontWeight="bold">
					Choose points
				</Typography>
				<Typography variant="h5">Next player choosing: </Typography>
			</Card>
		</Box>
	);
}

export default Header;
