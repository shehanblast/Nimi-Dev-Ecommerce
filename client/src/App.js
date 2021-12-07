import logo from './logo.svg';
import './App.css';
import Routes from "./routes/routes";
import {setToken} from "./setToken";
import store from "./Store";
import React, {useEffect} from "react";
import {LoadUser} from "./Actions/Authentication";

if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}

function App() {
    useEffect(() => {
        store.dispatch(LoadUser())
    },[]);
  return (
    <div>
      <Routes/>
    </div>
  );
}

export default App;
