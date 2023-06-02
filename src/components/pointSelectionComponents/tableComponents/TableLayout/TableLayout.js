import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TableLayout = ({ headings, rows }) => {
	const navigate = useNavigate();

	const handleClick = (points) => {
		// Navigate to the quiz page and pass the selected points as state
		navigate('/quiz', { state: { points } });
	};
	return (
		<Grid container spacing={9}>
			<Grid item xs={12}>
				<Grid container>
					{headings.map((heading, index) => (
						<Grid item xs key={index}>
							<Paper elevation={6} sx={{ display: 'flex', justifyContent: 'center', my: 2, mx: 2 }}>
								<Typography variant='h6'>{heading}</Typography>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Grid>
			{rows.map((row, index) => (
				<Grid item xs={12} key={index}>
					<Grid container>
						{row.map((cell, cellIndex) => (
							<Grid item xs key={cellIndex}>
								<Paper
									elevation={2}
									sx={{
										display: 'flex',
										justifyContent: 'center',
										mx: 3,
									}}
								>
									<Button variant='contained' sx={{ width: '100%' }} onClick={() => handleClick(cell)}>
										{cell}
									</Button>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Grid>
			))}
		</Grid>
	);
};

export default TableLayout;
