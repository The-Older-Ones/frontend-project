import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import LobbyBoxLayout from './LobbyBoxLayout';
import Header from '../landingPageComponents/modularComponents/Header';
import socket from '../../socket';
import { useDispatch } from 'react-redux';
import { setPlayers } from '../../store/slices/gameSlices/gameSettingSlice';
import SocketManager from '../../services/SocketManager';

function LobbyPageLayout() {
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	// const handleJoinedLobby = (data) => {
	// 	// 	console.log('Joined Lobby Event');
	// 	// 	dispatch(setPlayers(data.settings.lobbyMember));
	// 	// };
	// 	// const handlePlayerJoined = (data) => {
	// 	// 	console.log('Player Joined Event');
	// 	// 	dispatch(setPlayers([{ socketId: data.playerId, playerName: data.playerName }]));
	// 	// };
	// 	SocketManager.on('joinedLobby');
	// 	SocketManager.on('playerJoined');
	// 	// socket.on('joinedLobby', handleJoinedLobby);
	// 	// socket.on('playerJoined', handlePlayerJoined);

	// 	return () => {
	// 		SocketManager.off('joinedLobby');
	// 		SocketManager.off('playerJoined');
	// 		// socket.off('joinedLobby', handleJoinedLobby);
	// 		// socket.off('playerJoined', handlePlayerJoined);
	// 	};
	// }, [dispatch]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
				backgroundImage: 'url(./Background3.png)',
				backgroundSize: 'cover',
			}}
		>
			<Header />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}
			>
				<LobbyBoxLayout />
			</Box>
		</Box>
	);
}

export default LobbyPageLayout;
