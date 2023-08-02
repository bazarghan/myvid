import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ConfirmP.scss";

import ConfirmC from "../../components/confirm-c/ConfirmC";

const ConfirmP = () => {
  const isEmailSent = useSelector((state) => state.user.isEmailSent);
  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // let navigate = useNavigate();
  // useEffect(() => {
  //   let check = localStorage.getItem("user");

  //   if (check) {
  //     navigate("../panel", { replace: true });
  //   }
  // }, []);
  return (
    <div className="confirm-p">
      {userIsLoggedIn && <Navigate to="/panel" replace={true} />}
      {!isEmailSent && <Navigate to="/sign-up" replace={true} />}
      <div className="confirm-p__brand">Moviero</div>

      <ConfirmC />
    </div>
  );
};

export default ConfirmP;
