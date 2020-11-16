import React from 'react';
import '../css/Login.css';
import {Button} from '@material-ui/core';
import { auth, provider } from '../Firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../Reducer';

function Login() {
const [{},dispatch] = useStateValue();

    const signIn = ()=>{
       auth.signInWithPopup(provider)
       .then(result=>{
           dispatch({
               type:actionTypes.SET_USER,
               user:result.user,
           })
       })
       .catch(err => alert(err.message));
    }

    return (
        <div className="login">
           <div className="login__container">
               <img src="https://image.flaticon.com/icons/png/512/124/124034.png" />
               <div className="login__text">
                   <h1>Sign in to WhatsApp</h1>
               </div>

               <Button onClick={signIn}>Sign In with Google</Button>
           </div>
        </div>
    )
}

export default Login
