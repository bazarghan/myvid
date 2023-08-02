import React, { useState } from "react";
import "./PopUpCreateRoomMainC.scss";

import CloseIcon from "@mui/icons-material/Close";

import PopUpC from "../pop-up-c/PopUpC";
import InputC from "../input-c/InputC";
import BtnC from "../btn-c/BtnC";

export const roomN = {
  name: "",
};

const PopUpCreateRoomMainC = ({ setCreateRoom, setNext, panelRef }) => {
  const [roomName, setRoomName] = useState("");

  const handleClickClose = () => {
    setCreateRoom(false);

    panelRef.current.style.filter = null;
  };

  const handleClickNext = () => {
    roomN.name = roomName;

    setCreateRoom(false);
    setNext(true);
  };

  return (
    <div className="pop-up-create-room-main-c">
      <PopUpC className="pop-up-create-room-main-c__pop-up">
        <div
          className="pop-up-create-room-main-c__close-icon-container"
          onClick={handleClickClose}
        >
          <CloseIcon />
        </div>

        <h1 className="pop-up-create-room-main-c__title">ایجاد اتاق</h1>

        <div className="pop-up-create-room-main-c__input-container-1">
          <InputC
            outlinedInput
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            required
          >
            لطفا نام اتاق را وارد کنید
          </InputC>
        </div>

        <BtnC
          primary
          className="pop-up-create-room-main-c__next-btn"
          onClick={handleClickNext}
        >
          بعدی
        </BtnC>
      </PopUpC>
    </div>
  );
};

export default PopUpCreateRoomMainC;
