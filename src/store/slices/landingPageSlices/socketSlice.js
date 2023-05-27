import { createSlice } from "@reduxjs/toolkit";
// Import socket.io connection, this triggers the connection.
import socket from "../../../socket";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    isConnected: false,
    socketID: null,
  },
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setSocketID: (state, action) => {
      state.socketID = action.payload;
    },
  },
});

export const { setConnected, setSocketID } = socketSlice.actions;
export default socketSlice.reducer;
