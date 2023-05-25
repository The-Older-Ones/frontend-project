import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  useTheme,
  Typography,
} from "@mui/material";

import LobbyChoice from "./stepper/LobbyChoice";
import CreateAvatar from "./stepper/CreateAvatar";
import ConfirmLobby from "./stepper/ConfirmLobby";
import { useSelector } from "react-redux";

function LobbyCreation() {
  const theme = useTheme();

  const { activeStep } = useSelector((state) => state.lobby);

  const getStepContent = (switchIndex) => {
    switch (switchIndex) {
      case 0:
        return <LobbyChoice />;
      case 1:
        return <CreateAvatar />;
      case 2:
        return <ConfirmLobby />;
      default:
        <Typography variant="h4" color="initial">
          Unkown stepIndex
        </Typography>;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
        width: "75%",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "4px",
      }}
    >
      <Box id="lobbyCreation">
        <Stepper activeStep={activeStep}>
          <Step key={0}>
            <StepLabel>
              Select to host or join lobby and get your code
            </StepLabel>
          </Step>
          <Step key={1}>
            <StepLabel>Create your Avatar and enter your game name.</StepLabel>
          </Step>
          <Step key={2} last>
            <StepLabel>Confirm your choices.</StepLabel>
          </Step>
        </Stepper>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {getStepContent(activeStep)}
        </Box>
      </Box>
    </Paper>
  );
}

export default LobbyCreation;
