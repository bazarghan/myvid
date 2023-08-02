import { all } from "redux-saga/effects";

import {
  watchLogin,
  watchSignUp,
  watchConfirm,
  watchUserLoad,
  watchUserProfileUpdateLoad,
  watchJoinedRoomsLoad,
  watchLeaveOrDeleteLoad,
} from "./userSagas";

import { watchCreateRoomLoad, watchRoomLoad } from "./roomSaga";

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignUp(),
    watchConfirm(),
    watchUserLoad(),
    watchUserProfileUpdateLoad(),
    watchCreateRoomLoad(),
    watchRoomLoad(),
    watchJoinedRoomsLoad(),
    watchLeaveOrDeleteLoad(),
  ]);
}
