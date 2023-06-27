import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

function HeadingCard({ variant, title }) {
	const theme = useTheme();
	// redux for title management?

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				margin: theme.spacing(2),
			}}
		>
			<Paper elevation={6}>
				<Typography
					variant={`h${variant}`}
					sx={{
						fontWeight: 'bold',
						mb: '2',
						px: theme.spacing(5),
						py: theme.spacing(1),
					}}
				>
					{title}
				</Typography>
			</Paper>
		</Box>
	);
}

export default HeadingCard;
