import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, useTheme } from '@mui/material';
import ScoreBoard from './ScoreBoard';
import HeadingCard from '../lobbyComponents/cardComponents/HeadingCard';
import { BaseColors } from '../../theme/theme';

export const ScoreboardPage = () => {
	const navigate = useNavigate();
	const theme = useTheme();

	const handleGoToHomepage = () => {
		navigate('/');
		window.location.reload();
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				backgroundImage: 'url(/QuizPattern.jpeg)',
				backgroundSize: 'cover',
			}}
		>
			<HeadingCard title={'End Result'} variant={'3'} />
			<Box
				sx={{
					bgcolor: BaseColors.mainGray,
					width: '800px',
					height: '500px',
					p: theme.spacing(2),
					m: theme.spacing(4),
					borderRadius: theme.spacing(4),
				}}
			>
				<ScoreBoard />
			</Box>
			<Box
				sx={{
					display: 'flex',
					gap: theme.spacing(10),
				}}
			>
				<Button
					variant='contained'
					color='primary'
					size='large'
					onClick={handleGoToHomepage}
					sx={{
						borderRadius: theme.spacing(4),
						p: theme.spacing(2),
					}}
				>
					Back to Home
				</Button>
				{/* <Button
					variant="contained"
					color="primary"
					size="large"
					sx={{
						borderRadius: theme.spacing(4),
						p: theme.spacing(2),
					}}
				>
					Play again
				</Button> */}
			</Box>
		</Box>
	);
};
