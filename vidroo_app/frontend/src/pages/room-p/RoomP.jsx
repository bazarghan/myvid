import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import "./RoomP.scss";

import RoomNavC from "../../components/room-nav-c/RoomNavC";
import ChatC from "../../components/chat-c/ChatC";
import RoomBodyC from "../../components/room-body-c/RoomBodyC";
import PopUpRoomC from "../../components/pop-up-room-c/PopUpRoomC";
import ReqNotificationC from "../../components/req-notification-c/ReqNotificationC";

import tokenCheck from "../../jwt/tokenCheck";

import { roomLoad } from "../../redux/roomSlice";

export const urlKey = {
  keyName: "",
};

let userClient = "";
const RoomP = () => {
  const [popUp, setPopUp] = useState(false);
  const [client, setClient] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [userCheck, setUserCheck] = useState(false);

  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const roomKey = useSelector((state) => state.user.user.room);
  const room = useSelector((state) => state.room.room);
  let navigate = useNavigate();
  const roomRef = useRef();

  useEffect(() => {
    setRoomUsers(room.roomusers);
  }, [room]);

  useEffect(() => {
    if (room.key !== "") {
      const webSocketToken = tokenCheck("websocket");

      setClient(
        new WebSocket(
          "ws://" +
            window.location.host +
            "/ws/roomvideo/" +
            room.key +
            "/" +
            webSocketToken +
            "/"
        )
      );
    }
  }, [room]);

  useEffect(() => {
    if (room.key !== "") {
      const webSocketToken = tokenCheck("websocket");

      userClient = new WebSocket(
        "ws://" +
          window.location.host +
          "/ws/roomuser/" +
          room.key +
          "/" +
          webSocketToken +
          "/"
      );
    }
  }, [room]);

  if (userClient !== "") {
    userClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data) {
        if (data.type === "command") {
          if (data.command === "delete") {
            navigate("../panel", { replace: true });
            window.location.reload();
          } else if (data.command === "leave") {
            let users = [];
            roomUsers.map((user) => {
              if (user.username != data.username) users.push(user);
            });
            setRoomUsers([...users]);
          }
        } else if (data.type === "join") {
          setUsername(data.username);
          setUserId(data.userid);
          setUserCheck(true);
        } else if (data.type === "newuser") {
          let check = true;

          let users = [];
          roomUsers.map((user) => {
            if (user.username === data.user.username) {
              users.push(data.user);
              check = false;
            } else users.push(user);
          });
          if (check) setRoomUsers([...roomUsers, data.user]);
          else setRoomUsers([...users]);
        }
      }
    };
  }

  function changeState() {
    if (roomKey === key) {
      roomRef.current.style.filter = "blur(3px)";
    }

    setPopUp(true);
  }

  useEffect(() => {
    const timer = setTimeout(changeState, 1000);

    return () => clearTimeout(timer);
  }, []);

  const dispatch = useDispatch();

  const { key } = useParams();

  useEffect(() => {
    if (key) {
      urlKey.keyName = key;

      dispatch(roomLoad());
    } else {
      navigate("../panel", { replace: true });
    }
  }, []);

  const handleNotificationConfirm = () => {
    setUserCheck(false);

    userClient.send(
      JSON.stringify({
        type: "join",
        access: true,
        userid: userId,
      })
    );
  };

  const handleNotificationReject = () => {
    setUserCheck(false);

    userClient.send(
      JSON.stringify({
        type: "join",
        access: false,
        userid: userId,
      })
    );
  };

  return (
    <div className="room-p">
      {!userIsLoggedIn && <Navigate to="/" replace={true} />}

      {popUp && roomKey === key ? (
        <PopUpRoomC setPopUp={setPopUp} roomRef={roomRef} />
      ) : null}

      {userCheck && (
        <ReqNotificationC
          className="room-p__req-notification"
          title="درخواست ورود"
          username={username}
          onClickConfirm={handleNotificationConfirm}
          onClickReject={handleNotificationReject}
        >
          می خواهد وارد اتاق شود
        </ReqNotificationC>
      )}

      <div className="room-p__container-1" ref={roomRef}>
        <RoomNavC roomKey={key} />

        <div className="room-p__container-1-1">
          <ChatC roomKey={key} className="room-p__chat" />
          <RoomBodyC roomUsers={roomUsers} client={client} />
        </div>
      </div>
    </div>
  );
};

export default RoomP;
