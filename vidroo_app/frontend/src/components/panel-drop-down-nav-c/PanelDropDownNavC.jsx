import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./PanelDropDownNavC.scss";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";

import { logOutSuccess } from "../../redux/userSlice";

const PanelDropDownNavC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("user");
    dispatch(logOutSuccess());
    navigate("../", { replace: true });
  };

  return (
    <nav className="panel-drop-down-nav-c">
      <ul className="panel-drop-down-nav-c__nav-container">
        <li className="panel-drop-down-nav-c__profile-li">
          <Link
            to="/panel/profile"
            className="panel-drop-down-nav-c__profile-container"
          >
            <PersonOutlineIcon />
            <div className="panel-drop-down-nav-c__profile">پروفایل</div>
          </Link>
        </li>

        <span className="panel-drop-down-nav-c__line"></span>

        <li className="panel-drop-down-nav-c__settings-li">
          <Link
            to="/panel/settings"
            className="panel-drop-down-nav-c__settings-container"
          >
            <SettingsIcon />
            <div className="panel-drop-down-nav-c__profile">تنظیمات</div>
          </Link>
        </li>

        <span className="panel-drop-down-nav-c__line"></span>

        <li className="panel-drop-down-nav-c__help-li">
          <Link
            to="/panel/halp"
            className="panel-drop-down-nav-c__help-container"
          >
            <HelpOutlineIcon />
            <div className="panel-drop-down-nav-c__profile">کمک</div>
          </Link>
        </li>

        <span className="panel-drop-down-nav-c__line"></span>

        <li
          className="panel-drop-down-nav-c__log-out-container"
          onClick={handleClick}
        >
          <LogoutIcon />
          <div className="panel-drop-down-nav-c__profile">خروج</div>
        </li>
      </ul>
    </nav>
  );
};

export default PanelDropDownNavC;
