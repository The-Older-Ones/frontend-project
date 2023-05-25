import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { setActiveStep } from "../../../../store/slices/landingPageSlices/lobbySlice";
import { useDispatch, useSelector } from "react-redux";

function ConfirmLobby() {
  const dispatch = useDispatch();
  const { activeStep } = useSelector((state) => state.lobby);

  return (
    <Box
      id="confirmLobby"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography variant="h1" color="initial">
        Confirm your choice
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(setActiveStep(activeStep - 1))}
        >
          Go Back
        </Button>
        <Button variant="contained" color="secondary">
          Confirm
        </Button>
      </Box>
    </Box>
  );
}

export default ConfirmLobby;
