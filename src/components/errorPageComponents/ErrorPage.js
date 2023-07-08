// import React, { useEffect, useState } from 'react';
// import { Box, useTheme, Paper, Typography, Grid, Button } from '@mui/material';
// import Header from '../landingPageComponents/modularComponents/Header';
// import JohnCenaImage from '../../asset/img/JohnCena.gif'

// function ErrorPage() {
//     const theme = useTheme();

//     const mainContainerStyle = {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         background: `linear-gradient(${theme.palette.secondary.main}, white)`,
//     };
//     const howToPlayStyle = {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         padding: '16px',
//         backgroundColor: 'transparent',
//         color: theme.palette.primary,
//     };

//     const johnCenaStyle = {
//         marginTop: 'auto',
//         display: 'flex',
//         justifyContent: 'center',
//     };

//     return (
//         <Box
//             sx={{
//                 width: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 minHeight: '100vh',
//             }}
//         >
//             <Box style={mainContainerStyle}>

//                 <Header />
//                 <Paper
//                     elevation={3}
//                     sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         padding: theme.spacing(2),
//                         width: "75%",
//                         height: "75%",
//                         backgroundColor: theme.palette.primary.main,
//                         borderRadius: "4px",
//                         alignItems: "center",
//                         justifyContent: "center"
//                     }}
//                 >
//                     <Box style={howToPlayStyle}>
//                         <Grid container my={2} alignItems="center" justifyContent="center" >
//                             <Typography variant='h3'>
//                                 404 Error: Could not find page
//                             </Typography>
//                         </Grid>
//                     </Box>
//                     <Box sx={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         bgcolor: theme.palette.secondary.light,
//                         p: '16px',
//                         width: '900px',
//                         m: theme.spacing(2),
//                         flexDirection: 'column',
//                     }} >
//                         <Box padding='20px'>
//                             <Typography variant='h5' >
//                                 But why couldn't this page be found?

//                             </Typography>
//                         </Box>
//                         <Grid container my={4} rowSpacing={2} columnSpacing={1} m={4}>
//                             <Grid item xs={6} ><Button
//                                 bgcolor={theme.palette.primary.light}
//                                 variant='contained' sx={{ width: '100%' }}>There is a Network Problem</Button></Grid>
//                             <Grid item xs={6} ><Button
//                                 bgcolor={theme.palette.primary.light}
//                                 variant='contained' sx={{ width: '100%' }}>This page does not exist</Button></Grid>
//                             <Grid item xs={6} ><Button
//                                 bgcolor={theme.palette.primary.light}
//                                 variant='contained' sx={{ width: '100%' }}>You can't see it</Button></Grid>
//                             <Grid item xs={6} ><Button
//                                 bgcolor={theme.palette.primary.light}
//                                 variant='contained' sx={{ width: '100%' }}>It is a Layer 8 Problem</Button></Grid>
//                         </Grid>
//                     </Box>

//                 </Paper>

//                 {/* <Box
// 			{/* <Box style={johnCenaStyle}>
//             <img src={JohnCenaImage} alt="John Cena" />
//         </Box> */}
//             </Box>
//         </Box>
//     );
// }

// export default ErrorPage;

import React, { useEffect, useState } from 'react';
import { Box, useTheme, Paper, Typography, Grid, Button } from '@mui/material';
import Header from '../landingPageComponents/modularComponents/Header';

function ErrorPage() {
	const theme = useTheme();

	const mainContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		background: `linear-gradient(${theme.palette.secondary.main}, white)`,
	};
	const howToPlayStyle = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		padding: '16px',
		backgroundColor: 'transparent',
		color: theme.palette.primary,
	};

	const [text, setText] = useState('');
	const [showButtons, setShowButtons] = useState(false);

	useEffect(() => {
		const message = "Bxut why couldn't this page be found?";
		let currentIndex = 0;

		const timer = setInterval(() => {
			if (currentIndex === message.length) {
				clearInterval(timer);
				// setShowButtons(true);
				setTimeout(() => {
					setShowButtons(true);
				}, 1000);
			} else {
				setText((prevText) => prevText + message[currentIndex]);
				currentIndex++;
			}
		}, 100);

		return () => clearInterval(timer);
	}, []);

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Box style={mainContainerStyle}>
				<Header />
				<Paper
					elevation={3}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						padding: theme.spacing(2),
						width: '75%',
						height: '75%',
						backgroundColor: theme.palette.primary.main,
						borderRadius: '4px',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box style={howToPlayStyle}>
						<Grid container my={2} alignItems='center' justifyContent='center'>
							<Typography variant='h3'>404 Error: Could not find page</Typography>
						</Grid>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							bgcolor: theme.palette.secondary.light,
							p: '16px',
							width: '100%',
							m: theme.spacing(2),
							flexDirection: 'column',
						}}
					>
						<Box padding='20px' sx={{ mr: theme.spacing(2), ml: theme.spacing(2) }}>
							<Typography variant='h5'>{text.slice(0, text.length - 9)}</Typography>
						</Box>
						{showButtons && (
							<Grid container my={4} spacing={2}>
								<Grid item xs={12} sm={6}>
									<Button bgcolor={theme.palette.primary.light} variant='contained' sx={{ width: '100%' }}>
										There is a Network Problem
									</Button>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Button bgcolor={theme.palette.primary.light} variant='contained' sx={{ width: '100%' }}>
										This page does not exist
									</Button>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Button bgcolor={theme.palette.primary.light} variant='contained' sx={{ width: '100%' }}>
										You can't see it
									</Button>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Button bgcolor={theme.palette.primary.light} variant='contained' sx={{ width: '100%' }}>
										It is a Layer 8 Problem
									</Button>
								</Grid>
							</Grid>
						)}
					</Box>
				</Paper>
			</Box>
		</Box>
	);
}

export default ErrorPage;
