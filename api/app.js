/* Libraries */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

/* Routes */
const usersRouter = require('./routes/user');

const ioHelpers = require('./ioHelpers');

/* Initialize app */
const app = express();
const port = process.env.PORT || 9000;

/* Enable CORS*/
app.use(cors({ origin: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json({limit: '50mb'}));

/* Routes */
app.use('/users', usersRouter);

/* Mongoose */
const uri = 'mongodb+srv://' + process.env.ATLAS_USER + ':' + process.env.ATLAS_PW + '@' + process.env.ATLAS_DB + '?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((result) => {
  console.log('connected to db')
});

mongoose.Promise = global.Promise;
var async = require('async');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Socket.IO */
/* Create HTTP server. */
const httpServer = require('http').createServer(app);
const socketport = ioHelpers.normalizePort(process.env.PORT || '9001');
app.set('port', port);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'OPTIONS']
  }
});

/* Listeners */
io.on('connection', (socket) => {
  socket.on('message', ({ name, message}) => {
    io.emit('message', { name, message })
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