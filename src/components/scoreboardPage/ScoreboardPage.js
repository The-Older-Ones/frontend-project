import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const ScoreboardPage = () => {
	const navigate = useNavigate();
	const leaderboard = useSelector((state) => state.game.leaderboard);

	// Placeholder data. Replace this with actual data.
	const [rows, setRows] = useState([]);

	// useEffect(() => {
	// 	// Mock socket.io event. Replace this with your actual event.
	// 	const mockEvent = {
	// 		leaderboard: [
	// 			{ answer: false, points: 0, socketId: "YB2oioFvBIz8B3n4AAGB" },
	// 			{ answer: false, points: 100, socketId: "iwHDUzEfoWorx8rFAAGD" },
	// 		]
	// 	};

	// 	setRows(mockEvent.leaderboard);
	// }, []);

	const handleButtonClick = () => {
		navigate('/');
		window.location.reload();
	};

	return (
		<div>
			<h1>Scoreboard Page</h1>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Player Name</TableCell>
							<TableCell align='right'>Score</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{leaderboard.map((row, index) => (
							<TableRow key={index}>
								<TableCell component='th' scope='row'>
									{row.socketId} {/* replace with actual player name if available */}
								</TableCell>
								<TableCell align='right'>{row.points}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Button variant='contained' color='primary' onClick={handleButtonClick}>
				Back to Landing Page
			</Button>
		</div>
	);
};
