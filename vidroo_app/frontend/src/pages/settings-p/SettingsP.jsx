import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "./SettingsP.scss";

import NavigationC from "../../components/navigation-c/NavigationC";
import SettingsC from "../../components/settings-c/SettingsC";

const SettingsP = () => {
  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="settings-p">
      {!userIsLoggedIn && <Navigate to="/" replace={true} />}

      <NavigationC />
      <SettingsC className="settings-p__settings" />
    </div>
  );
};

export default SettingsP;
