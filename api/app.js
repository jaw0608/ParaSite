/* Libraries */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

/* Routes */
const usersRouter = require('./routes/user');
const gameRouter = require('./routes/game');
const authRouter = require('./routes/auth');
const ioHelpers = require('./ioHelpers');

/* Initialize app */
const app = express();
const port = process.env.PORT || 9000;
const socketport = ioHelpers.normalizePort(process.env.PORT || '9001');

/* Enable CORS*/
// console.log(cors)
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json({limit: '50mb'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Routes */
app.use('/users', usersRouter);
app.use('/auth', authRouter);
// app.use('/game', gameRouter);


/* Mongoose */
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((result) => {
  console.log('connected to db')
});

mongoose.Promise = global.Promise;

/* Socket.IO */
/* Create HTTP server. */
const httpServer = require('http').createServer(app);
app.set('port', port);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'OPTIONS']
  }
});

/* Listeners */
io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })

  socket.on('joinGame', (state, gameCode) => {
    console.log(state.mainState.user.username + 'is attempting to join game')
    if (io.sockets.adapter.rooms.has(gameCode)) { ioHelpers.joinGame(socket, state, gameCode) } 
    else { ioHelpers.failedToJoin(socket, gameCode) }
  })

  socket.on('createGame', () => {
    ioHelpers.createGame(socket);
  })

})
io.on('error', ioHelpers.onError);
io.on('listening', ioHelpers.onListening);

//socket.io connections
httpServer.listen(socketport, () => {
  console.log('listening socket on port 9001')
}); 

app.listen(port, () => {
  console.log('CORS enabled web server on port ' + port)
})

module.exports = app;