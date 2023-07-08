import React from 'react';
import { Box, Typography, AppBar, Toolbar, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import RuleSet from './RuleSet';
import SetRules from './SetRules';

function Header() {
	const theme = useTheme();
	const user = useSelector((state) => state.auth.user);
	const { path } = useSelector((state) => state.route);
	const { host } = useSelector((state) => state.lobby);

	return (
		<AppBar position='sticky' color='primary'>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant='h2'>
					<a href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
						𐌕Ꮢ𐌉ᕓ𐌉Ꝋ𐌔𐌀 (っ◔◡◔)っ
					</a>
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
					{user && <Typography>{user.user}</Typography>}
					<LoginModal />
					<RuleSet />
					{path === '/lobby' && host && <SetRules />}
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
