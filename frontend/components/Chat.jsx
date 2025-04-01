import React, { useState } from "react";
import { io } from "socket.io-client";
import MainChat from "./MainChat.jsx";
import "./Chat.css";
import Navbar from "./Navbar.jsx";
import { base_URL } from "../Base_URL/Base_URL.js";

const socket = io.connect(`${base_URL}`);

const Chat = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleJoinRoom = () => {
    if (userName.trim() !== "" && room.trim() !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="chat_conatainer">
      <div className="post-content-first">
        <Navbar />
      </div>
      {!showChat ? (
        <div className="chat_content">
          <h3 className="chat_content_head">Join A Chat</h3>
          <div className="chat_content_nameRoom">
            <input
              className="chat_content_name"
              type="text"
              placeholder="John..."
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              className="chat_content_room"
              type="text"
              placeholder="Room Id..."
              value={room}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={handleJoinRoom} className="chat_content_button">
            Join a Room
          </button>
        </div>
      ) : (
        <div className="chat_meta">
          <MainChat socket={socket} userName={userName} room={room} />
        </div>
      )}
    </div>
  );
};

export default Chat;
