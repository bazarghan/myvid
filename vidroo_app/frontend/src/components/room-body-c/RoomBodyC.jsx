import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./RoomBodyC.scss";

import ChainC from "../chain-c/ChainC";
import EditIcon from "@mui/icons-material/Edit";
import VideoCallIcon from "@mui/icons-material/VideoCall";
// import tokenCheck from "../../jwt/tokenCheck";
import AvatarBoxC from "../avatar-box-c/AvatarBoxC";
import BtnC from "../btn-c/BtnC";
import InputFileC from "../input-file-c/InputFileC";
import InputC from "../input-c/InputC";
import VideoPlayerC from "../video-player-c/VideoPlayerC";

const RoomBodyC = ({ roomUsers, client }) => {
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");
  // const [client, setClient] = useState("");

  // const room = useSelector((state) => state.room.room);

  const inputFileRef = React.createRef();

  // useEffect(() => {
  //   setRoomUsers(room.roomusers);
  // }, []);

  const handleInputFileChange = () => {
    // this is an object
    const file = inputFileRef.current.files[0];

    const u = URL.createObjectURL(file);

    setUrl(u);
  };

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };

  const handleOpenVidClick = () => {
    setUrl(link);
  };

  // useEffect(() => {
  //   if (room.key !== "") {
  //     const webSocketToken = tokenCheck("websocket");
  //     setClient(
  //       new WebSocket(
  //         "ws://" +
  //           window.location.host +
  //           "/ws/roomvideo/" +
  //           room.key +
  //           "/" +
  //           webSocketToken +
  //           "/"
  //       )
  //     );
  //   }
  // }, [room]);

  return (
    <div className="room-body-c">
      <div className="room-body-c__container-1">
        {roomUsers.map((user, idx) => {
          if (idx !== roomUsers.length - 1) {
            if (user.owner) {
              if (user.online) {
                return (
                  <>
                    <AvatarBoxC online admin src={user.imageurl}>
                      {user.username}
                    </AvatarBoxC>
                    <ChainC small />
                  </>
                );
              } else {
                return (
                  <>
                    <AvatarBoxC offline admin src={user.imageurl}>
                      {user.username}
                    </AvatarBoxC>
                    <ChainC small />;
                  </>
                );
              }
            } else {
              if (user.online) {
                return (
                  <>
                    <AvatarBoxC online src={user.imageurl}>
                      {user.username}
                    </AvatarBoxC>
                    <ChainC small />;
                  </>
                );
              } else {
                return (
                  <>
                    <AvatarBoxC offline src={user.imageurl}>
                      {user.username}
                    </AvatarBoxC>
                    <ChainC small />;
                  </>
                );
              }
            }
          } else {
            if (user.owner) {
              if (user.online) {
                return (
                  <AvatarBoxC admin online src={user.imageurl}>
                    {user.username}
                  </AvatarBoxC>
                );
              } else {
                return (
                  <AvatarBoxC admin offline src={user.imageurl}>
                    {user.username}
                  </AvatarBoxC>
                );
              }
            } else {
              if (user.online) {
                return (
                  <AvatarBoxC online src={user.imageurl}>
                    {user.username}
                  </AvatarBoxC>
                );
              } else {
                return (
                  <AvatarBoxC offline src={user.imageurl}>
                    {user.username}
                  </AvatarBoxC>
                );
              }
            }
          }
        })}
        {/* <AvatarC admin>20ostad00</AvatarC>

        <ChainC small />

        <AvatarC>alienx577</AvatarC>

        <ChainC small />

        <AvatarC>someone</AvatarC> */}
      </div>

      <BtnC className="room-body-c__btn" primary large>
        ایجاد اعلان
      </BtnC>

      {url ? (
        <VideoPlayerC
          className="room-body-c__video-player"
          url={url}
          client={client}
        />
      ) : (
        <div className="room-body-c__container-2">
          <InputFileC
            className="room-body-c__input-file"
            svg={<VideoCallIcon />}
            ref={inputFileRef}
            onChange={handleInputFileChange}
          >
            لطفا یک ویدیو برای مشاهده انتخاب کنید
          </InputFileC>

          <div className="room-body-c__container-2-1">
            <InputC
              className="room-body-c__input"
              underlinedInput
              placeholder="لطفا یک لینک برای مشاهده قرار دهید"
              onChange={handleInputChange}
            />

            <BtnC
              className="room-body-c__open-vid-btn"
              primary
              small
              onClick={handleOpenVidClick}
            >
              باز کردن
            </BtnC>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomBodyC;
