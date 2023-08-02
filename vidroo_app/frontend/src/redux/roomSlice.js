import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  room: {
    name: "",
    key: "",
    roomusers: [],
  },
  error: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    createRoomLoad: (state) => {
      state.isLoading = true;
    },

    createRoomSuccess: (state, action) => {
      state.room = action.payload;
    },

    createRoomFaliure: (state, action) => {
      const newRoom = {
        name: "",
        key: "",
        roomusers: [],
        chat: [],
      };

      state.room = newRoom;
    },

    roomLoad: (state) => {
      state.isLoading = true;
    },

    roomSuccess: (state, action) => {
      state.isLoading = false;
      state.room = action.payload;
    },

    roomFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createRoomLoad,
  createRoomSuccess,
  createRoomFaliure,
  roomLoad,
  roomSuccess,
  roomFailure,
} = roomSlice.actions;

export default roomSlice.reducer;
