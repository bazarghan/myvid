import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./VideoPlayerC.scss";
import tokenCheck from "../../jwt/tokenCheck";

let lastcommand = -1;
let lasttime = -1;

let connected = false;
const VideoPlayerC = ({ className, url, client }) => {
  const videoRef = useRef();
  const room = useSelector((state) => state.room.room);
  if (client !== "") {
    connected = true;

    client.send(
      JSON.stringify({
        type: "getinfo",
        command: "video_status",
      })
    );
  }
  useEffect(() => {
    const video = videoRef.current;
    // const webSocketToken = tokenCheck("websocket");
    // const client = new WebSocket(
    //   "ws://" +
    //     window.location.host +
    //     "/ws/roomvideo/" +
    //     room.key +
    //     "/" +
    //     webSocketToken +
    //     "/"
    // );

    const seeked = video.addEventListener("seeked", () => {
      if (
        lasttime - video.currentTime < -0.1 ||
        lasttime - video.currentTime > 0.1
      ) {
        if (connected) {
          client.send(
            JSON.stringify({
              type: "control",
              control: "seeked",
              value: video.currentTime,
            })
          );
        }
      }
    });

    const pause = video.addEventListener("pause", () => {
      if ("pause" !== lastcommand) {
        if (connected) {
          client.send(
            JSON.stringify({
              type: "control",
              control: "pause",
              value: "",
            })
          );
        }
      }
    });

    const play = video.addEventListener("play", () => {
      if ("play" !== lastcommand) {
        if (connected) {
          client.send(
            JSON.stringify({
              type: "control",
              control: "play",
              value: "",
            })
          );
        }
      }
    });

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data && data.type == "control") {
        lastcommand = data.control;

        if (data.control === "seeked") {
          lasttime = data.value;
          video.currentTime = data.value;
        } else if (data.control === "pause") video.pause();
        else if (data.control === "play") video.play();
      } else if (data && data.type === "getinfo") {
        client.send(
          JSON.stringify({
            type: "sendinfo",
            command: "video-stats",
            data: {
              time: video.currentTime,
              status: video.paused,
            },
          })
        );
      } else if (data && data.type === "sendinfo") {
        lasttime = data.data.time;

        video.currentTime = data.data.time;

        if (data.data.status) {
          lastcommand = "pause";
          video.pause();
        } else {
          lastcommand = "play";
          video.play();
        }
      }
    };

    return () => {
      video.removeEventListener("seeked", seeked);
      video.removeEventListener("pause", pause);
      video.removeEventListener("play", play);
    };
  }, [room]);

  return (
    <div className={`video-player-c ${className}`}>
      <video ref={videoRef} controls width="500">
        <source src={url} type="video/webm" />
        <source src={url} type="video/mp4" />
        <source src={url} type="video/mkv" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  );
};

export default VideoPlayerC;
