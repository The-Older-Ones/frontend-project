import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import ScoreBoard from './ScoreBoard';

export const ScoreboardPage = () => {
	const navigate = useNavigate();
	const { leaderboard } = useSelector((state) => state.game);
	const { players } = useSelector((state) => state.gameSettings);
	// mapping of the socketId with the playername
	const scoreBoard = leaderboard.map((element) => {
		const playerName = players.find((player) => player.socketId === element.socketId)?.playerName;
		return { ...element, playerName };
	});

	console.log(scoreBoard);

	const handleButtonClick = () => {
		navigate('/');
		window.location.reload();
	};

	return (
		<Box>
			<Typography variant="h1" color="initial">
				End Result
			</Typography>
			<ScoreBoard />
			<Button variant="contained" color="primary" onClick={handleButtonClick}>
				Back to Landing Page
			</Button>
		</Box>
	);
};
