import React from "react";
import "./ReqNotificationC.scss";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";

import BtnC from "../btn-c/BtnC";

const ReqNotificationC = ({
  children,
  title,
  username,
  onClickConfirm,
  onClickReject,
  className,
}) => {
  return (
    <div className={`req-notification-c ${className && className}`}>
      <div className="req-notification-c__container-1">
        <div className="req-notification-c__container-1-1">
          <NotificationsActiveIcon />
          <div className="req-notification-c__title">{title}</div>
        </div>

        <CloseIcon />
      </div>

      <div className="req-notification-c__container-2">
        <span className="req-notification-c__username">{username}</span>

        <p className="req-notification-c__txt">{children}</p>
      </div>

      <div className="req-notification-c__container-3">
        <BtnC
          primary
          exSmall
          onClick={onClickConfirm}
          className="req-notification-c__btn-1"
        >
          تایید
        </BtnC>

        <BtnC
          secondary
          exSmall
          onClick={onClickReject}
          className="req-notification-c__btn-2"
        >
          رد
        </BtnC>
      </div>
    </div>
  );
};

export default ReqNotificationC;
