import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../css/Sidebar.css";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import SidebarChats from "./SidebarChats";
import db from "../Firebase";


function Sidebar() {
  const [rooms,setRooms] = useState([]);

  useEffect(()=>{
    db.collection('rooms').onSnapshot(snapshot=>{
     setRooms(snapshot.docs.map(doc=>(
       {
         id:doc.id,
         data:doc.data(),
       }
     ))
     )
    })
  },[])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new Chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
         <SidebarChats addNewChat="abc"/>
         {rooms.map(room=>(
           <SidebarChats key={room.id} id={room.id} name={room.data.name}/>
         )
         )}
      </div>
    </div>
  );
}

export default Sidebar;
