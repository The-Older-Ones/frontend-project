import React from "react";
import { Typography, Box, Button, Stack, Paper, useTheme, Avatar } from "@mui/material";
import { setActiveStep } from "../../../../store/slices/landingPageSlices/lobbySlice";
import { useDispatch, useSelector } from "react-redux";

function ConfirmLobby() {
  const dispatch = useDispatch();
  const theme = useTheme()
  const { activeStep } = useSelector((state) => state.lobby);

  return (
    <Paper
      elevation={3}
      style={{
        my: theme.spacing(2),
        padding: "32px",
        width: "50%",
        height: "50%",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: "4px",
        margin: "10px"
      }}>
      <Box
        id="confirmLobby"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={theme.spacing(3)}
      >
        <Typography variant="h4" color="initial">
          Confirm your choice
        </Typography>
        <Typography variant="h6">
          NAME
        </Typography>
        <Typography variant="h6">
          Lobby:
        </Typography>
        <Avatar
          alt="avatar"
          // src={avatars[0]}
          sx={{ width: 80, height: 80 }}
        />
        <Box>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(setActiveStep(activeStep - 1))}
            >
              Go Back
            </Button>
            <Button variant="contained" color="success">
              Confirm
            </Button>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}

export default ConfirmLobby;
