/* Libraries */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');

/* Routes */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');

const joeio = require('./joeio');
const ioHelpers = require('./ioHelpers');

/* Initialize app */
const app = express();

/* Enable CORS*/
app.options('http://localhost:3000/', cors());

/* Mongoose */
// const uri = 'mongodb+srv://manny:CmbXqgGvNbdhvZX4@parasite.ccdoj.mongodb.net/ParaSite?retryWrites=true&w=majority';
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
const port = ioHelpers.normalizePort(process.env.PORT || '9000');
app.set('port', port);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
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
httpServer.listen(9000, function (){
  console.log('listening socket on port 9000')
}); 

/* Routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;