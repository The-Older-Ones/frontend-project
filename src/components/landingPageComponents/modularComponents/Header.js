import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar, useTheme } from '@mui/material';

import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import RuleSet from './RuleSet';

function Header() {
	const user = useSelector((state) => state.auth.user);
	const theme = useTheme();
	return (
		<AppBar position="sticky" color="primary">
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant="h2">
					<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
						𐌕𐌓𐌉ᕓ𐌉Ꝋ𐌔𐌀
					</Link>
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
					{user && <Typography>{user.user}</Typography>}
					<LoginModal />
					<RuleSet />
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
