//socket already in global namespace for use.
var socketID;
socket.on('id',function(id){ //on connection, socket will receive its socket.id
  socketID = id;
  console.log(socketID);
});

var name = 'hello';
socket.emit('name',name); //send desired name to server.
socket.on('name',function(success){
  if(success){
    //name was successful
  }
  else {
    //name was uncessful
  }
});


socket.emit('chat',"hi"); //test


socket.on('chat',function(msg){ //whenever this socket receives a chat message.
    //Show message somehow
});

//functions to call

function whisper(playerName,message){
  data = {
    'player':playerName,
    'msg':message
  }
  socket.emit('whisper',data);
}

function chat(room,message){
  data = {
    'room':room,
    'msg':message
  }
  socket.emit('chat',data);
}
