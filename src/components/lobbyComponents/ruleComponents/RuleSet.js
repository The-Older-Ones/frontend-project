import React from "react";
import HeadingCard from "../cardComponents/HeadingCard";
import {
  Box,
  Divider,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  Checkbox,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@emotion/react";

function RuleSet() {
  const theme = useTheme();

  // Modal with functionality is coming
  return (
    <Box>
      <Box display="flex">
        <HeadingCard title="Rule Set" variant="5" />
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <Dialog open={false}>
          <DialogTitle>Rule settings</DialogTitle>
          <DialogContent>
            <DialogContentText>Set your game settings</DialogContentText>
            <FormControl>
              <Checkbox></Checkbox>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="contained">Cancel</Button>
            <Button variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Divider />

      <Card sx={{ my: theme.spacing(1) }}>
        <CardContent>
          <Typography variant="h6">Rule #1</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
            voluptatem? Enim tenetur libero vel ratione soluta adipisci, illo
            quas dolorem odit, nesciunt a. Aperiam reprehenderit, atque tempore
            ea eum nesciunt?
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ my: theme.spacing(1) }}>
        <CardContent>
          <Typography variant="h6">Rule #2</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
            voluptatem? Enim tenetur libero vel ratione soluta adipisci, illo
            quas dolorem odit, nesciunt a. Aperiam reprehenderit, atque tempore
            ea eum nesciunt?
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ my: theme.spacing(1) }}>
        <CardContent>
          <Typography variant="h6">Rule #3</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
            voluptatem? Enim tenetur libero vel ratione soluta adipisci, illo
            quas dolorem odit, nesciunt a. Aperiam reprehenderit, atque tempore
            ea eum nesciunt?
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RuleSet;
