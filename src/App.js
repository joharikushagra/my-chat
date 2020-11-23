import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useState,useEffect } from "react";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [userIn, setUser] = useState(null);

  // useEffect(()=>{
  //   auth.onAuthStateChanged(u => {
  //     if(u){
  //     dispatch({type :"SET_USER", user: u});
  //     setUser(u);
  //     }
  //     // console.log(u.displayName)
  //   });
  // },[])

  //BEM NAMING CONVENTION
    if (!user)
      return (
        <div className="app">
          <Login />
        </div>
      );

    return (
      <div className="app">
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
    }

export default App;
