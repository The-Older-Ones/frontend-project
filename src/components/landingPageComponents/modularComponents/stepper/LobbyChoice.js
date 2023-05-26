import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  useTheme,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveStep,
  setHost,
  setLobbyCode,
  setLobbySelection,
} from "../../../../store/slices/landingPageSlices/lobbySlice";

function LobbyChoice() {
  const theme = useTheme();
  const { activeStep, host, lobbySelection, lobbyCode } = useSelector(
    (state) => state.lobby
  );
  const dispatch = useDispatch();

  const handleChoice = (value) => {
    dispatch(setHost(value));
    dispatch(setLobbySelection(true));
  };

  return (
    <Paper
      elevation={3}
      style={{
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        my: theme.spacing(2),
        padding: "32px",
        width: "80%",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: "4px",
      }}
    >
      {!lobbySelection && (
        <Box
          id="chooseLobby"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={theme.spacing(6)}
        >
          <Typography variant="h3" component={"h1"} color="textPrimary">
            Select an option
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleChoice(true)}
          >
            Host a lobby
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleChoice(false)}
          >
            Join a lobby
          </Button>
        </Box>
      )}

      {lobbySelection && host && (
        <Box
          id="lobbyCode"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={theme.spacing(6)}
        >
          <Typography variant="h4" color="initial">
            Here is your lobby code. Share it with other people who want to join
            your lobby!
          </Typography>
          <Typography variant="p" color="initial">
            Dummy Code
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(setLobbySelection(false))}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(setActiveStep(activeStep + 1))}
            >
              Next Step
            </Button>
          </Box>
        </Box>
      )}
      {lobbySelection && !host && (
        <Box
          id="lobbyCode"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={theme.spacing(6)}
        >
          <Typography variant="h4" color="intial">
            Enter your lobby code.
          </Typography>
          <TextField
            id="joinCode"
            label="Enter lobby code"
            value={lobbyCode}
            onChange={(e) => setLobbyCode(e.target.value)}
          />
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(setLobbySelection(false))}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(setActiveStep(activeStep + 1))}
            >
              Next step
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default LobbyChoice;
