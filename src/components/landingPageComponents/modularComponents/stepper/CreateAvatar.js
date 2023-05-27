import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Paper,
  IconButton,
  useTheme,
  FormControl,
  Button,
  Stack
} from "@mui/material";

import {
  setActiveStep,
  setIGN,
} from "../../../../store/slices/landingPageSlices/lobbySlice";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
function CreateAvatar() {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { ign, activeStep } = useSelector((state) => state.lobby);
  const dispatch = useDispatch();

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

  return (
    <Paper
      elevation={3}
      style={{
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        padding: "32px",
        width: "50%",
        height: "75%",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: "4px",
        margin: "10px"
      }}
    >
      <Box
        id="createAvatar"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        // gap={theme.spacing(6)}
        >
        <FormControl>
          <TextField
            label={user ? "" : "What's your name?"}
            variant="filled"
            fullWidth
            sx={{ bgcolor: theme.palette.secondary.light }}
            value={ign}
            placeholder={user ? user.user : ""}
            onChange={(e) => dispatch(setIGN(e.target.value))}
          />
          <Stack alignItems="center">
          <Typography style={{ marginTop: "16px", marginBottom: "8px" }}>
            Choose an Avatar
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <ArrowBack />
            </IconButton>
            <Avatar
              alt="avatar"
              src={avatars[0]}
              sx={{ width: 80, height: 80 }}
            />
            <IconButton>
              <ArrowForward />
            </IconButton>
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handlePreviousColor}>
              <ArrowBack />
            </IconButton>
            <Typography>{colors[currentColorIndex]}</Typography>
            <IconButton onClick={handleNextColor}>
              <ArrowForward />
            </IconButton>
          </Box>
          </Stack>
          <Box>
          <Stack spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => dispatch(setActiveStep(activeStep + 1))}
            >
              Go Next
            </Button>
            </Stack>
          </Box>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default CreateAvatar;
