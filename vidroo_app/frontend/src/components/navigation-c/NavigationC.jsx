import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./NavigationC.scss";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import AvatarC from "../avatar-c/AvatarC";
import PanelDropDownNavC from "../panel-drop-down-nav-c/PanelDropDownNavC";

const NavigationC = () => {
  const [dropDown, setDropDown] = useState(false);

  const user = useSelector((state) => state.user.user);

  const handleClick = () => {
    if (dropDown) setDropDown(false);
    else setDropDown(true);
  };

  return (
    <div className="navigation-c">
      <div className="navigation-c__brand">Moviero</div>

      <div className="navigation-c__container-1" onClick={handleClick}>
        <div className="navigation-c__username">{user.username}</div>
        <div className="navigation-c__avatar">
          <AvatarC alt="user avatar" src={user.imageurl} />
        </div>

        <div className="navigation-c__drop-down">
          <ArrowDropDownIcon />
        </div>
      </div>

      {dropDown ? <PanelDropDownNavC /> : null}
    </div>
  );
};

export default NavigationC;
