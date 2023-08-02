import React from "react";
import "./SettingsC.scss";

import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";

import SettingsItemC from "../settings-item-c/SettingsItemC";

const SettingsC = ({ className }) => {
  return (
    <div className={`settings-c ${className}`}>
      <div className="settings-c__container-1">
        <SettingsItemC svg={<RoomPreferencesIcon />} active>
          تنظیمات اتاق
        </SettingsItemC>

        <SettingsItemC svg={<VideoSettingsIcon />}>تنظیمات ویدیو</SettingsItemC>

        <p className="settings-c__coming-soon-1">به زودی...</p>
      </div>

      <div className="settings-c__container-2">
        <div className="settings-c__container-2-1">تنظیمات اتاق</div>

        <div className="settings-c__container-2-2">
          <SettingsItemC toggle>
            دسترسی کنترل ویدیو به همه اعضا داده شود ؟
          </SettingsItemC>

          <SettingsItemC toggle>
            دسترسی میکروفون به همه اعضا داده شود ؟
          </SettingsItemC>

          <SettingsItemC toggle>دسترسی چت به همه اعضا داده شود ؟</SettingsItemC>

          <p className="settings-c__coming-soon-2"> به زودی ...</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsC;
