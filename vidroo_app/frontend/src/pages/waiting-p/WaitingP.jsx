import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WaitingP.scss";

import { CircularProgress } from "@mui/material";
import tokenCheck from "../../jwt/tokenCheck";
import BtnC from "../../components/btn-c/BtnC";

let client = "";
const WaitingP = () => {
  const [isRejected, setIsRejected] = useState(false);

  const { key } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (key !== "") {
      const webSocketToken = tokenCheck("websocket");

      client = new WebSocket(
        "ws://" +
          window.location.host +
          "/ws/roomjoin/" +
          key +
          "/" +
          webSocketToken +
          "/"
      );

      client.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data) {
          if (data.access) {
            client.close();
            navigate("../panel/room/" + key + "/");
          } else {
            client.close();
            setIsRejected(true);
          }
        }
      };
    }
  }, []);

  return (
    <div className="waiting-p">
      {!isRejected ? (
        <div className="waiting-p__container-1">
          <h1 className="waiting-p__title">در انتظار برای تایید ادمین</h1>

          <CircularProgress />

          <BtnC primary large className="waiting-p__btn">
            انصراف
          </BtnC>
        </div>
      ) : (
        <div className="waiting-p__reject">
          متاسفانه درخواست شما توسط ادمین اتاق مورد قبول واقع نشد
        </div>
      )}
    </div>
  );
};

export default WaitingP;
