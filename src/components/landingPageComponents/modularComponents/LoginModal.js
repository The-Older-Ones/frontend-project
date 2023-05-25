import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../../store/slices/landingPageSlices/loginSlice";
import { loginUser, signupUser } from "../../../store/slices/landingPageSlices/authSlice";
import {
  Box,
  Typography,
  TextField,
  useTheme,
  Modal,
  FormControl,
  Button,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";

function LoginModal() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.login.modalOpen);

  const [tabValue, setTabValue] = useState(0);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ userID: loginUsername, password: loginPassword }));
    setLoginPassword("");
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    dispatch(signupUser({ userID: signupUsername, password: signupPassword }));
    setSignupPassword("");
  };

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={handleOpen}
      >
        <AccountCircle fontSize="large" color="secondary" />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "500px",
            transform: "translate(-50%, -50%)",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.paper",
            border: "2px solid #000",
            p: 4,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Login" />
            <Tab label="Sign up" />
          </Tabs>

          {tabValue === 0 && (
            <FormControl
              component={"form"}
              onSubmit={handleLoginSubmit}
              sx={{ my: theme.spacing(2) }}
            >
              <Typography variant="h3" color="initial">
                Login
              </Typography>
              <TextField
                id="login-username"
                label="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                sx={{ my: theme.spacing(2), width: "450px" }}
              />
              <TextField
                id="login-password"
                label="Password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                sx={{ my: theme.spacing(2) }}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormControl>
          )}
          {tabValue === 1 && (
            <FormControl
              component={"form"}
              onSubmit={handleSignupSubmit}
              sx={{ my: theme.spacing(2) }}
            >
              <Typography variant="h3" color="initial">
                Sign Up
              </Typography>
              <TextField
                id="signup-username"
                label="Username"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                sx={{ my: theme.spacing(2), width: "450px" }}
              />
              <TextField
                id="signup-password"
                label="Password"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                sx={{ my: theme.spacing(2) }}
              />
              <Button type="submit" variant="contained" color="primary">
                Sign up
              </Button>
            </FormControl>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default LoginModal;
