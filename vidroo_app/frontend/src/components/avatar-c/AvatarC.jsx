import { spacing } from "@mui/system";
import React from "react";
import "./AvatarC.scss";

const AvatarC = ({ alt, src, online, offline, className }) => {
  return (
    <div className={`avatar-c ${className && className}`}>
      <img className="avatar-c__img" alt={alt} src={src} />
      {online && <span className="avatar-c--online"></span>}
      {offline && <span className="avatar-c--offline"></span>}
    </div>
  );
};

export default AvatarC;
