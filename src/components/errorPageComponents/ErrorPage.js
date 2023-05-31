import React from "react";
import { Box, Typography, useTheme, Stack } from "@mui/material";

function ErrorPage() {
  const theme = useTheme();

  const mainContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // minHeight: "calc(100vh - 96px)", // Updated
    width: "100%",
    background: `linear-gradient(${theme.palette.secondary.main}, white)`,
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
    <Box style={mainContainerStyle}>

    </Box>
    </Box>
  );
}

export default ErrorPage;
