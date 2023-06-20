import React from 'react';
import HeadingCard from '../cardComponents/HeadingCard';
import { Box, Divider, Card, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, FormControl, Checkbox } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@emotion/react';

function RuleSet() {
	const theme = useTheme();

	// Modal with functionality is coming
	return (
		<Box>
			<Box display='flex'>
				<HeadingCard title='Rule Set' variant='5' />
				<IconButton>
					<SettingsIcon />
				</IconButton>
				<Dialog open={false}>
					<DialogTitle>Rule settings</DialogTitle>
					<DialogContent>
						<DialogContentText>Set your game settings</DialogContentText>
						<FormControl>
							<Checkbox></Checkbox>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button variant='contained'>Cancel</Button>
						<Button variant='contained'>Save</Button>
					</DialogActions>
				</Dialog>
			</Box>

			<Divider />

			<Card sx={{ my: theme.spacing(1) }}>
				<CardContent>
					<Typography variant='h6'>Rule #1</Typography>
					<Typography variant='body2'>
						As a Host, create a lobby, share the lobby code with your friends to join. <br />
						As a Player, join a lobby with the lobby code.
					</Typography>
				</CardContent>
			</Card>
			<Card sx={{ my: theme.spacing(1) }}>
				<CardContent>
					<Typography variant='h6'>Rule #2</Typography>
					<Typography variant='body2'>The host will select five categories for the game.</Typography>
				</CardContent>
			</Card>
			<Card sx={{ my: theme.spacing(1) }}>
				<CardContent>
					<Typography variant='h6'>Rule #3</Typography>
					<Typography variant='body2'>
						Choose a question from the board: <br />
						100 points are easier questions. <br />
						1000 points are the hardest.
					</Typography>
				</CardContent>
			</Card>
			<Card sx={{ my: theme.spacing(1) }}>
				<CardContent>
					<Typography variant='h6'>Rule #4</Typography>
					<Typography variant='body2'>Answer questions before time runs out.</Typography>
				</CardContent>
			</Card>
			<Card sx={{ my: theme.spacing(1) }}>
				<CardContent>
					<Typography variant='h6'>Rule #5</Typography>
					<Typography variant='body2'>Be smarter than your friends and win the game!</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}

export default RuleSet;
