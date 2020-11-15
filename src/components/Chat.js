import { Avatar } from "@material-ui/core";
import React from "react";
import "../css/Chat.css";
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from "@material-ui/icons";
import {IconButton} from '@material-ui/core';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../Firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const {roomId} = useParams();
  const [roomName,setRoomName] = useState("");

  useEffect(()=>{
     if(roomId){
       db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
         setRoomName(snapshot.data().name)
       })
     }
  },[roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e)=>{
    e.preventDefault();
    console.log("aanfafn typed",input);
    setInput("");

  }



  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>LAst seen ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className="chat__message chat__receiver">
        <span className="chat__name">Sonny</span>
        hah
        <span className="chat__timestamp">2:20am</span>
        </p>

        <p className="chat__message">hah</p>
      </div>

      <div className="chat__footer">
        <InsertEmoticon/>
        <form>
          <input type="text" value={input} onChange={e=> setInput(e.target.value)} placeholder="Type a message"/>
          <button onClick={sendMessage} type="submit" >Send a message</button>
        </form>
        <Mic/>
      </div>
    </div>
  );
}

export default Chat;
