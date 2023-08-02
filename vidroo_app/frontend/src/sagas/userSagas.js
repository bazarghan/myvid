import { put, takeLatest } from "redux-saga/effects";

import {
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
  joinedRoomsLoad,
  joinedRoomsSuccess,
  leaveOrDeleteLoad,
  leaveOrDeleteSuccess,
} from "../redux/userSlice";

import {
  login,
  signUp,
  signUpFinal,
  getUser,
  updateProfile,
  getJoinedRooms,
  leaveOrDeleteUser,
} from "../api/userApi";

function* handleLogin() {
  try {
    const isSuccessful = yield login();

    if (isSuccessful) {
      yield put(loggedIn());
      // yield put(userLoad());
    }
  } catch (error) {}
}

export function* watchLogin() {
  yield takeLatest(loginLoad.type, handleLogin);
}

function* handleSignUp() {
  try {
    const isSuccessful = yield signUp();
    if (isSuccessful === 201) {
      yield put(emailSentSuccess());
    }
  } catch (error) {}
}

export function* watchSignUp() {
  yield takeLatest(signUpLoad.type, handleSignUp);
}

function* handleConfirm() {
  try {
    const isSuccessful = yield signUpFinal();
    if (isSuccessful) {
      yield put(emailSentConfirmed());
    }
  } catch (error) {}
}

export function* watchConfirm() {
  yield takeLatest(confirmLoad.type, handleConfirm);
}

function* handleUserLoad() {
  try {
    const user = yield getUser();
    yield put(userSuccess(user));
  } catch (error) {}
}

export function* watchUserLoad() {
  yield takeLatest(userLoad.type, handleUserLoad);
}

function* handleUpdateProfileLoad() {
  try {
    const user = yield updateProfile();

    yield put(userUpdateProfileSuccess(user));
  } catch (error) {}
}

export function* watchUserProfileUpdateLoad() {
  yield takeLatest(userUpdateProfileLoad.type, handleUpdateProfileLoad);
}

function* handleJoinedRoomsLoad() {
  try {
    const joinedRooms = yield getJoinedRooms();

    yield put(joinedRoomsSuccess(joinedRooms));
  } catch (error) {}
}

export function* watchJoinedRoomsLoad() {
  yield takeLatest(joinedRoomsLoad.type, handleJoinedRoomsLoad);
}

function* handleLeaveOrDelete() {
  try {
    const joinedRooms = yield leaveOrDeleteUser();
    yield put(leaveOrDeleteSuccess(joinedRooms));
  } catch (error) {}
}

export function* watchLeaveOrDeleteLoad() {
  yield takeLatest(leaveOrDeleteLoad.type, handleLeaveOrDelete);
}
