import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar, useTheme } from '@mui/material';
import { setRoute } from '../../../store/slices/routeSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoginModal from './LoginModal';
import RuleSet from './RuleSet';
import SetRules from './SetRules';

function Header() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const { path } = useSelector((state) => state.route);
	const { host } = useSelector((state) => state.lobby);
	const handleGoToHomepage = () => {
		dispatch(setRoute('/'));
	};
	return (
		<AppBar position='sticky' color='primary'>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant='h2'>
					<Link to='/' onClick={handleGoToHomepage} style={{ textDecoration: 'none', color: 'inherit' }}>
						𐌕Ꮢ𐌉ᕓ𐌉Ꝋ𐌔𐌀 (っ◔◡◔)っ
					</Link>
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
