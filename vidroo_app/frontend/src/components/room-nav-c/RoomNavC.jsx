import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./RoomNavC.scss";

import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import AvatarC from "../avatar-c/AvatarC";
import BtnC from "../btn-c/BtnC";

import { leaveOrDeleteLoad, deleteUserRoom } from "../../redux/userSlice";

export const roomToleaveOrDeleteRoom = {
  key: "",
};
const RoomNavC = ({ roomKey }) => {
  const username = useSelector((state) => state.user.user.username);
  const imageurl = useSelector((state) => state.user.user.imageurl);
  const room = useSelector((state) => state.user.user.room);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickDelete = () => {
    roomToleaveOrDeleteRoom.key = roomKey;
    dispatch(leaveOrDeleteLoad());
    dispatch(deleteUserRoom());
    navigate("../panel", { replace: true });
    window.location.reload();
  };

  const handleClickLeave = () => {
    roomToleaveOrDeleteRoom.key = roomKey;
    dispatch(leaveOrDeleteLoad());
    navigate("../panel", { replace: true });
    window.location.reload();
  };

  return (
    <div className="room-nav-c">
      {roomKey === room ? (
        <BtnC
          primary
          exSmall
          className="room-nav-c__btn"
          onClick={handleClickDelete}
        >
          حذف اتاق
        </BtnC>
      ) : (
        <BtnC
          primary
          exSmall
          className="room-nav-c__btn"
          onClick={handleClickLeave}
        >
          خروج
        </BtnC>
      )}

      <div className="room-nav-c__container-1">
        <nav className="room-nav-c__nav">
          <ul className="room-nav-c__ul">
            <li className="room-nav-c__li">
              <RoomPreferencesIcon />

              <p className="room-nav-c__room-settings">تنظیمات اتاق</p>
            </li>

            <li className="room-nav-c__li">
              <HelpOutlineIcon />

              <p className="room-nav-c__help">کمک</p>
            </li>

            <li className="room-nav-c__li">
              <GroupAddIcon />

              <p className="room-nav-c__add-member">افزودن کاربر</p>
            </li>
          </ul>
        </nav>

        <div className="room-nav-c__user-container">
          <p className="room-nav-c__username">{username}</p>

          <div className="room-nav-c__avatar">
            <AvatarC alt="user avatar" src={imageurl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomNavC;
