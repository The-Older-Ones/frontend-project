import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Modal, useTheme, Box, FormControl, Select, Typography, InputLabel, MenuItem } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { setOpenModalRuleSet, setCloseModalRuleSet } from '../../../store/slices/gameSlices/gameSettingSlice';
import socketManager from '../../../services/SocketManager';

function SetRules() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { modalRuleSet } = useSelector((state) => state.gameSettings);
	const handleOpen = () => {
		dispatch(setOpenModalRuleSet());
	};


	const handleClose = () => {
		dispatch(setCloseModalRuleSet());
	};

	const handleSetPlayerNumber = (e) => {
		const playerNumber = e.target.value;
		socketManager.setPlayerNumber(playerNumber);
	};

	const handleSetRounds = (e) => {
		const rounds = e.target.value;
		socketManager.setRounds(rounds);
	};

	return (
		<>
			<IconButton edge="end" color="inherit" onClick={handleOpen}>
				<Settings fontSize="large" color="secondary" />
			</IconButton>
			<Modal open={modalRuleSet} onClose={handleClose}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						width: '500px',
						transform: 'translate(-50%, -50%)',

						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						bgcolor: 'background.paper',
						border: '2px solid #000',
						p: 4,
					}}
				>
					<Typography variant="h3" color="initial" my={theme.spacing(4)}>
						SET GAME RULES
					</Typography>
					<FormControl component={'form'} sx={{ display: 'flex' }}>
						<InputLabel id="playerNumber" color="secondary">
							Number of players
						</InputLabel>
						<Select label="Number of players" color="secondary" labelId="playerNumber" defaultValue={4} sx={{ width: theme.spacing(50) }} onChange={handleSetPlayerNumber}>
							<MenuItem value={2}>2</MenuItem>
							<MenuItem value={3}>3</MenuItem>
							<MenuItem value={4}>4</MenuItem>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={6}>6</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ my: theme.spacing(4) }} component={'form'}>
						<InputLabel id="roundNumber" color="secondary">
							Number of rounds
						</InputLabel>
						<Select color="secondary" label="Number of rounds" labelId="roundNumber" sx={{ width: theme.spacing(50) }} defaultValue={4} onChange={handleSetRounds}>
							<MenuItem value={3}>3</MenuItem>
							<MenuItem value={4}>4</MenuItem>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={6}>6</MenuItem>
							<MenuItem value={7}>7</MenuItem>
							<MenuItem value={8}>8</MenuItem>
							<MenuItem value={9}>9</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={11}>11</MenuItem>
							<MenuItem value={12}>12</MenuItem>
							<MenuItem value={13}>13</MenuItem>
							<MenuItem value={14}>14</MenuItem>
							<MenuItem value={15}>15</MenuItem>
							<MenuItem value={16}>16</MenuItem>
							<MenuItem value={17}>17</MenuItem>
							<MenuItem value={18}>18</MenuItem>
							<MenuItem value={19}>19</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={21}>21</MenuItem>
							<MenuItem value={22}>22</MenuItem>
							<MenuItem value={23}>23</MenuItem>
							<MenuItem value={24}>24</MenuItem>
							<MenuItem value={25}>25</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Modal>
		</>
	);
}

export default SetRules;
