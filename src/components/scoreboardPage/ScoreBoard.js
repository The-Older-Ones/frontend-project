import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, useTheme } from '@mui/material';
import { BaseColors } from '../../theme/theme';
function ScoreBoard() {
	const theme = useTheme();
	const { leaderboard } = useSelector((state) => state.game);
	const { players } = useSelector((state) => state.gameSettings);
	// mapping of the socketId with the playername
	const scoreBoard = leaderboard.map((element) => {
		const playerName = players.find((player) => player.socketId === element.socketId)?.playerName;
		return { ...element, playerName };
	});

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead sx={{ bgcolor: theme.palette.secondary.dark }}>
					<TableRow>
						<TableCell>
							<Typography variant="h4" color={BaseColors.mainWhite}>
								Player Name
							</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography variant="h4" color={BaseColors.mainWhite}>
								Score
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody sx={{ bgcolor: theme.palette.secondary.light }}>
					{scoreBoard.map((row, index) => (
						<TableRow key={index}>
							<TableCell component="th" scope="row">
								<Typography variant="h6" color="secondary" fontWeight={'bold'}>
									{row.playerName}
								</Typography>
							</TableCell>
							<TableCell align="right">
                                <Typography variant="h6" color="secondary" fontWeight={"bold"}>{row.points}</Typography>
                            </TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default ScoreBoard;
