import { useTheme } from '@emotion/react';
import { Card, Box, Typography, Divider } from '@mui/material';
// import IconButton from '@mui/material/IconButton'
// import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import React from 'react';

function Header() {
	const theme = useTheme();
	return (
		<Box
			sx={{
				minHeight: '150px',
				display: 'flex',
				justifyContent: 'center',
				bgcolor: 'secondary.main',
			}}
		>
			<Card
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					my: theme.spacing(2),
				}}
			>
				<Typography variant='h1' component='h1' fontWeight='bold'>
					Choose points
				</Typography>
				<Divider />
				<Typography variant='h5'>Next player choosing: Sert</Typography>
			</Card>
			{/* <IconButton> */}
			{/* <TimerOutlinedIcon fontSize="large"/> */}
			{/* </IconButton> */}
		</Box>
	);
}

export default Header;
