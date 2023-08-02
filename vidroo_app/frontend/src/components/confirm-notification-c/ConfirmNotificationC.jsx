import React from "react";
import "./ConfirmNotificationC.scss";

import BtnC from "../btn-c/BtnC";

const ConfirmNotificationC = ({
  className,
  children,
  onClickYes,
  onClickNo,
}) => {
  return (
    <div className={`confirm-notification-c ${className && className}`}>
      <div className="confirm-notification-c__title">{children}</div>
      <div className="confirm-notification-c__container-1">
        <BtnC
          primary
          exSmall
          className="confirm-notification-c__btn-1"
          onClick={onClickYes}
        >
          بله
        </BtnC>

        <BtnC
          secondary
          exSmall
          className="confirm-notification-c__btn-2"
          onClick={onClickNo}
        >
          خیر
        </BtnC>
      </div>
    </div>
  );
};

export default ConfirmNotificationC;
