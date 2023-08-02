import websocketToken from "./websocketToken.js";

const tokenCheck = (type) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    if (type === "accesstoken") {
      return user.accesstoken;
    } else if (type === "refreshtoken") {
      return user.refreshtoken;
    } else if (type === "websocket") {
      return websocketToken(user.accesstoken);
    }
  } else {
    return false;
  }
};

export default tokenCheck;
