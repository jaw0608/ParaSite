
//for socket.io connections.
module.exports = function (io) {
  games = {}
  playerInfos = {}     //info with name as key
  playerNames = {}    //name with socket.id as key

  //initial connect
  io.on('connection', function(socket){ //initial connection of a socket
    console.log('a user connected');
    socket.join("lobby");

    io.to(socket.id).emit('id',socket.id); //emit socket.id to socket

    socket.on('name',function(name){        //handle name request
      if (Object.keys(playerNames).includes(name)==false){
        playerNames[socket.id] = name;
        playerInfos[name] = {};
        playerInfos[name].socketID = socket.id;
        io.to(socket.id).emit('name',true); //name added successfully
      }
      else {
        io.to(socket.id).emit('name',false); //name already used
      }
    });

    socket.on('disconnect', function(){ //disconnection
      var n = playerNames[socket.id];
      playerInfos[n]=null; //remove player from list of usable names
      console.log('user disconnected');
    });

    socket.on('chat', function(data){ //upon recieval of a message send request
      var myname = playerNames[socket.id];
      var rooms = Object.keys(socket.rooms);
      var msg = myname+": "+data.msg;
      var d = {
        "type":"chat",
        "msg":msg
      }
      if(rooms.includes(data.room))
        io.to(data.room).emit('chat',d);
    });

    socket.on('whisper', function(data){ //upon receival of a private message send request
      var myname = playerNames[socket.id];
      var player = playerInfos[data.player] || null;
      if(!player){
        //error (null or undefined)
        return;
      }
      var s = getSocket(player.socketID);
      if (socket.id==s.id){
        //cant whisper to self.
      }
      var msg = myname+ " (whispering): "+data.msg;
      if(s && shareRoom(data.room,socket,s)){
        var alert = myname+ " is whispering to "+ data.player;
        var d = {
          "type":"whisper_alert",
          "msg":alert
        }
        io.to(data.room).emit('chat',d);
        d = {
          "type":"whisper",
          "msg":msg
        }
        io.to(player.socketID).emit('chat',d);
      } //check if players share rooms
    });
  });


    function shareRoom(room,socket1, socket2){
      var rooms1 = socket1.rooms;
      var rooms2 = socket2.rooms;
      var ret1 = Object.keys(rooms1).includes(room);
      var ret2 = Object.keys(rooms2).includes(room);
      return ret1 && ret2;
    }

    function getSocket(id){
      return io.sockets.connected[id];
    }

    function makeGame(code){
      if(!game[code]){

      }
    }

    return module;
};
