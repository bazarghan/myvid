import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./ChatC.scss";

import ChatItemC from "../chat-item-c/ChatItemC";
import InputC from "../input-c/InputC";

import { loadChat } from "../../api/roomApi";
import tokenCheck from "../../jwt/tokenCheck";
import useBeforeRender from "../../hooks/useBeforeRender";

let client = "";

const ChatC = ({ className }) => {
  const room = useSelector((state) => state.room.room);

  const [chats, setChats] = useState([]);

  const [chat, setChat] = useState("");

  const username = useSelector((state) => state.user.user.username);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const chatRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTo(0, 864);
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTop += 200;
  }, [chats]);

  useEffect(() => {
    if (room.key !== "") {
      const webSocketToken = tokenCheck("websocket");

      client = new WebSocket(
        "ws://" +
          window.location.host +
          "/ws/roomchat/" +
          room.key +
          "/" +
          webSocketToken +
          "/"
      );
    }
  }, [room]);

  useEffect(() => {
    if (room.key !== "") {
      const fetchData = async () => {
        const data = await loadChat(room.key);

        setChats(data);
      };

      fetchData().catch(console.error);
    }
  }, [room]);

  if (client !== "") {
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data) {
        if (data.type === "message") {
          let message = {
            username: data.name,
            text: data.message,
          };

          setChats([...chats, message]);
        }
      }
    };
  }

  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    chatRef.current.style.height = `${(windowHeight - 61) / 10}rem`;
  }, [windowHeight]);

  const handleChange = (e) => {
    setChat(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (client !== "") {
        client.send(
          JSON.stringify({
            type: "message",
            message: chat,
          })
        );
      }

      setChat("");
    }
  };

  return (
    <div className={`chat-c ${className}`} ref={chatRef}>
      <div className="chat-c__container-1" ref={scrollRef}>
        {chats.map((chat) => {
          if (username === chat.username) {
            return <ChatItemC username={chat.username}>{chat.text}</ChatItemC>;
          } else
            return (
              <ChatItemC other username={chat.username}>
                {chat.text}
              </ChatItemC>
            );
        })}
      </div>

      <InputC
        className="chat-c__input"
        placeholder="یک پیام بنویسید ..."
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={chat}
      />
    </div>
  );
};

export default ChatC;
