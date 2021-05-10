import React, {
  useState,
  useEffect
} from 'react';
import socketIOClient from "socket.io-client";
import '../css/chat.css'
let endpoint = "http://localhost:9000"
let socket = socketIOClient(endpoint);

const Chat = () => {

  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("lobby");

  useEffect(() => {
    socket.on('chat', recvChatMsg);
    socket.on('name', validName);
    socket.on("new room", newRoom);

    return () => {
      socket.off('chat');
      socket.off('id');
      socket.off('name');
      socket.off("new room");
    };
  });

  function emitChatMsg(msg) {
    if (msg.key === 'Enter') {
      let whisp = /^ *(\/w) ([\S]+) (.+)/
      let match = whisp.exec(msg.target.value);
      let d = {}
      if (match && match[1] && match[2] && match[3]) { //is a whisper. 1 is /w, 2 is name, 3 is message
        d = {
          "player": match[2],
          "msg": match[3],
          "room": room
        }
        socket.emit('whisper', d);
      } else {
        let name = /^ *(\/n) ([\S]+)/
        match = name.exec(msg.target.value);
        if (match && match[1] && match[2]) {
          socket.emit('name', match[2]);
        } else {
          d = {
            "room": room,
            "msg": msg.target.value
          }
          socket.emit('chat', d);
        }
      }

      msg.target.value = "";
    }

  }

  function recvChatMsg(msg) {
    setMessages([...messages, msg]);
  }

  function newRoom(r) {
    setRoom("temp");
    setRoom(r);
  }

  function validName(valid) {
    let d;
    if (valid.sucess) {
      d = {
        "type": "success",
        "msg": "Name " + valid.name + " chosen successfully"
      }
    } else {
      if (valid.reason === "TAKEN") {
        d = {
          "type": "fail",
          "msg": "Name already taken"
        }
      } else {
        d = {
          "type": "fail",
          "msg": "Invalid name"
        }
      }
    }
    console.log(d);
    recvChatMsg(d);
  }

  function findGame() {
    socket.emit('findGame');
  }
  return ( <React.Fragment>
    <div id = "log" > {
      messages.map((item, index) => ( 
        <p key = {index} className = {item.type}> {item.msg} </p>
      ))
    } </div> <input type = "text" id = "send" onKeyDown = {emitChatMsg}/> 
    <button id = "find" onClick = {findGame}> Find a game </button> 
    </React.Fragment>
  );
}

export default Chat;
