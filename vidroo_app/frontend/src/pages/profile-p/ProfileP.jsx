import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import "./ProfileP.scss";

import NavigationC from "../../components/navigation-c/NavigationC";
import ProfileC from "../../components/profile-c/ProfileC";

const ProfileP = () => {
  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="profile-p">
      {!userIsLoggedIn && <Navigate to="/" replace={true} />}

      <NavigationC />
      <ProfileC className="profile-p__profile" />
    </div>
  );
};

export default ProfileP;
