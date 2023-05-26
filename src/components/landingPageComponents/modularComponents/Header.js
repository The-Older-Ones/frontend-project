import React from "react";
import { Box, Typography, useTheme, AppBar, Toolbar } from "@mui/material";

import { useSelector } from "react-redux";
import LoginModal from "./LoginModal";

function Header() {
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);

  return (
    <AppBar position="sticky" color="primary" sx={{ mb: theme.spacing(5) }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3">Triviosa</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user && (
            <Typography variant="p" sx={{ mr: 1 }}>
              {user.user}
            </Typography>
          )}
          <LoginModal />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
