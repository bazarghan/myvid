import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PopUpEnterRoomC.scss";

import CloseIcon from "@mui/icons-material/Close";

import PopUpC from "../pop-up-c/PopUpC";
import InputC from "../input-c/InputC";
import BtnC from "../btn-c/BtnC";

const PopUpEnterRoomC = ({ setEnterRoom }) => {
  const [roomKey, setRoomKey] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("../panel/room/" + roomKey + "/", { replace: false });
    setRoomKey("");
  };

  const handleChange = (e) => {
    setRoomKey(e.target.value);
  };

  return (
    <div className="pop-up-enter-room-c">
      <PopUpC className="pop-up-enter-room-c__pop-up">
        <div
          className="pop-up-enter-room-c__close"
          onClick={() => setEnterRoom(false)}
        >
          <CloseIcon />
        </div>

        <div className="pop-up-enter-room-c__title">ورود به اتاق</div>

        <div className="pop-up-enter-room-c__input-container">
          <InputC
            className="pop-up-enter-room-c__input"
            outlinedInput
            onChange={handleChange}
          >
            لطفا لینک اتاق مورد نظر خود را وارد نمایید
          </InputC>
        </div>

        <BtnC
          className="pop-up-enter-room-c__btn"
          primary
          onClick={handleClick}
        >
          ورود به اتاق
        </BtnC>
      </PopUpC>
    </div>
  );
};

export default PopUpEnterRoomC;
