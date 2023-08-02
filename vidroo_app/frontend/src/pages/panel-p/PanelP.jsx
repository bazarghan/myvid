import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./PanelP.scss";

import CloseIcon from "@mui/icons-material/Close";

import NavigationC from "../../components/navigation-c/NavigationC";
import AnnounceC from "../../components/announce-c/AnnounceC";
import BtnC from "../../components/btn-c/BtnC";
import PopUpCreateRoomMainC from "../../components/pop-up-create-room-main-c/PopUpCreateRoomMainC";
import PopUpCreateRoomSettingsC from "../../components/pop-up-create-room-settings-c/PopUpCreateRoomSettingsC";
import PanelDropDownNavC from "../../components/panel-drop-down-nav-c/PanelDropDownNavC";
import HandleRoomC from "../../components/handle-room-c/HandleRoomC";
import PopUpEnterRoomC from "../../components/pop-up-enter-room-c/PopUpEnterRoomC";
import PopUpRoomConfirmC from "../../components/pop-up-room-confirm/PopUpRoomConfirmC";

import {
  joinedRoomsLoad,
  leaveOrDeleteLoad,
  deleteUserRoom,
} from "../../redux/userSlice";

export const roomToleaveOrDeletePanel = {
  key: "",
};
const PanelP = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState("");
  const [enterRoom, setEnterRoom] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const [next, setNext] = useState(false);

  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const room = useSelector((state) => state.user.user.room);

  const panelRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(joinedRoomsLoad());
  }, []);

  const handleClickNo = () => {
    if (confirmDelete) setConfirmDelete(false);
    if (confirmLeave) setConfirmLeave(false);
  };

  const handleClickYesLeave = () => {
    roomToleaveOrDeletePanel.key = roomToDelete;

    dispatch(leaveOrDeleteLoad());
    if (confirmLeave) setConfirmLeave(false);
  };

  const handleClickYesDelete = () => {
    roomToleaveOrDeletePanel.key = roomToDelete;

    dispatch(leaveOrDeleteLoad());
    dispatch(deleteUserRoom());
    if (confirmDelete) setConfirmDelete(false);
  };

  return (
    <div className="panel-p">
      {!isUserLoggedIn && <Navigate to="/" replace={true} />}

      {createRoom ? (
        <PopUpCreateRoomMainC
          setCreateRoom={setCreateRoom}
          setNext={setNext}
          panelRef={panelRef}
        />
      ) : null}

      {next ? (
        <PopUpCreateRoomSettingsC setNext={setNext} panelRef={panelRef} />
      ) : null}

      {confirmDelete && (
        <PopUpRoomConfirmC
          className="handle-room-c__confirm-notification"
          onClickNo={handleClickNo}
          onClickYes={handleClickYesDelete}
        >
          آیا می خواهید این اتاق را حذف کنید ؟
        </PopUpRoomConfirmC>
      )}

      {confirmLeave && (
        <PopUpRoomConfirmC
          className="handle-room-c__confirm-notification"
          onClickNo={handleClickNo}
          onClickYes={handleClickYesLeave}
        >
          آیا می خواهید از این اتاق خارج شوید
        </PopUpRoomConfirmC>
      )}

      {enterRoom && <PopUpEnterRoomC setEnterRoom={setEnterRoom} />}

      <div className="panel-p__container-1" ref={panelRef}>
        <NavigationC />

        <div className="panel-p__announce-container">
          <AnnounceC slider className="panel-p__announce">
            با کپی کردن لینک دانلود مستقیم هر ویدیویی می تونی بدون دانلود کردن
            تماشاش کنی !
          </AnnounceC>
        </div>

        <HandleRoomC
          className="panel-p__handle-room"
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          roomToDelete={roomToDelete}
          setRoomToDelete={setRoomToDelete}
          confirmLeave={confirmLeave}
          setConfirmLeave={setConfirmLeave}
          enterRoom={enterRoom}
          setEnterRoom={setEnterRoom}
          createRoom={createRoom}
          setCreateRoom={setCreateRoom}
          panelRef={panelRef}
        />
      </div>
    </div>
  );
};

export default PanelP;
