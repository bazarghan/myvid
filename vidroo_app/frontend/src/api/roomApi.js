import axios from "./axios";
import { post, get } from "../utils/httpResquest";

import { roomN } from "../components/pop-up-create-room-main-c/PopUpCreateRoomMainC";
import { urlKey } from "../pages/room-p/RoomP";

const myurl = "http://localhost:8000/";
export const createRoom = async () => {
  const data = await post(roomN, "api/room/create/");

  const myroom = data.room[0];
  if (data) {
    const room = {
      name: myroom.fields.name,
      key: myroom.pk,
    };
    window.location.replace(
      myurl+"panel/room/" + room.key + "/"
    );
    return room;
  } else return false;
};

export const loadRoom = async () => {
  const data = await get("api/room/" + urlKey.keyName + "/");

  if (data && data.status === 200) {
    const myroom = data.room[0];
    const roomusers = data.roomuser;
    const room = {
      name: myroom.fields.name,
      key: myroom.pk,
      roomusers: roomusers,
    };

    return room;
  } else if (data && data.status === 403) {
    window.location.replace(
      myurl+"join-room/" + urlKey.keyName + "/"
    );
    return false;
  } else {
    window.location.replace(myurl+"panel");
    return false;
  }
};

export const loadChat = async (roomKey) => {
  const data = await get("api/chat/" + roomKey + "/");

  if (data) {
    return data.chats;
  } else {
    return false;
  }
};
