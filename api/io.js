//for socket.io connections.
module.exports = function(io) {
  const async = require('async');
  games = {
    "lobby": {
      "playersBySocket": {},
      "playersByName": {},
      "connections": 0,
      "playing": false,
      "players": {}
    }
  } //room as key, game object
  socketToGame = {} //socket id as key, current game code as value

  //initial connect
  io.on('connection', function(socket) { //initial connection of a socket
    socket.join("lobby");
    socketToGame[socket.id] = "lobby" //player is in lobby, aka not in any game
    games["lobby"].connections++;

    io.to(socket.id).emit('id', socket.id); //emit socket.id to socket

    socket.on('name', function(name) { //handle name request
      game = socketToGame[socket.id] //get players current game or lack there of ("lobby")
      var playersByName;
      if (games[game] && (playersByName = games[game].playersByName)) { //if valid game and playersByName defined
        if (Object.keys(playersByName).includes(name) == false) { //if name not chosen already

          //update playersByName and playersBySocket for this game.
          var playersBySocket = games[game].playersBySocket
          var oldname = playersBySocket[socket.id];
          delete playersByName[oldname];
          playersByName[name] = socket.id
          playersBySocket[socket.id] = name
          games[game].playersBySocket = playersBySocket
          games[game].playersByName = playersByName
          d = {
            "name": name,
            "sucess": true,
            "reason": null
          }
          io.to(socket.id).emit('name', d); //name added successfully
        } else {
          d = {
            "name": name,
            "sucess": false,
            "reason": "TAKEN"
          }
          io.to(socket.id).emit('name', d); //name already used
        }
      }
      console.log(games);
    });

    socket.on('findGame', function() {
      matchMaker([socket.id]).then(function(room) {
        var d = {
          "type": "whisper_alert",
          "msg": `joined room ${room}`
        }
        socket.leave(socketToGame[socket.id], function() { //add callback so you never accidently leave a room you just joined
          socket.join(room);
          socketToGame[socket.id] = room;
          io.to(socket.id).emit('chat', d);
          io.to(socket.id).emit('id', socket.id) //temporary renaming as socket.id when joining a room.
          io.to(socket.id).emit('new room', room)
        });
      });
    });

    socket.on('disconnect', function() { //disconnection
      var game = socketToGame[socket.id]
      if (!games[game]) return;
      if (games[game].playing == true) {
        //mark character as dead but uninteractable
      } else {
        leaveGame(socket.id);
      }
    });

    socket.on('chat', function(data) { //upon recieval of a message send request
      var game = socketToGame[socket.id]
      if (!games[game] || !games[game].playersBySocket) return
      var myname = games[game].playersBySocket[socket.id]
      var rooms = Object.keys(socket.rooms);
      var msg = myname + ": " + data.msg;
      var d = {
        "type": "chat",
        "msg": msg
      }
      if (rooms.includes(data.room))
        io.to(data.room).emit('chat', d);
    });

    socket.on('whisper', function(data) { //upon receival of a private message send request
      var game = socketToGame[socket.id]
      if (!games[game] || !games[game].playersBySocket) return
      var myname = games[game].playersBySocket[socket.id]
      if (!games[game].playersByName) return
      var player = games[game].playersByName[data.player] || null;
      if (!player) {
        var d = {
          "type": "fail",
          "msg": `Player ${data.player} does not exist`
        }
        io.to(socket.id).emit('chat', d);
        return;
      }
      var s = getSocket(player);
      if (socket.id == s.id) {
        var d = {
          "type": "fail",
          "msg": "Why are you whispering to yourself? Lolz"
        }
        io.to(socket.id).emit('chat', d);
        return
      }
      var msg = myname + " (whispering): " + data.msg;
      if (s && shareRoom(data.room, socket, s)) {
        var alert = myname + " is whispering to " + data.player;
        var d = {
          "type": "whisper_alert",
          "msg": alert
        }
        io.to(data.room).emit('chat', d);
        d = {
          "type": "whisper",
          "msg": msg
        }
        io.to(player).emit('chat', d);
      } //check if players share rooms
    });
  });


  function shareRoom(room, socket1, socket2) {
    var rooms1 = socket1.rooms;
    var rooms2 = socket2.rooms;
    var ret1 = Object.keys(rooms1).includes(room);
    var ret2 = Object.keys(rooms2).includes(room);
    return ret1 && ret2;
  }

  function getSocket(id) {
    return io.sockets.connected[id];
  }

  function joinGame(code, players) {
    return new Promise(function(resolve, reject) {
      if (code == "lobby") {
        resolve(false);
        return;
      }
      if (games[code] && games[code].connections < 12 - players.length) {
        var done = 0;
        for (let id of players) {
          leaveGame(id).then(function() {
            games[code].connections++;
            games[code].playersBySocket[id] = "";
            done++;
            if (done == players.length) {
              resolve(true);
              return;
            }
          });
        }
      } else {
        resolve(false);
      }

    });

  }

  function matchMaker(players) {
    return new Promise(function(resolve, reject) {
      var shuf = shuffle(Object.keys(games));
      var checked = 0;
      for (let value of shuf) {
        joinGame(value, players).then(function(result) {
          if (result == true) {
            resolve(value);
            return;
          } else {
            checked++;
            if (checked == shuf.length) {
              generateGameCode().then(function(code) {
                createGame(code).then(function() {
                  joinGame(code, players).then(function(result) {
                    resolve(code);
                    return;
                  });
                });
              });
            }
          }
        });
      }
    });
  }

  function generateGameCode() {
    return new Promise(function(resolve, reject) {
      var result = '';
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      for (var i = 8; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      resolve(result);
    });
  }

  function shuffle(a) { //random shuffle of array, used in matchmaking
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  function createGame(code) {
    return new Promise(function(resolve, reject) {
      if (games[code]) resolve(false)
      else {
        games[code] = {}
        games[code].connections = 0;
        games[code].playersBySocket = []
        games[code].playersByName = []
        games[code].players = {}
        games[code].playing = false
        resolve(true)
      }
    });
  }

  function leaveGame(socketid) {
    return new Promise(function(resolve, reject) {
      var game = socketToGame[socketid];
      if (game && games[game] && games[game].playing == false) {
        games[game].connections -= 1;
        var name = games[game].playersBySocket[socketid];
        delete games[game].playersBySocket[socketid]
        delete games[game].playersByName[name]
        resolve();
      } else if (game && games[game]) {
        //mark player as dead
        resolve();
      }
    });
  }

  function makePlayer(game, socketid) {
    var player = {}
    //to do with Brianna for roles
    //games[game].players[socketid]=player
  }

  return module;
};
