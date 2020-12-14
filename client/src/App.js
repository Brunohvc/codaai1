import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
let socket;
//const ENDPOINT = "http://localhost:8080";

function App() {
  const [value, setValue] = useState('');

  const connect = () => {
    socket = io('http://localhost:8080/');

    socket.on('connect', () => {
      console.log('connected!');

      socket.on('disconnect', () => {
        console.log('O cliente foi desconectado.');
      });

      socket.on('recebendoAlgo', res => {
        console.log('Mensagem recebida: ', res);
      });
    });

  }

  const disconnect = () => {
    if (socket)
      socket.disconnect();
  }

  const sendMessage = (route, params) => {
    if (socket)
      socket.emit(route, params);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={event => { setValue(event.target.value) }} />
        <button onClick={() => sendMessage('chamada', { teste: value })}>Send Message</button>
        <button onClick={() => sendMessage('meuTeste', { teste: value })}>Send Message 2</button>
        <button onClick={() => connect()}>Connect</button>
        <button onClick={() => disconnect()}>Disconnect</button>
      </header>
    </div>
  );
}

export default App;
