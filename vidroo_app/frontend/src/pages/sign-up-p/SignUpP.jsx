import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./SignUpP.scss";

import SignUpC from "../../components/sign-up-c/SignUpC";

const SignUpP = () => {
  const isEmailSent = useSelector((state) => state.user.isEmailSent);
  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="sign-up-p">
      {userIsLoggedIn && <Navigate to="/panel" replace={true} />}
      {isEmailSent && <Navigate to="/confirm" replace={true} />}
      <div className="sign-up-p__container-1">
        <div className="sign-up-p__overlay">
          <SignUpC />
        </div>
      </div>
    </div>
  );
};

export default SignUpP;
