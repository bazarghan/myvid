import React from "react";
import { useSelector } from "react-redux";
import "./PopUpRoomC.scss";

import PopUpC from "../pop-up-c/PopUpC";
import InputC from "../input-c/InputC";
import BtnC from "../btn-c/BtnC";

const PopUpRoomC = ({ setPopUp, roomRef }) => {
  const room = useSelector((state) => state.room.room);

  const handleClick = () => {
    roomRef.current.style.filter = null;

    setPopUp(false);
  };

  return (
    <div className="pop-up-room-c">
      <PopUpC className="pop-up-room-c__pop-up">
        <div className="pop-up-room-c__container-1">
          <span className="pop-up-room__span">اتاق</span>
          <div className="pop-up-room-c__room-name">{room.name}</div>
          <span className="pop-up-room__span">با موفقیت ساخته شد</span>
        </div>

        <div className="pop-up-room-c__input-container">
          <InputC
            dir="ltr"
            outlinedInput
            className="pop-up-room-c__input"
            value={
              "http://" + window.location.host + "/panel/room/" + room.key + "/"
            }
          >
            لطفا از این لینک برای دعوت دوستان خود استفاده کنید
          </InputC>
        </div>

        <BtnC primary className="pop-up-room-c__btn" onClick={handleClick}>
          بزن بریم !
        </BtnC>
      </PopUpC>
    </div>
  );
};

export default PopUpRoomC;
