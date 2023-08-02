import React from "react";
import { useSelector } from "react-redux";
import "./HandleRoomC.scss";

import HandleRoomItemC from "../handle-room-item-c/HandleRoomItemC";
import { Navigate, useNavigate } from "react-router-dom";

const HandleRoomC = ({
  className,
  confirmDelete,
  setConfirmDelete,
  roomToDelete,
  setRoomToDelete,
  confirmLeave,
  setConfirmLeave,
  enterRoom,
  setEnterRoom,
  createRoom,
  setCreateRoom,
  panelRef,
}) => {
  const navigate = useNavigate();
  const handleClickDeleteRoom = (key) => {
    if (confirmLeave) setConfirmLeave(false);
    setRoomToDelete(key);
    setConfirmDelete(true);
  };

  const handleClickLeaveRoom = (key) => {
    if (confirmDelete) setConfirmDelete(false);

    setRoomToDelete(key);
    setConfirmLeave(true);
  };

  const handleClickCreateRoom = () => {
    setCreateRoom(true);

    panelRef.current.style.filter = "blur(3px)";
  };

  const handleClickEnterRoom = (key) => {
    navigate("../panel/room/" + key + "/", { replace: false });
  };

  const handleClickEnterViaKey = (key) => {
    setEnterRoom(true);
  };

  const joinedRooms = useSelector((state) => state.user.joinedRooms);
  const myRoom = useSelector((state) => state.user.user.room);
  return (
    <div className={`handle-room-c ${className && className}`}>
      <div className="handle-room-c__container-1">
        {myRoom === "" && (
          <HandleRoomItemC create onClick={handleClickCreateRoom} />
        )}
        {joinedRooms.map((joinedRoom) => {
          if (joinedRoom.check) {
            return (
              <HandleRoomItemC
                admin
                create
                roomName={joinedRoom.name}
                memberNum={joinedRoom.memberNum}
                onClickDeleteRoom={() => {
                  handleClickDeleteRoom(joinedRoom.key);
                }}
                onClickEnterRoom={() => {
                  handleClickEnterRoom(joinedRoom.key);
                }}
              />
            );
          }
        })}

        <HandleRoomItemC enter onClick={handleClickEnterViaKey} />
      </div>

      <div className="handle-room-c__line"></div>

      <div className="handle-room-c__container-2">
        {joinedRooms.map((joinedRoom) => {
          if (!joinedRoom.check)
            return (
              <HandleRoomItemC
                room
                roomName={joinedRoom.name}
                memberNum={joinedRoom.memberNum}
                onClickLeaveRoom={() => {
                  handleClickLeaveRoom(joinedRoom.key);
                }}
                onClickEnterRoom={() => {
                  handleClickEnterRoom(joinedRoom.key);
                }}
              />
            );
        })}

        {/* <HandleRoomItemC room roomName="سلام" memberNum="2" />
        <HandleRoomItemC room roomName="سلام" memberNum="2" />
        <HandleRoomItemC room roomName="سلام" memberNum="2" />
        <HandleRoomItemC room roomName="سلام" memberNum="2" />
        <HandleRoomItemC room roomName="سلام" memberNum="2" /> */}
      </div>
    </div>
  );
};

export default HandleRoomC;
