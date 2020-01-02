//this is now unused

var socket = io('http://localhost:9000');
var socketID;

socket.on('id',function(id){ //on connection, socket will receive its socket.id
  socketID = id;
  console.log(socketID);
  socket.emit('name',socketID); //send desired name to server.
});

socket.on('name',function(success){
  if(success){
    //name was succesful
  }
  else {
    //name was uncessful
  }
});


socket.on('chat',function(msg){ //whenever this socket receives a chat message.
  const chatlog = document.getElementById('log');
  var el = document.createTextNode(msg);
  chatlog.appendChild(el);
  chatlog.appendChild(document.createElement("br"));
});

//functions to call

function whisper(room,playerName,message){
  data = {
    'room': room,
    'player': playerName,
    'msg': message
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

function join(room){
  socket.emit('join',room);
}

//need to later make generic for all rooms
const send = document.getElementById('send');
send.addEventListener("keydown", event => {
  if (event.keyCode!=13) {
    return;
  }
  var s = send.value;
  var whisp = /^ *(\/w) ([\S]+) (.+)/
  var match = whisp.exec(s);
  if(match && match[1] && match[2] && match[3]){ //is a whisper. 1 is /w, 2 is name, 3 is message
    whisper('lobby',match[2],match[3]); //name and message
  }
  else {
    chat('lobby',s);
  }
});
