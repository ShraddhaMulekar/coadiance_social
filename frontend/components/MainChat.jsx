import React, { useEffect, useState } from "react";
import "./MainChat.css"

const MainChat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([])

  const handleSendMessage = async()=>{
    if(currentMessage.trim() !== ""){
        let msg = {
            author : userName,
            room : room,
            message : currentMessage,
            time : `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
        }
        await socket.emit("send_message", msg)
        setMessageList((list)=>[...list, msg])
        setCurrentMessage("")
    }
  }

  useEffect(()=>{
    const msgData = (data)=>{
        console.log("receive_message", data)
        setMessageList((list)=>[...list, data])
    }

    socket.on("receive_message", msgData)

    return(()=>{
            socket.off("receive_message", msgData)
        }
    )
  },[socket])

  return (
    <div className="mainchat_container">
      <div className="mainchat_header">
        <p>Live Chat</p>
      </div>
      <div className="mainchat_body">
        {
            messageList?.map((messages)=>{
                return(
                 <div className="mainchat_body_container" id={userName === messages.author ? "you" : "other"}>
                    <div className="mainchat_body_msg"><p>{messages.message}</p></div>
                    <div className="mainchat_body_content">
                        <p>{messages.time}</p>
                        <p>{messages.author}</p>
                    </div>
                 </div>   
                )
            })
        }
      </div>
      <div className="mainchat_footer">
        <input
          type="text"
          placeholder="Hi..."
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button onClick={handleSendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default MainChat;
