import React from 'react';
import { IconButton, Modal, Box, useTheme, Card, Typography, Paper, Grid } from '@mui/material';
import { MenuBook, Filter1, Filter2, Filter3, Filter4, Filter5, Filter6 } from '@mui/icons-material';
import { openRuleModal, closeRuleModal } from '../../../store/slices/landingPageSlices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';

function RuleSet() {
	const dispatch = useDispatch();
	const theme = useTheme();
	const { ruleSetOpen } = useSelector((state) => state.login);

	const cardContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	};

	const cardStyle = {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(2),
		background: 'white',
		height: '150px',
		mx: theme.spacing(5),
	};

	const iconStyle = {
		position: 'absolute',
		top: '1rem',
		width: '100%',
		textAlign: 'center',
	};

	const handleOpen = () => {
		dispatch(openRuleModal());
	};

	const handleClose = () => {
		dispatch(closeRuleModal());
	};

	return (
		<>
			<IconButton onClick={handleOpen}>
				<MenuBook fontSize="large" color="secondary" />
			</IconButton>
			<Modal open={ruleSetOpen} onClose={handleClose}>
				<Box>
					<Paper sx={{ width: '50%', mx: 'auto', }}>
						<Typography variant="h3" fontWeight={"bold"} sx={{ textAlign: 'center', my: theme.spacing(3), py: theme.spacing(2) }}>
							How to play
						</Typography>
					</Paper>
					<div style={cardContainerStyle}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<Card sx={cardStyle}>
									<div style={iconStyle}>
										<Filter1 />
									</div>
									<Typography variant="h5" align="center" sx={{ mt: 4 }}>
										As a Host, create a lobby, share the lobby code with your friends to join. As a regular player, join a lobby with the lobby code.
									</Typography>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Card sx={cardStyle}>
									<div style={iconStyle}>
										<Filter2 />
									</div>
									<Typography variant="h5" align="center" sx={{ mt: 4 }}>
										The host will select five categories for the game.
									</Typography>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Card sx={cardStyle}>
									<div style={iconStyle}>
										<Filter3 />
									</div>
									<Typography variant="h5" align="center" sx={{ mt: 4 }}>
										Choose a question from the board: <br />
										100 points are easier questions. <br />
										1000 points are the hardest.
									</Typography>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Card sx={cardStyle}>
									<div style={iconStyle}>
										<Filter4 />
									</div>
									<Typography variant="h5" align="center" sx={{ mt: 4 }}>
										Answer questions before time runs out.
									</Typography>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Card sx={cardStyle}>
									<div style={iconStyle}>
										<Filter5 />
									</div>
									<Typography variant="h5" align="center" sx={{ mt: 4 }}>
										Be smarter than your friends and win the game!
									</Typography>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Card sx={cardStyle}>
									<div style={iconStyle}>
										<Filter6 />
									</div>
									<Typography variant="h5" align="center" sx={{ mt: 4 }}>
										Enjoy and have fun!
									</Typography>
								</Card>
							</Grid>
						</Grid>
					</div>
				</Box>
			</Modal>
		</>
	);
}

export default RuleSet;
