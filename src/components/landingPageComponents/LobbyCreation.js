import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";

import { PlayArrow, ArrowForward, ArrowBack } from "@mui/icons-material";

function LobbyCreation() {
  const theme = useTheme();
  const colors = ["Red", "Green", "Blue"];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const handlePreviousColor = () => {
    setCurrentColorIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : colors.length - 1
    );
  };

  const handleNextColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const avatars = ["avatar1.png", "avatar2.png", "avatar3.png"];

  const inputBoxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px",
    width: "25%",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px",
  };

  const textFieldStyle = {
    backgroundColor: theme.palette.secondary.light,
    // borderRadius: '32px',
    marginBottom: "16px",
  };

  const avatarGridStyle = {
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    marginBottom: "16px",
  };

  const playButtonStyle = {
    width: "128px",
    height: "48px",
    backgroundColor: "forestgreen",
  };

  return (
    <Paper elevation={3} style={inputBoxStyle}>
      <TextField
        label="What's your name?"
        variant="filled"
        fullWidth
        sx={textFieldStyle}
      />
      <Typography style={{ marginTop: "16px", marginBottom: "8px" }}>
        Choose an Avatar
      </Typography>
      <Box style={avatarGridStyle}>
        <IconButton>
          <ArrowBack />
        </IconButton>
        <Avatar alt="avatar" src={avatars[0]} sx={{ width: 80, height: 80 }} />
        <IconButton>
          <ArrowForward />
        </IconButton>
      </Box>
      <Box style={avatarGridStyle}>
        <IconButton onClick={handlePreviousColor}>
          <ArrowBack />
        </IconButton>
        <Typography>{colors[currentColorIndex]}</Typography>
        <IconButton onClick={handleNextColor}>
          <ArrowForward />
        </IconButton>
      </Box>
      <IconButton color="secondary" style={playButtonStyle}>
        <PlayArrow fontSize="large" />
      </IconButton>
    </Paper>
  );
}

export default LobbyCreation;
