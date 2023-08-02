import React from "react";
import "./AvatarBoxC.scss";

import AvatarC from "../avatar-c/AvatarC";

const AvatarBoxC = ({
  children,
  src,
  admin,
  online,
  offline,
  ...otherProps
}) => {
  return (
    <div className="avatar-box-c" {...otherProps}>
      {online && <AvatarC alt="user avatar" src={src} online />}

      {offline && <AvatarC alt="user avatar" src={src} offline />}

      {!online && !offline && <AvatarC alt="user avatar" src={src} />}

      <div
        className={`avatar-box-c__username ${
          admin ? "avatar-box-c__username--admin" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AvatarBoxC;
