const mongoose = require('mongoose');
const RoomModel = require('./models/room');
const io = 

function generateGameCode() {
    let result = '';
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 8; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
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
 * Event listener for HTTP server "error" event
 * @param {*} error Error 
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Create new game
 * @returns Room Code
 */
const createGame = (client) => {
  // Create game
  let gameCode = generateGameCode();
  let promise = RoomModel.create({
      _id: new mongoose.Types.ObjectId(),
      clientId: client.id,
      gameCode: gameCode
  })
  promise.then(room => {
      client.emit('gameCode', gameCode);
      client.join(gameCode);
      client.number = 1;
  }).catch(err => {
    console.log(err);
  })
  return gameCode;
}

const joinGame = (client, gameCode) => {
  client.join(gameCode)
  client.emit('joinedGame', gameCode)
}

const failedToJoin = (client, gameCode) => {
  client.emit('failedToJoin', gameCode)
}

module.exports = {
    onListening,
    normalizePort,
    onError,
    createGame,
    joinGame,
    failedToJoin
}