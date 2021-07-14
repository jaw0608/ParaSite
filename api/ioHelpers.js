const mongoose = require('mongoose');
const RoomModel = require('./models/room');
// const io = 

function generateGameCode() {
    let result = '';
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 8; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/**
 * Normalizes a port into number, string or false
 * @param {number} val 
 * @returns Either number, string or false
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Create new game
 * @returns Room Code
 */
const createGame = (client, name) => {
  // Create game
  let gameCode = generateGameCode();
  let promise = RoomModel.create({
      _id: new mongoose.Types.ObjectId(),
      clientId: client.id,
      gameCode: gameCode,
      players: []
  })
  promise.then(room => {
      console.log(room)
      client.emit('gameCode', gameCode);
      client.join(gameCode);
      console.log('joined:', gameCode)
      client.number = 1;
  }).catch(err => {
    console.log(err);
  })
  return gameCode;
}

const joinGame = (client, state, gameCode, io) => {
  console.log('join game successful?', client.id)
  client.join(gameCode)
  // send to game socket too
  //io.broadcast.to(gameCode).emit('successfulJoin', gameCode)
  //io.broadcast.to(gameCode).emit('successfulJoinGame', state.mainState.user)
}

const failedToJoin = (client, gameCode) => {
  client.emit('failedToJoin', gameCode)
}

module.exports = {
    normalizePort,
    createGame,
    joinGame,
    failedToJoin
}
