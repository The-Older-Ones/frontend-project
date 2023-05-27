import React from "react";
import { Box, Typography, useTheme, Stack } from "@mui/material";
import { Filter1, Filter2, Filter3 } from "@mui/icons-material";
import Header from "./modularComponents/Header";
import LobbyCreation from "./modularComponents/LobbyCreation";

function LandingPage() {
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

  const howToPlayStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "16px",
    backgroundColor: "transparent",
    color: theme.palette.primary,
  };

  const howToPlayListStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    listStyle: "none",
  };

  const listItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const numberedIcons = [<Filter1 />, <Filter2 />, <Filter3 />];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box style={mainContainerStyle}>
        <Header />
        <LobbyCreation />
        <Box style={howToPlayStyle}>
          <Typography variant="h4">How to play:</Typography>
          <ul style={howToPlayListStyle}>
            {[
              <Typography variant="5" style={{ textAlign: "center", justifyContent: "center" }}>
                "Choose 5 categories for the questions."
              </Typography>,
              <Stack direction="column">
                <Typography variant="h5" style={{ textAlign: "center", justifyContent: "center" }}>
                  "Choose a question from the board
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center", justifyContent: "center" }}>
                  100 points are easier questions 1000 points are the hardest."
                </Typography>
              </Stack>,
              <Typography variant="h5" style={{ textAlign: "center", justifyContent: "center" }}>
                "Answer questions before time runs out."
              </Typography>
            ].map((text, index) => (
              <li key={index} style={listItemStyle}>
                {numberedIcons[index]}
                <Typography fontSize={"1.5rem"}>{text}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}

export default LandingPage;
