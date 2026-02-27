import axios from "axios";
import React, { useEffect, useState } from "react";

function Chat() {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const {data} = await axios("/api/chat");
    setChats(data);
  };
  
  
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
}

export default Chat;
