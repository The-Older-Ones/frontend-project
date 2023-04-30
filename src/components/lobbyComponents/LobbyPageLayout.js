import React from "react";
import { Box, Grid } from "@mui/material";
import LobbyBoxLayout from "./LobbyBoxLayout";
// import HeadingCard from "./cardComponents/HeadingCard";

function LobbyPageLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        height: "auto",
      }}
    >
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={2}>
          <Box p={2} bgcolor={"darkred"} sx={{ height: "100%" }}>
            <p>This is left</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt enim
              vitae dolores eum nam necessitatibus labore maxime modi excepturi,
              animi numquam, eius, iusto ducimus a. Animi commodi temporibus et
              libero?
            </p>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ width: "100%", height: "100%" }}>
            
            <Box
              sx={{
                bgcolor: "darkkhaki",
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'column',
              }}
            >
              {/* <HeadingCard variant={"2"} title={"Lobby Page"}/> */}
              <LobbyBoxLayout />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box p={2} bgcolor={"darkcyan"} sx={{ height: "100%" }}>
            This is right column.
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default LobbyPageLayout;
