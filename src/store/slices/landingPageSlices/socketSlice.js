import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    isConnected: false,
    roomID: null,
  },
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setRoomID: (state, action) => {
      state.roomID = action.payload;
    },
  },
});

export const { setConnected, setRoomID } = socketSlice.actions;
export default socketSlice.reducer;
