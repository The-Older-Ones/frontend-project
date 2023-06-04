import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import LobbyBoxLayout from './LobbyBoxLayout';
import { BaseColors } from '../../theme';
// import HeadingCard from "./cardComponents/HeadingCard";
import LeaderBoard from './playerComponents/LeaderBoard';
import RuleSet from './ruleComponents/RuleSet';
import socket from '../../socket';
import { useDispatch } from 'react-redux';
import { getHostInfo, setPlayers } from '../../store/slices/gameSlices/gameSettingSlice';

function LobbyPageLayout() {
	const dispatch = useDispatch();
	// const {  } = useSelector((state) => state.gameSettings);
	useEffect(() => {
		dispatch(getHostInfo());

		const handleJoinedLobby = (data) => {
			console.log('Joined Lobby Event');
			const lobbyMember = data.settings.lobbyMember.map((e) => {
				return e.playerName;
			});
			dispatch(setPlayers({ lobbyMember: lobbyMember }));
		};

		const handlePlayerJoined = (data) => {
			console.log('Player Joined Event');
			dispatch(setPlayers({ lobbyMember: { [data.playerId]: data.playerName } }));
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
