import { Box } from '@mui/material';
import LobbyBoxLayout from './LobbyBoxLayout';
import Header from '../landingPageComponents/modularComponents/Header';
import HeadingCard from './cardComponents/HeadingCard';
import { useSelector } from 'react-redux';
function LobbyPageLayout() {
	const { lobbyCode } = useSelector((state) => state.lobby);
	const { playerNumber, rounds } = useSelector((state) => state.gameSettings);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
				backgroundImage: 'url(./QuizPattern.jpeg)',
				backgroundSize: 'cover',
			}}
		>
			<Header />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<HeadingCard variant={"6"} title={'The host will choose 5 categories. The selected categories will be displayed on the right column'} />
				<Box sx={{ display: 'flex' }}>
					<HeadingCard variant={'6'} title={'Total amount of players: ' + playerNumber} />
					<HeadingCard variant={'6'} title={'Lobby Code: ' + lobbyCode} />
					<HeadingCard variant={'6'} title={'Game rounds: ' + rounds} />
				</Box>
				<LobbyBoxLayout />
			</Box>
		</Box>
	);
}

export default LobbyPageLayout;
