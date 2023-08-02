import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileC.scss";

import { Avatar } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import InputFileC from "../input-file-c/InputFileC";
import InputC from "../input-c/InputC";
import BtnC from "../btn-c/BtnC";

import { userUpdateProfileLoad } from "../../redux/userSlice"

export const userUpdateCredentials = {
  myform : "",
}
let check = false;
const ProfileC = ({ className }) => {
  const user = useSelector(state => state.user.user)
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [phone, setPhone] = useState(user.phone);
  if(user.check &&  !check){
    setFirstname(user.firstname)
    setLastname(user.lastname)
    setPhone(user.phone)
    check = true;
  }




  const inputRef = React.createRef()

  const dispatch = useDispatch()

 

  const handleSubmit = () => {
    const mydata = {
      "firstname":firstname,
      "lastname":lastname,
      "phone":phone,
    }
    let formdata = new FormData()
    let myfile = inputRef.current.files[0]
    formdata.append("body",JSON.stringify(mydata))
    formdata.append("profileimage",myfile)
    userUpdateCredentials.myform=formdata
    dispatch(userUpdateProfileLoad())
  }

  return (
    <div className={`profile-c ${className}`}>
      <div className="profile-c__container-1">
        <Avatar atl="user avatar" src={user.imageurl} />

        <InputFileC svg={<AddAPhotoIcon />} ref={inputRef}>اضافه کردن تصویر</InputFileC>
      </div>

      <div className="profile-c__container-2">
        <InputC outlinedInput className="profile-c__input" onChange={e => setFirstname(e.target.value)} value={firstname}>
          نام
        </InputC>
        <InputC outlinedInput className="profile-c__input" onChange={e => setLastname(e.target.value)} value = {lastname}>
          نام خانوادگی
        </InputC>
      </div>

      <div className="profile-c__container-3">
        <InputC outlinedInput dir="ltr" className="profile-c__input-long" value={user.email}>
          ایمیل
        </InputC>
      </div>

      <div className="profile-c__container-4">
        <InputC outlinedInput dir="ltr" className="profile-c__input" value={user.username}>
          نام کاربری
        </InputC>
        <InputC outlinedInput dir="ltr" className="profile-c__input" onChange={e => setPhone(e.target.value)} value={phone}>
          شماره موبایل
        </InputC>
      </div>

      <BtnC primary className="profile-c__btn" onClick={handleSubmit}>
        ذخیره
      </BtnC>
    </div>
  );
};

export default ProfileC;
