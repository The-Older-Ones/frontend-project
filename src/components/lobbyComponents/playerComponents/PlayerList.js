import React from 'react';
import { Box, Avatar, List, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Divider, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { useSelector } from 'react-redux';

function PlayerList() {
	const theme = useTheme();
	const { players } = useSelector((state) => state.gameSettings);

	const { avatars, avatarIndex } = useSelector((state) => state.lobby);

	return (
		<Box sx={{ bgcolor: theme.palette.secondary.light, px: theme.spacing(2), borderRadius: theme.spacing(4), mt: theme.spacing(2) }}>
			<List>
				{players.map((player, index) => (
					<React.Fragment key={index}>
						<ListItem>
							<ListItemIcon>
								<ListItemAvatar>
									<Avatar src={avatars[avatarIndex]}>
										<PersonIcon />
									</Avatar>
								</ListItemAvatar>
							</ListItemIcon>
							<ListItemText primary={player.playerName} sx={{ mx: theme.spacing(2) }} />
							{/* {host && <Star />} */}
						</ListItem>
						{index !== players.length - 1 && <Divider />}
					</React.Fragment>
				))}
			</List>
		</Box>
	);
}

export default PlayerList;
