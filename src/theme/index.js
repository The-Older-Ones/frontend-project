import { createTheme } from '@mui/material';

export const BaseColors = {
	mainBlue: '#191D63',
	darkBlue: '#073763',
	lightBlue: '#9FC5E8',
	success: '#31CD63',
	error: '#C82727',
	neutral: '#D9D9D9',
	mainWhite: '#F4F3F6',
	mainBeige: '#EDE8E3',
	mainGray: '#747475',
	categoryOne: '#AC92EB',
	categoryTwo: '#4FC1E8',
	categoryThree: '#A0D568',
	categoryFour: '#FFCE54',
	categoryFive: '#ED5564',
};

export const PointSelectionColors = {};

export const PrimaryTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: BaseColors.mainBeige,
			dark: BaseColors.mainGray,
			light: BaseColors.mainWhite,
		},
		secondary: {
			main: BaseColors.mainBlue,
			dark: BaseColors.darkBlue,
			light: BaseColors.lightBlue,
		},
		error: {
			main: BaseColors.error,
		},
		success: {
			main: BaseColors.success,
		},
	},
	typography: {
		fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
	},
});
