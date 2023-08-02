import { fabClasses } from "@mui/material";
import axios from "../api/axios";
import tokenCheck from "../jwt/tokenCheck.js";
import { domain } from "../constants/constant";
let headers = {
  "Content-Type": "application/json",
};

const newAccessToken = async () => {
  const refreshToken = tokenCheck("refreshtoken");

  const url = "api/refresh/";
  headers.refreshtoken = refreshToken;

  const response = await axios.get(url, {
    headers,
    withCredentials: true,
  });
  if (response.data && response.data.status === 401) {
    localStorage.removeItem("user");
    window.location.replace(domain);
    return false;
  } else if (response.data && response.data.status === 200) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accesstoken = response.data.accesstoken;

    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  }
};

//this is post request becarefull this is post request not get request idiot!!!!!!!!!!!!!!!
export const post = async (data, url) => {
  const accessToken = tokenCheck("accesstoken");

  if (!accessToken) return false;
  headers.accesstoken = accessToken;
  try {
    const response = await axios.post(url, data, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const res = await newAccessToken();
      if (!res) return false;
      return post(data, url);
    }
    return false;
  }
};

export const get = async (url) => {
  const accessToken = tokenCheck("accesstoken");

  if (!accessToken) return false;
  headers.accesstoken = accessToken;

  try {
    const response = await axios.get(url, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const res = await newAccessToken();
      if (!res) return false;

      const myres = get(url);
      return myres;
    } else if (error.response && error.response.status === 403) {
      return error.response;
    } else return false;
  }
};

export const del = async (url) => {
  const accessToken = tokenCheck("accesstoken");

  if (!accessToken) return false;
  headers.accesstoken = accessToken;

  try {
    const response = await axios.delete(url, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const res = await newAccessToken();
      if (!res) return false;

      const myres = get(url);
      return myres;
    } else if (error.response && error.response.status === 403) {
      return error.response;
    } else return false;
  }
};
