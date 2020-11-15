import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/SidebarChats.css';
import db from "../Firebase";

function SidebarChats({id,name,addNewChat}) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = ()=>{
     const roomName = prompt('Please enter the name for chat');
     if(roomName){
         //do some stuff;
         db.collection('rooms').add({
           name:roomName
         });
     }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChats__info">
        <h3>{name}</h3>
        <p>Last message...</p>
      </div>
    </div>
    </Link>
  ) 
  : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChats;
