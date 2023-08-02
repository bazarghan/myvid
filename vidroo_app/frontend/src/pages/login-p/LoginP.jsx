import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./LoginP.scss";
import { useNavigate, Navigate } from "react-router-dom";
import LoginC from "../../components/login-c/LoginC";

const LoginP = () => {
  let navigate = useNavigate();
  // useEffect(() => {
  //   let check = localStorage.getItem("user");

  //   if (check) {
  //     navigate("../panel", { replace: true });
  //   }
  // }, []);

  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="login-p">
      {userIsLoggedIn && <Navigate to="/panel" replace={true} />}

      <div className="login-p__container-1">
        <div className="login-p__overlay">
          <div className="login-p__brand">Moviero</div>

          <div className="login-p__container-1-1">
            <LoginC />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginP;
