import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import LobbyBoxLayout from './LobbyBoxLayout';
import { BaseColors } from '../../theme';
import LeaderBoard from './playerComponents/LeaderBoard';
import RuleSet from './ruleComponents/RuleSet';
import socket from '../../socket';
import { useDispatch } from 'react-redux';
import { setPlayers } from '../../store/slices/gameSlices/gameSettingSlice';

function LobbyPageLayout() {
	const dispatch = useDispatch();
	useEffect(() => {
		const handleJoinedLobby = (data) => {
			console.log('Joined Lobby Event');
			dispatch(setPlayers(data.settings.lobbyMember));
		};

		const handlePlayerJoined = (data) => {
			console.log('Player Joined Event');
			dispatch(setPlayers([{ socketId: data.playerId, playerName: data.playerName }]));
		};

		socket.on('joinedLobby', handleJoinedLobby);
		socket.on('playerJoined', handlePlayerJoined);

		return () => {
			socket.off('joinedLobby', handleJoinedLobby);
			socket.off('playerJoined', handlePlayerJoined);
		};
	}, [dispatch]);

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
					<Box p={2} bgcolor='secondary.light' sx={{ height: '100%' }}>
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
							<LobbyBoxLayout />
						</Box>
					</Box>
				</Grid>

				<Grid item xs={12} md={2}>
					<Box p={2} bgcolor='secondary.light' sx={{ height: '100%' }}>
						<RuleSet />
					</Box>
				</Grid>
			</Grid>
		</div>
	);
}

export default LobbyPageLayout;
