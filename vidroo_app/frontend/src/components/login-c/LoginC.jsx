import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./LoginC.scss";

import InputC from "../input-c/InputC";
import InputCheckboxC from "../input-checkbox-c/InputCheckboxC";
import BtnC from "../btn-c/BtnC";

import { loginLoad } from "../../redux/userSlice";

export const userCredentials = {
  email: "",
  password: "",
};

const LoginC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();

  const handleSubmit = () => {
       
    userCredentials.email = email;
    userCredentials.password = password;
    dispatch(loginLoad());
  };

  return (
    <div className="login-c">
      <h1 className="login-c__login">ورود</h1>

      <div className="login-c__input-container-1">
        <InputC
          onChange={(e) => setEmail(e.target.value)}
          underlinedInput
          type="email"
          dir="ltr"
          value={email}
          required
        >
          ایمیل
        </InputC>
      </div>

      <div className="login-c__container-1">
        <InputC
          onChange={(e) => setPassword(e.target.value)}
          underlinedInput
          type="password"
          dir="ltr"
          value={password}
          required
        >
          رمز عبور
        </InputC>

        <div className="login-c__container-1-1">
          <div className="login-c__container-1-1-1">
            <InputCheckboxC />
            <p className="login-c__show-password">نمایش رمز عبور</p>
          </div>

          <p className="login-c__forget-password">
            رمز عبور خود را فراموش کرده اید؟
          </p>
        </div>
      </div>

      <BtnC onClick={handleSubmit} className="login-c__btn" primary>
        ورود
      </BtnC>

      <div className="login-c__container-2">
        <p className="login-c__sign-up-txt">هنوز ثبت نام نکرده اید ؟</p>
        <p className="login-c__sign-up-link">ایجاد حساب کاربری</p>
      </div>
    </div>
  );
};

export default LoginC;
