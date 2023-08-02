import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./SignUpC.scss";

import useUpdateEffect from "../../hooks/useUpdateEffect";
import axios from "../../api/axios";

import InputC from "../input-c/InputC";
import InputCheckboxC from "../input-checkbox-c/InputCheckboxC";
import BtnC from "../btn-c/BtnC";

import { signUpLoad, preEmailSet } from "../../redux/userSlice";

export const userSignUpCredentials = {
  username: "",
  email: "",
  password: "",
};

const SignUpC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [inputErrorUsername, setInputErrorUsername] = useState(false);
  const [inputErrorEmail, setInputErrorEmail] = useState(false);
  const [inputErrorPassword, setInputErrorPassword] = useState(false);
  const [inputErrorPasswordRepeat, setInputErrorPasswordRepeat] =
    useState(false);
  const [usernameCheck, setUsernameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const dispatch = useDispatch();

  if (
    btnDisabled &&
    username !== "" &&
    email !== "" &&
    password !== "" &&
    passwordRepeat.length === password.length &&
    !inputErrorUsername &&
    !inputErrorEmail &&
    !inputErrorPassword &&
    !inputErrorPasswordRepeat
  ) {
    setBtnDisabled(false);
  }

  if (password.length >= 8 && inputErrorPassword) setInputErrorPassword(false);
  if (password === passwordRepeat && inputErrorPasswordRepeat)
    setInputErrorPasswordRepeat(false);

  const handleBlurUsername = () => {
    if (username !== "") {
      setUsernameCheck(!usernameCheck);
    }
  };

  useUpdateEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "api/validator/username/" + username + "/"
      );

      if (response && response.data.status !== 200) setInputErrorUsername(true);
      else setInputErrorUsername(false);
    };

    fetchData().catch(console.error);
  }, [usernameCheck]);

  const handleBlurEmail = () => {
    if (email !== "") {
      setEmailCheck(!emailCheck);
    }
  };

  useUpdateEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("api/validator/email/" + email + "/");

      if (response && response.data.status !== 200) setInputErrorEmail(true);
      else setInputErrorEmail(false);
    };

    fetchData().catch(console.error);
  }, [emailCheck]);

  const handleBlurPassword = () => {
    if (password.length < 8) setInputErrorPassword(true);
  };

  const handleBlurPasswordRepeat = () => {
    if (password !== passwordRepeat) setInputErrorPasswordRepeat(true);
  };

  const handleSubmit = () => {
    dispatch(preEmailSet(email));

    if (password !== passwordRepeat) setInputErrorPasswordRepeat(true);

    userSignUpCredentials.username = username;
    userSignUpCredentials.email = email;
    userSignUpCredentials.password = password;

    dispatch(signUpLoad());
  };

  return (
    <div className="sign-up-c">
      <h1 className="sign-up-c__sign-up">ثبت نام</h1>

      <div className="sign-up-c__input-container-1">
        {inputErrorUsername ? (
          <InputC
            dir="ltr"
            type="text"
            underlinedInput
            error="این نام کاربری قبلا استفاده شده است"
            className="sign-up-c__input hi"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onBlur={handleBlurUsername}
          >
            نام کاربری
          </InputC>
        ) : (
          <InputC
            dir="ltr"
            type="text"
            underlinedInput
            className="sign-up-c__input hi"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onBlur={handleBlurUsername}
          >
            نام کاربری
          </InputC>
        )}
      </div>

      <div className="sign-up-c__input-container-2">
        {inputErrorEmail ? (
          <InputC
            dir="ltr"
            type="email"
            underlinedInput
            error="این ایمیل قبلا استفاده شده است"
            className="sign-up-c__input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onBlur={handleBlurEmail}
          >
            ایمیل
          </InputC>
        ) : (
          <InputC
            dir="ltr"
            type="email"
            underlinedInput
            className="sign-up-c__input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onBlur={handleBlurEmail}
          >
            ایمیل
          </InputC>
        )}
      </div>

      <div className="sign-up-c__container-1">
        <div className="sign-up-c__input-container-3">
          {inputErrorPassword ? (
            <InputC
              dir="ltr"
              type="password"
              underlinedInput
              error="رمز عبور حداقل باید از 8 کاراکتر تشکیل شده باشد"
              className="sign-up-c__input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onBlur={handleBlurPassword}
            >
              رمز عبور
            </InputC>
          ) : (
            <InputC
              dir="ltr"
              type="password"
              underlinedInput
              className="sign-up-c__input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onBlur={handleBlurPassword}
            >
              رمز عبور
            </InputC>
          )}
        </div>

        <div className="sign-up-c__container-1-1">
          <InputCheckboxC />
          <p className="sign-up-c__show-password">نمایش رمز عبور</p>
        </div>
      </div>

      <div className="sign-up-c__input-container-4">
        {inputErrorPasswordRepeat ? (
          <InputC
            type="password"
            dir="ltr"
            underlinedInput
            error="عدم تطابق رمز عبور های وارد شده"
            className="sign-up-c__input"
            onChange={(e) => setPasswordRepeat(e.target.value)}
            value={passwordRepeat}
            onBlur={handleBlurPasswordRepeat}
          >
            تکرار رمز عبور
          </InputC>
        ) : (
          <InputC
            type="password"
            dir="ltr"
            underlinedInput
            className="sign-up-c__input"
            onChange={(e) => setPasswordRepeat(e.target.value)}
            value={passwordRepeat}
            onBlur={handleBlurPasswordRepeat}
          >
            تکرار رمز عبور
          </InputC>
        )}
      </div>

      {btnDisabled ? (
        <BtnC
          primary
          disabled
          className="sign-up-c__btn"
          onClick={handleSubmit}
        >
          ثبت نام
        </BtnC>
      ) : (
        <BtnC primary className="sign-up-c__btn" onClick={handleSubmit}>
          ثبت نام
        </BtnC>
      )}

      <div className="sign-up-c__container-2">
        <p className="sign-up-c__login-txt-1">قبلا ثبت نام کرده اید؟</p>
        <p className="sign-up-c__login-txt-2">ورود به حساب کاربری</p>
      </div>
    </div>
  );
};

export default SignUpC;
