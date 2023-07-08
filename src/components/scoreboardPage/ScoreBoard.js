import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { BaseColors } from '../../theme/theme';

function ScoreBoard() {
	const theme = useTheme();
	const { leaderboard } = useSelector((state) => state.game);
	const { players } = useSelector((state) => state.gameSettings);
	const { avatars } = useSelector((state) => state.lobby);
	const scoreBoard = leaderboard.map((element) => {
		const playerName = players.find((player) => player.socketId === element.socketId)?.playerName;
		return { ...element, playerName };
	});

	const sortedScoreBoard = scoreBoard.sort((a, b) => b.points - a.points);

	return (
		<TableContainer component={Paper} sx={{ borderRadius: theme.spacing(4) }}>
			<Table size='small'>
				<TableHead sx={{ bgcolor: theme.palette.secondary.dark }}>
					<TableRow>
						<TableCell>
							<Typography variant='h6' color={BaseColors.mainWhite} pl={theme.spacing(4)}>
								Player
							</Typography>
						</TableCell>
						<TableCell align='right'>
							<Typography variant='h6' color={BaseColors.mainWhite} pr={theme.spacing(4)}>
								Score
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody sx={{ bgcolor: theme.palette.secondary.light }}>
					{sortedScoreBoard.map((row, index) => {
						const player = players.find((player) => player.socketId === row.socketId);
						return (
							<TableRow key={index}>
								<TableCell component='th' scope='row'>
									<Box display='flex' alignItems='center' pl={theme.spacing(4)}>
										<Avatar alt='avatar' src={avatars[player.avatarIndex]} sx={{ width: 24, height: 24, mr: theme.spacing(1) }} />
										<Typography variant='body' color='secondary' fontWeight={'bold'}>
											{row.playerName}
										</Typography>
									</Box>
								</TableCell>
								<TableCell align='right'>
									<Typography variant='body' color='secondary' fontWeight={'bold'} pr={theme.spacing(4)}>
										{row.points}
									</Typography>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default ScoreBoard;
