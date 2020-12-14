import { Avatar, Button, Modal } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom"
import "../css/Chat.css";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  SearchOutlined,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
// import {Alert} from '@material-ui/';
import CloseIcon from "@material-ui/icons/Close";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../Firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [warning, setWarning] = useState(false)

  useEffect(() => {
    console.log('====================================');
    console.log(roomId);
    console.log('====================================');
    if(!roomId) {
      history.push("/")
      return
    }
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          if(snapshot.data()) {
            setRoomName(snapshot.data().name);
          } else {
            setRoomName("")
          }
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    if(!roomId) {
      history.push("/rooms")
      return
    }
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log("aanfafn typed",input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  }


  // const deleteRoomHandler = ()=>{
  //   db.collection('rooms').doc(roomId).delete().then(res=>{
  //     console.log('room deleted');
  //     history.push("/rooms")
  //   }).catch(err=>console.log(err.message));

  //   setWarning(false);
  // }

  const popupHandler=()=>{
     setWarning(true)
  }
  const popupClose=(e)=>{
    // console.log(e);
     if(e===1){
        db.collection('rooms').doc(roomId).delete().then(res=>{
          console.log('room deleted');
          history.push("/rooms")
        }).catch(err=>console.log(err.message));
    
        setWarning(false);
     }

     else
     setWarning(false)
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <CloseIcon onClick={popupHandler}/>
          </IconButton>
        </div>
      </div>

      {warning && (
        <>
       <div className="chat__warning">
        <div className="chat__warningBody">
          <p>
          Do you want to delete this room?
          </p>
          <Button id={1}variant="contained" color="secondary" onClick={()=>popupClose(1)}>YES</Button>
          <Button id={2} variant="contained" color="secondary" onClick={()=>popupClose(2)}>NO</Button>
        </div>
       </div>
        </>
      )
      }
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
        {/* <p className="chat__message chat__receiver">
        <span className="chat__name">Sonny</span>
        hah
        <span className="chat__timestamp">2:20am</span>
        </p>

        <p className="chat__message">hah</p> */}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
