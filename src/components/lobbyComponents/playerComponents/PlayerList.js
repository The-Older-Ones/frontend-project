import React from 'react';
import { Box, Avatar, List, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';

function PlayerList() {
	const theme = useTheme();
	const { players } = useSelector((state) => state.gameSettings);

	return (
		<Box sx={{ bgcolor: 'wheat', px: theme.spacing(2) }}>
			<List>
				{players.map((player, index) => (
					<React.Fragment key={index}>
						<ListItem>
							<ListItemIcon>
								<ListItemAvatar>
									<Avatar>
										<PersonIcon />
									</Avatar>
								</ListItemAvatar>
							</ListItemIcon>
							<ListItemText primary={player.playerName} />
						</ListItem>
						<Divider />
					</React.Fragment>
				))}
			</List>
		</Box>
	);
}

export default PlayerList;
