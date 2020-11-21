import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../css/Sidebar.css";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton, Switch } from "@material-ui/core";
import SidebarChats from "./SidebarChats";
import db, { auth } from "../Firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../Reducer";


function Sidebar({history}) {
  const [rooms,setRooms] = useState([]);
  const [{user},dispatch] = useStateValue();
  const [theme, setTheme] = useState()

  useEffect(()=>{
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>{
     setRooms(snapshot.docs.map(doc=>(
       {
         id:doc.id,
         data:doc.data(),
       }
     ))
     )
    })

    return ()=>{
      unsubscribe();
    } 
  },[])
  
  const logoutHandler = ()=>{
    auth.signOut().then(result => (
      dispatch({
        type:actionTypes.UNSET_USER,
        user:null
      })
    ));
    
   
    // history.push('/');
  }

  return (
    <div className={theme?`sidebarDark` :  `sidebar`}>
      <div className={theme ? `sidebar__headerdark` :  `sidebar__header`}>
        <Avatar src={user?.photoURL} />
        <div className={theme ? `sidebar__headerRightDark` :  `sidebar__headerRight`}>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton> 
            {/* <MoreVert /> */}
            <ExitToAppIcon onClick={logoutHandler}/>
          </IconButton>
          {/* <Switch onChange={themeHandler}/> */}
        </div>
      </div>
      <div className={theme ? `sidebar__searchDark` : `sidebar__search`}>
        <div className={`sidebar__searchContainer`}>
          <SearchOutlined />
          <input placeholder="Search or start new Chat" type="text" />
        </div>
      </div>
      <div className={theme ? `sidebar__chatsdark` : `sidebar__chats`}>
         <SidebarChats addNewChat="abc"/>
         {rooms.map(room=>(
           <SidebarChats theme={theme} key={room.id} id={room.id} name={room.data.name}/>
         )
         )}
      </div>
    </div>
  );
}

export default Sidebar;
