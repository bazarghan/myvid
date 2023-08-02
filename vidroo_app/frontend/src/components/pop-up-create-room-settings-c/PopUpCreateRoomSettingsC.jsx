import React from "react";
import { useDispatch } from "react-redux";
import "./PopUpCreateRoomSettingsC.scss";

import CloseIcon from "@mui/icons-material/Close";

import PopUpC from "../pop-up-c/PopUpC";
import AnnounceC from "../announce-c/AnnounceC";
import SettingsItemC from "../settings-item-c/SettingsItemC";
import BtnC from "../btn-c/BtnC";

import { createRoomLoad } from "../../redux/roomSlice";

const PopUpCreateRoomSettingsC = ({ setNext, panelRef }) => {
  const dispatch = useDispatch();

  const handleClickClose = () => {
    setNext(false);
    
    panelRef.current.style.filter = null;
  };

  const handleSubmit = () => {
    dispatch(createRoomLoad());
  }

  return (
    <div className="pop-up-create-room-settings-c">
      <PopUpC>
        <div
          className="pop-up-create-room-settings-c__close-icon-container"
          onClick={handleClickClose}
        >
          <CloseIcon />
        </div>

        <div className="pop-up-create-room-settings-c__title">تنظیمات اتاق</div>

        <div className="pop-up-create-room-settings-c__container-1">
          <AnnounceC>
            برای دادن دسترسی به یک فرد خاص می توانید روی آواتر فرد کلیک کنید
          </AnnounceC>

          <AnnounceC>
            می توانید از قسمت تنظیمات اتاق پیش فرض این تنظیمات را تغییر دهید
          </AnnounceC>
        </div>

        <div className="pop-up-create-room-settings-c__container-2">
          <SettingsItemC toggle>
            دسترسی کنترل ویدیو به همه اعضا داده شود ؟
          </SettingsItemC>

          <SettingsItemC toggle>
            دسترسی میکروفون به همه اعضا داده شود ؟
          </SettingsItemC>

          <SettingsItemC toggle noBorder>
            دسترسی چت به همه اعضا داده شود ؟
          </SettingsItemC>
        </div>

        <BtnC primary className="pop-up-create-room-settings-c__btn" onClick={handleSubmit}>
          ایجاد اتاق
        </BtnC>
      </PopUpC>
    </div>
  );
};

export default PopUpCreateRoomSettingsC;
