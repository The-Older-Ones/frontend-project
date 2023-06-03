import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import LobbyBoxLayout from './LobbyBoxLayout';
import { BaseColors } from '../../theme';
// import HeadingCard from "./cardComponents/HeadingCard";
import LeaderBoard from './playerComponents/LeaderBoard';
import RuleSet from './ruleComponents/RuleSet';
import socket from '../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../../store/slices/gameSlices/gameSettingSlice';

function LobbyPageLayout() {
	// test
	const dispatch = useDispatch();
	const { players } = useSelector((state) => state.gameSettings);

	socket.on('joinedLobby', (data) => {
		dispatch(
			setPlayers({
				lobbyMember: data.settings.lobbyMember,
			})
		);
	});

	setTimeout(() => {
		console.log(players);
	}, 2000);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
				height: 'auto',
			}}
		>
			<Grid container sx={{ minHeight: '100vh' }}>
				<Grid item xs={12} md={2}>
					<Box p={2} bgcolor="secondary.light" sx={{ height: '100%' }}>
						<LeaderBoard />
					</Box>
				</Grid>

				<Grid item xs={12} md={8}>
					<Box sx={{ width: '100%', height: '100%' }}>
						<Box
							sx={{
								bgcolor: BaseColors.neutral,
								height: '100%',
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}
						>
							{/* <HeadingCard variant={"2"} title={"Lobby Page"}/> */}
							<LobbyBoxLayout />
						</Box>
					</Box>
				</Grid>

				<Grid item xs={12} md={2}>
					<Box p={2} bgcolor="secondary.light" sx={{ height: '100%' }}>
						<RuleSet />
					</Box>
				</Grid>
			</Grid>
		</div>
	);
}

export default LobbyPageLayout;
