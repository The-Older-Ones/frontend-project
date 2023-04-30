import { Box } from "@mui/material";
import React from "react";
import HeadingCard from "../cardComponents/HeadingCard";
import PlayerList from "./PlayerList";

function LeaderBoard() {
  return (
    <Box>
      <HeadingCard title="Leading Scoreboard" variant="5"></HeadingCard>
      <PlayerList></PlayerList>
    </Box>
  );
}

export default LeaderBoard;
