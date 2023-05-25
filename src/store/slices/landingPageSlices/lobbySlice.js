import { createSlice } from "@reduxjs/toolkit";

const lobbySlice = createSlice({
  name: "lobby",
  initialState: {
    ign: "",
    host: true,
    avatar: "avatar1.png", //
    colorIndex: 0, //
    //Stepper states
    activeStep: 0,
    lobbySelection: false,
    lobbyCode: "",
  },
  reducers: {
    setIGN: (state, action) => {
      state.ign = action.payload;
    },
    setActiveStep: (state, action) => {
      if (state.activeStep <= 2 && state.activeStep >= 0) {
        state.activeStep = action.payload;
      }
    },
    setHost: (state, action) => {
      state.host = action.payload;
    },
    setLobbySelection: (state, action) => {
      state.lobbySelection = action.payload;
    },
    setLobbyCode: (state, action) => {
      state.lobbyCode = action.payload;
    },
  },
});

export const {
  setIGN,
  setActiveStep,
  setHost,
  setLobbySelection,
  setLobbyCode,
} = lobbySlice.actions;

export default lobbySlice.reducer;
