import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
var socket;
class Chat extends Component {
  constructor(){
    super();
    this.state={
      endpoint:'http://localhost:9000/',
      children: [],
      socketID: 0
    };
    socket = socketIOClient(this.state.endpoint);
  }
    render() {
        return (
          <div>
            <div id="log">
            {this.state.children.map((item,index) => (
              <p key={index}>{item}</p>
            ))}
            </div>
            <input type="text" id="send" onKeyDown={this.emitChatMsg}/>
          </div>
        )
    }
    componentDidMount(){
      socket.on('chat',this.recvChatMsg);
      socket.on('id',this.connect);
      socket.on('name',this.validName);
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
            "room": "lobby"
          }
          socket.emit('whisper',d);
        }
        else {
          var room = 'lobby';
          d = {
            "room":room,
            "msg":msg.target.value
          }
          socket.emit('chat',d);
        }
      }
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

    //if name request was successful
    validName = (valid) => {
      if (valid){
        //todo
      }
      else {
        //todo
      }
    }
}

export default Chat;
