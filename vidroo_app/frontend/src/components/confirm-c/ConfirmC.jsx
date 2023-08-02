import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConfirmC.scss";

import InputC from "../input-c/InputC";
import BtnC from "../btn-c/BtnC";

import { confirmLoad } from "../../redux/userSlice";

export const userConfirmationCredentials = {
  confirmCode: "",
};

const ConfirmC = () => {
  const [confirmCode, setConfirmCode] = useState("");

  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.preEmail);

  const handleSubmit = () => {
    userConfirmationCredentials.confirmCode = confirmCode;

    dispatch(confirmLoad());
  };

  return (
    <div className="confirm-c">
      <h1 className="confirm-c__confirm">وارد کردن کد تایید</h1>

      <div className="confirm-c__container-1">
        <p className="confirm-c__txt-1">کد تایید به</p>
        <p className="confirm-c__txt-2">{email}</p>
        <p className="confirm-c__txt-3">ارسال گردید</p>
        <p className="confirm-c__txt-4">
          لطفا برای ثبت نام کد تایید را وارد نمایید
        </p>
      </div>

      <div className="confirm-c__input-container">
        <InputC
          className="confirm-c__input"
          underlinedInput
          dir="ltr"
          type="text"
          onChange={(e) => setConfirmCode(e.target.value)}
          value={confirmCode}
          required
        >
          کد تایید
        </InputC>
      </div>

      <BtnC className="confirm-c__btn" primary onClick={handleSubmit}>
        ثبت نام
      </BtnC>
    </div>
  );
};

export default ConfirmC;
