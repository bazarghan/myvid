import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userHasRoom: false,
  user: {
    check: false,
    username: "",
    imageurl: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    room: "",
  },
  joinedRooms: [],
  url: "",
  isLoggedIn: false,
  preEmail: "",
  isEmailSent: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpLoad: (state) => {
      state.isLoading = true;
    },

    signUpSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.user.check = true;
      state.isLoggedIn = true;
    },

    signUpFailure: (state, action) => {
      state.error = action.payload;
    },

    loginLoad: (state) => {
      state.isLoading = true;
    },

    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.user.check = true;
      state.isLoading = false;
      state.isLoggedIn = true;
    },

    loginFailure: (state, action) => {
      state.error = action.payload;
    },

    logOutSuccess: (state) => {
      const newuser = {
        check: false,
        username: "",
        imageurl: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        room: "",
      };

      state.user = newuser;
      state.isLoggedIn = false;
    },

    logOutFailure: (state, action) => {
      state.error = action.payload;
    },

    loggedIn: (state) => {
      state.isLoggedIn = true;
    },

    loggedOut: (state) => {
      state.isLoggedIn = false;
    },

    emailSentSuccess: (state) => {
      state.isLoading = false;
      state.isEmailSent = true;
    },

    emailSentConfirmed: (state) => {
      state.isEmailSent = false;
      state.isLoggedIn = true;
      state.isLoading = false;
    },

    confirmLoad: (state) => {
      state.isLoading = true;
    },

    userLoad: (state) => {
      state.isLoading = true;
    },

    userSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.user.check = true;
      state.isLoggedIn = true;
    },

    userUpdateProfileLoad: (state) => {
      state.isLoading = true;
    },

    userUpdateProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.user.check = true;
    },

    userUpdateProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    preEmailSet: (state, action) => {
      state.preEmail = action.payload;
    },

    preEmailRemove: (state, action) => {
      state.preEmail = "";
    },

    joinedRoomsLoad: (state) => {
      state.isLoading = true;
    },

    joinedRoomsSuccess: (state, action) => {
      state.isLoading = false;
      state.joinedRooms = action.payload;
    },

    joinedRoomsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    leaveOrDeleteLoad: (state) => {
      state.isLoading = true;
    },

    leaveOrDeleteSuccess: (state, action) => {
      state.isLoading = false;
      state.joinedRooms = action.payload;
    },

    deleteUserRoom: (state) => {
      state.user.room = "";
    },
    leaveOrDeleteFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signUpLoad,
  signUpSuccess,
  signUpFailure,
  loginLoad,
  loginSuccess,
  loginFailure,
  logOutSuccess,
  logOutFailure,
  loggedIn,
  loggedOut,
  emailSentSuccess,
  emailSentConfirmed,
  confirmLoad,
  userLoad,
  userSuccess,
  userUpdateProfileLoad,
  userUpdateProfileSuccess,
  userUpdateProfileFailure,
  preEmailSet,
  preEmailRemove,
  joinedRoomsLoad,
  joinedRoomsSuccess,
  joinedRoomsFailure,
  leaveOrDeleteLoad,
  leaveOrDeleteSuccess,
  leaveOrDeleteFailure,
  deleteUserRoom,
} = userSlice.actions;

export default userSlice.reducer;
