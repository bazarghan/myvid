import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import LandingP from "./pages/landing-p/LandingP";
import SignUpP from "./pages/sign-up-p/SignUpP";
import LoginP from "./pages/login-p/LoginP";
import ConfirmP from "./pages/confirm-p/ConfirmP";
import PanelP from "./pages/panel-p/PanelP";
import ProfileP from "./pages/profile-p/ProfileP";
import SettingsP from "./pages/settings-p/SettingsP";
import RoomP from "./pages/room-p/RoomP";
import WaitingP from "./pages/waiting-p/WaitingP";

import useBeforeRender from "./hooks/useBeforeRender";
import { loggedIn, userLoad } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useBeforeRender(() => {
    let check = localStorage.getItem("user");
    if (check) {
      dispatch(loggedIn());
    }
  });

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(userLoad());
    }
  }, [isLoggedIn]);

  return (
    <div className="app">
      <Routes>
        <Route path="/sign-up" element={<SignUpP />} />
        <Route path="/" element={<LandingP />} />
        <Route path="/login" element={<LoginP />} />
        <Route path="/confirm" element={<ConfirmP />} />

        <Route path="/panel" element={<PanelP />} />

        <Route path="/panel/profile" element={<ProfileP />} />
        <Route path="/panel/settings" element={<SettingsP />} />
        <Route path="/panel/room" element={<RoomP />} />
        <Route path="/panel/room/:key" element={<RoomP />} />

        <Route path="/join-room/:key" element={<WaitingP />} />
      </Routes>
    </div>
  );
}

export default App;
