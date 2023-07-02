import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Button, Paper, FormGroup, FormControlLabel, Checkbox, useTheme, Typography } from '@mui/material';
import HeadingCard from './cardComponents/HeadingCard';
import PlayerList from './playerComponents/PlayerList';
import { useDispatch, useSelector } from 'react-redux';
import { setGameCategories, setSelectedCategory } from '../../store/slices/gameSlices/gameSettingSlice';
import SocketManager from '../../services/SocketManager';
import { setNextPlayer } from '../../store/slices/gameSlices/gameSettingSlice';

function LobbyBoxLayout() {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { mappedCategories, lockedCategories, gameCategories, categoryCheck, players } = useSelector((state) => state.gameSettings);
	const { host } = useSelector((state) => state.lobby);
	const { path } = useSelector((state) => state.route);
	const handleSelectedCategory = (categoryName, checked) => {
		dispatch(setSelectedCategory({ categoryName, selected: checked }));
	};
	const isLockedDisabled = lockedCategories.length !== 5; // 5 wird ersetzt durch spätere Spieleinstellungsvariable
	const isStartGameDisabled = gameCategories.length === 0;
	console.log(path);
	const startGame = () => {
		console.log('Start Game Event');
		SocketManager.startGame(gameCategories);
	};
	console.log('Route: ' + path);

	useEffect(() => {
		if (path === '/pointSelection') {
			navigate('/pointSelection');
		}
		if (path === '/') {
			navigate('/');
		}
	}, [path, navigate]);

	useEffect(() => {
		if (gameCategories.length === 5 && categoryCheck) {
			SocketManager.lobbySynchro({
				flag: 'GAME_CATEGORIES',
				data: gameCategories,
			});
		}
	}, [gameCategories, categoryCheck]);
	return (
		<Box
			maxWidth="1100px"
			mx="auto"
			sx={{
				width: '100%',
				border: '1px solid black',
				height: '60vh',
				borderRadius: theme.spacing(4),
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
							backgroundColor: theme.palette.primary.dark,
							borderTopLeftRadius: theme.spacing(4),
							borderBottomLeftRadius: theme.spacing(4),
						}}
					>
						<HeadingCard variant={'6'} title={'Players in lobby'} />
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
						backgroundColor: theme.palette.primary.dark,
					}}
				>
					<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
						<HeadingCard variant={'4'} title={'Choose categories'} />
						<Paper
							sx={{
								bgcolor: theme.palette.primary.dark,
								overflowY: 'scroll',
								flexGrow: 1,
								'&::-webkit-scrollbar': { display: 'none' },
								scrollbarWidth: 'none',
							}}
						>
							<Box>
								{mappedCategories.map((category, index) => (
									<Paper key={index} elevation={3} sx={{ my: theme.spacing(1), mx: theme.spacing(3) }}>
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														color="secondary"
														disabled={host ? false : true}
														checked={category.selected}
														onChange={(e) => handleSelectedCategory(category.categoryName, e.target.checked)}
													/>
												}
												label={category.categoryName}
												sx={{ px: theme.spacing(2) }}
											/>
										</FormGroup>
									</Paper>
								))}
							</Box>
						</Paper>
						<Button
							variant="contained"
							color="secondary"
							disabled={isLockedDisabled}
							sx={{ p: theme.spacing(2), borderRadius: theme.spacing(4), mb: theme.spacing(1) }}
							onClick={() => {
								dispatch(setGameCategories());
								SocketManager.lobbySynchro({
									flag: 'SYNC_PLAYER_LIST',
									data: players,
								});
							}}
						>
							Lock Categories
						</Button>
					</Box>
				</Grid>

				<Grid item xs={12} md={3}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							height: '100%',
							backgroundColor: theme.palette.primary.dark,
							borderTopRightRadius: theme.spacing(4),
							borderBottomRightRadius: theme.spacing(4),
							gap: theme.spacing(2),
						}}
					>
						<HeadingCard variant={'6'} title={'Selected categories'} />
						{gameCategories.map((category, index) => (
							<Paper key={index} elevation={3} sx={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', justifyItems: 'center' }}>
								<Typography variant="h6" color="initial">
									{category}
								</Typography>
							</Paper>
						))}
					</Box>
				</Grid>
			</Grid>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					variant="contained"
					disabled={isStartGameDisabled}
					color="success"
					sx={{ width: '80%', mt: theme.spacing(2), py: theme.spacing(2), borderRadius: theme.spacing(4) }}
					onClick={startGame}
				>
					Start Game
				</Button>
			</Box>
		</Box>
	);
}

export default LobbyBoxLayout;
