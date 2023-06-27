import React from 'react';
import Header from './tableComponents/headingComponent/Header';
import TableLayout from './tableComponents/TableLayout/TableLayout';
import { Box } from '@mui/material';

function PointSelectionPageLayout() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
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
					flex: 1,
				}}
			>
				<TableLayout />
			</Box>
		</Box>
	);
}

export default PointSelectionPageLayout;
