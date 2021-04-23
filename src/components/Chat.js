import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import '../css/chat.css'
var socket;

class Chat extends Component {
  constructor(){
    super();
    this.state={
      endpoint:`http://localhost:9000/`,
      children: [],
      socketID: 0,
      room: "lobby"
    };
    socket = socketIOClient(this.state.endpoint);
  }
    render() {
        return (
          <div>
            <div id="log">
            {this.state.children.map((item,index) => (
              <p key={index} className={item.type}>{item.msg}</p>
            ))}
            </div>
            <input type="text" id="send" onKeyDown={this.emitChatMsg}/>
            <input type="button" id="find" onClick={this.findGame}/>
          </div>
        )
    }
    componentDidMount(){
      socket.on('chat',this.recvChatMsg);
      socket.on('id',this.connect);
      socket.on('name',this.validName);
      socket.on('m',this.validName);
      socket.on("new room", this.newRoom)
    }

    componentWillUnmount(){
      socket.off('chat');
      socket.off('id');
      socket.off('name');
    }

    //Chat msg emit/recv
    emitChatMsg = (msg) => {
      if (msg.key === 'Enter') {
        var whisp = /^ *(\/w) ([\S]+) (.+)/
        var match = whisp.exec(msg.target.value);
        var d = {}
        if(match && match[1] && match[2] && match[3]){ //is a whisper. 1 is /w, 2 is name, 3 is message
          d = {
            "player": match[2],
            "msg": match[3],
            "room": this.state.room
          }
          socket.emit('whisper',d);
        }
        else {
          var room = this.state.room;
          d = {
            "room":room,
            "msg":msg.target.value
          }
          socket.emit('chat',d);
        }
        msg.target.value = "";
      }

    }

    findGame = () => {
      socket.emit('findGame');
    }

    recvChatMsg = (msg) => {
      var currentList= this.state.children;
      currentList.push(msg);
      this.setState({ childComponent: currentList });
    }

    //for receiving your socketid
    connect = (id) => {
      this.setState({socketID:id});
      console.log(this.state.socketID);
      socket.emit('name',this.state.socketID);
    }

    newRoom = (room)=> {
      this.setState({"room":room})
    }

    //if name request was successful
    validName = (valid) => {
      var d;
      if (valid.sucess){
        d = {
          "type":"success",
          "msg":"Name "+valid.name +" chosen successfully"
        }
      }
      else {
        if (valid.reason==="TAKEN"){
          d = {
            "type":"fail",
            "msg":"Name already chosen"
          }
        }
        else {
          d = {
            "type":"fail",
            "msg":"Invalid name"
          }
        }

      }
      this.recvChatMsg(d);
    }
}

export default Chat;
