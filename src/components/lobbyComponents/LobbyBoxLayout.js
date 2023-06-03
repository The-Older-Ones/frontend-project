import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Button, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import HeadingCard from './cardComponents/HeadingCard';

import PlayerList from './playerComponents/PlayerList';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

function LobbyBoxLayout() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { categories } = useSelector((state) => state.gameSettings);
	const { host } = useSelector((state) => state.lobby);

	return (
		<Box
			maxWidth="1100px"
			mx="auto"
			sx={{
				width: '100%',
				border: '1px solid black',
				height: '70vh',
				borderRadius: 1,
			}}
		>
			<Grid container sx={{ height: '100%' }}>
				<Grid item xs={12} md={3}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<HeadingCard variant={'6'} title={'Players'} />
						<Box>
							<PlayerList />
						</Box>
					</Box>
				</Grid>

				<Grid
					item
					xs={12}
					md={6}
					sx={{
						borderRight: '1px solid gray',
						borderLeft: '1px solid gray',
						flexGrow: 1,
						height: '100%',
					}}
				>
					<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
						<HeadingCard variant={'4'} title={'Choose options'} />
						<Paper
							sx={{
								bgcolor: theme.palette.secondary.light,
								overflowY: 'scroll',
								flexGrow: 1,
								'&::-webkit-scrollbar': { display: 'none' },
								// '-ms-overflow-style': 'none',
								scrollbarWidth: 'none',
							}}
						>
							<Box>
								{categories.map((category, index) => (
									<Paper key={index} elevation={3} sx={{ my: theme.spacing(1), mx: theme.spacing(3) }}>
										<FormGroup>
											<FormControlLabel control={<Checkbox disabled={host ? false : true} />} label={category} sx={{ px: theme.spacing(2) }} />
										</FormGroup>
									</Paper>
								))}
							</Box>
						</Paper>
						<Button variant="contained" sx={{ mb: '20px' }}>
							Lock Categories
						</Button>
					</Box>
				</Grid>

				{/* <Grid item xs={12} md={3}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<HeadingCard variant={'6'} title={'Lock it in'} />
						<Button variant='contained' sx={{ mb: '20px' }}>
							Lock Categories
						</Button>
					</Box>
				</Grid> */}
			</Grid>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button variant="contained" sx={{ width: '80%', mt: '20px' }} onClick={() => navigate('/pointSelection')}>
					Start Game
				</Button>
			</Box>
		</Box>
	);
}

export default LobbyBoxLayout;
