import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';

import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';

function Header() {
	const user = useSelector((state) => state.auth.user);

	return (
		<AppBar position='sticky' color='primary'>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant='h2'>
					<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
						TRIVIOSA
					</Link>
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					{user && <Typography>{user.user}</Typography>}
					<LoginModal>Login</LoginModal>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
