import axios from "./axios";
import { post, get, del } from "../utils/httpResquest";
import { userCredentials } from "../components/login-c/LoginC";
import { userSignUpCredentials } from "../components/sign-up-c/SignUpC";
import { userConfirmationCredentials } from "../components/confirm-c/ConfirmC";
import { userUpdateCredentials } from "../components/profile-c/ProfileC";
import { roomToleaveOrDeletePanel } from "../pages/panel-p/PanelP";
import { roomToleaveOrDeleteRoom } from "../components/room-nav-c/RoomNavC";
import { domain } from "../constants/constant";
const headers = {
  "Content-Type": "application/json",
};

export const login = async () => {
  const data = {
    username: userCredentials.email,
    password: userCredentials.password,
  };

  try {
    const response = await axios.post("api/login/", JSON.stringify(data), {
      headers,
      withCredentials: true,
    });

    if (response.data && response.data.status === 200) {
      const user = {
        accesstoken: response.data.token.accesstoken,
        refreshtoken: response.data.token.refreshtoken,
      };

      localStorage.setItem("user", JSON.stringify(user));
      // window.location.replace(url+"panel")
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const signUp = async () => {
  const data = {
    username: userSignUpCredentials.username,
    email: userSignUpCredentials.email,
    password: userSignUpCredentials.password,
  };

  const response = await axios.post("api/signup/", JSON.stringify(data), {
    headers,
    withCredentials: true,
  });

  if (response.data) return response.data.status;
};

export const signUpFinal = async () => {
  const data = {
    email: userSignUpCredentials.email,
    code: userConfirmationCredentials.confirmCode,
  };
  const response = await axios.post("api/signup/", JSON.stringify(data), {
    headers,
    withCredentials: true,
  });

  if (response.data && response.data.status === 201) {
    const user = {
      accesstoken: response.data.token.accesstoken,
      refreshtoken: response.data.token.refreshtoken,
    };

    localStorage.setItem("user", JSON.stringify(user));
    // window.location.replace(url+"panel")
    return true;
  } else if (response.data) return false;
};

export const getUser = async () => {
  const data = await get("api/panel/");
  if (data && data.status === 200) {
    const user = {
      username: data.profile.username,
      imageurl: domain + data.profile.profileimageurl,
      firstname: data.profile.firstname,
      lastname: data.profile.lastname,
      email: data.profile.email,
      phone: data.profile.phone,
      room: data.profile.roomkey,
    };

    return user;
  } else return null;
};

export const updateProfile = async () => {
  let form = userUpdateCredentials.myform;
  const data = await post(form, "api/profile/");
  if (data) {
    const user = {
      username: data.profile.username,
      imageurl: domain + data.profile.profileimageurl,
      firstname: data.profile.firstname,
      lastname: data.profile.lastname,
      email: data.profile.email,
      phone: data.profile.phone,
    };

    return user;
  } else return null;
};

export const getJoinedRooms = async () => {
  const data = await get("api/roomuser/");
  if (data && data.status === 200) {
    return data.rooms;
  } else return [];
};

export const leaveOrDeleteUser = async () => {
  let mykey = roomToleaveOrDeletePanel.key;
  if (mykey === "") mykey = roomToleaveOrDeleteRoom.key;
  const data = await del("api/roomuser/" + mykey + "/");
  if (data && data.status === 200) {
    return data.rooms;
  } else return [];
};
