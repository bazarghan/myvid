import React from "react";
import "./HandleRoomItemC.scss";

import BtnC from "../btn-c/BtnC";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoginIcon from "@mui/icons-material/Login";

const HandleRoomItemC = ({
  admin,
  create,
  enter,
  room,
  roomName,
  memberNum,
  onClick,
  onClickLeaveRoom,
  onClickEnterRoom,
  onClickDeleteRoom,
}) => {
  return (
    <div
      className={`handle-room-item-c ${
        create && "handle-room-item-c--create"
      } ${enter && "handle-room-item-c--enter"} ${
        room && "handle-room-item-c--room"
      }`}
      onClick={onClick}
    >
      {create && !admin && (
        <div className="handle-room-item-c__container-1">
          <div className="handle-room-item-c__create">ایجاد اتاق</div>
          <AddCircleOutlineIcon />
        </div>
      )}

      {create && admin && (
        <div className="handle-room-item-c__container-2">
          <div className="handle-room-item-c__admin-room-name">{roomName}</div>

          <div className="handle-room-item-c__container-2-1">
            <div className="handle-room-item-c__admin-member-num">
              تعداد اعضا:
            </div>
            <span className="handle-room-item-c__admin-number">
              {memberNum}
            </span>
          </div>

          <BtnC
            primary
            small
            className="handle-room-item-c__admin-btn-primary"
            onClick={onClickEnterRoom}
          >
            ورود به اتاق
          </BtnC>

          <BtnC
            secondary
            small
            className="handle-room-item-c__admin-btn"
            onClick={onClickDeleteRoom}
          >
            حذف اتاق
          </BtnC>
        </div>
      )}

      {enter && (
        <div className="handle-room-item-c__container-3">
          <div className="handle-room-item-c__enter">ورود به اتاق</div>

          <LoginIcon />
        </div>
      )}

      {room && (
        <div className="handle-room-item-c__container-4">
          <div className="handle-room-item-c__room-name">{roomName}</div>

          <div className="handle-room-item-c__container-4-1">
            <div className="handle-room-item-c__member-num">تعداد اعضا:</div>
            <span className="handle-room-item-c__number">{memberNum}</span>
          </div>

          <BtnC
            primary
            small
            className="handle-room-item-c__btn"
            onClick={onClickEnterRoom}
          >
            ورود به اتاق
          </BtnC>

          <BtnC
            secondary
            small
            className="handle-room-item-c__btn"
            onClick={onClickLeaveRoom}
          >
            خروج از اتاق
          </BtnC>
        </div>
      )}
    </div>
  );
};

export default HandleRoomItemC;
