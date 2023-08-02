import React from "react";
import "./PopUpRoomConfirmC.scss";

import PopUpC from "../pop-up-c/PopUpC";
import ConfirmNotificationC from "../confirm-notification-c/ConfirmNotificationC";

const PopUpRoomConfirmC = ({ children, onClickNo, onClickYes }) => {
  return (
    <div className="pop-up-room-confirm-c">
      <PopUpC className="pop-up-room-confirm-c__pop-up" cleared>
        <ConfirmNotificationC
          className="handle-room-c__confirm-notification"
          onClickNo={onClickNo}
          onClickYes={onClickYes}
        >
          {children}
        </ConfirmNotificationC>
      </PopUpC>
    </div>
  );
};

export default PopUpRoomConfirmC;
