import React from "react";
import "./SettingsItemC.scss";

import { Switch } from "@mui/material";

const SettingsItemC = ({
  children,
  active,
  svg,
  toggle,
  noBorder,
  className,
}) => {
  return (
    <div
      className={`settings-item-c ${active ? "settings-item-c--active" : ""} ${
        toggle ? "settings-item-c--toggle" : ""
      } ${noBorder ? "settings-item-c--no-border" : ""} ${className}`}
    >
      <div className="settings-item-c__container-1">
        {svg}
        <div className="settings-item-c__txt">{children}</div>
      </div>

      {toggle ? <Switch /> : null}
    </div>
  );
};

export default SettingsItemC;
