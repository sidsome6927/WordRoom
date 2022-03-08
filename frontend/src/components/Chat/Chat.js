import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import './Chat.css';

const ENDPOINT = 'http://localhost:8000/';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchParams] = useSearchParams();
  console.log();
  console.log();
  useEffect(()=>{
    socket = io(ENDPOINT)
    setName(searchParams.get('name'))
    setRoom(searchParams.get('room'))
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  },[ENDPOINT,searchParams])
  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessages([...messages,message]);
    })
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  },[messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  
  
  
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );

}

export default Chat;