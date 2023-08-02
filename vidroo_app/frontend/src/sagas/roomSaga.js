import { put, takeLatest } from "redux-saga/effects";
import { createRoom, loadRoom } from "../api/roomApi";
import {
  createRoomLoad,
  createRoomSuccess,
  createRoomFaliure,
  roomLoad,
  roomSuccess,
  roomFailure,
} from "../redux/roomSlice";

function* handleCreateRoomLoad() {
  try {
    const room = yield createRoom();

    yield put(createRoomSuccess(room));
  } catch (error) {}
}

export function* watchCreateRoomLoad() {
  yield takeLatest(createRoomLoad.type, handleCreateRoomLoad);
}

function* handleRoomLoad() {
  try {
    const room = yield loadRoom();

    if (room) yield put(roomSuccess(room));
  } catch (error) {}
}

export function* watchRoomLoad() {
  yield takeLatest(roomLoad.type, handleRoomLoad);
}
