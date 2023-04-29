import { createTheme } from "@mui/material";

export const BaseColors = {
  mainOrange: "#F19F32",
  darkOrange: "#D68434",
  lightOrange: "#FFB340",
  mainBlue: "#3B74A8",
  darkBlue: "#073763",
  lightBlue: "#9FC5E8",
  success: "#3DA024",
  error: "#C82727",
  neutral: "#D9D9D9",
};

export const PointSelectionColors = {};

export const PrimaryTheme = createTheme({
    palette: {
        mode: 'light',
        primary:{
            main: BaseColors.mainOrange,
            dark: BaseColors.darkOrange,
            light: BaseColors.lightOrange
        },
        secondary: {
            main: BaseColors.mainBlue,
            dark: BaseColors.darkBlue,
            light: BaseColors.lightBlue
        },
        error: {
            main: BaseColors.error
        },
        success: {
            main: BaseColors.success
        }
    }
});
