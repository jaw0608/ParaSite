//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;
const User = require('../models/Users');

/* Router */
const app = express();
const router = express.Router();

/* Crypto */
const algorithm = "md5";

/* CORS */
const corsOptions = {
  origin: "http://localhost:3000"
}

mongoose.connect("mongodb+srv://ParaSiteAdmin:" + process.env.MONGO_ATLAS_PW + "@parasite-ccdoj.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  console.log('Request type: ', req.method);
});

app.options('http://localhost:3000/users', cors());

MongoClient.connect('mongodb://localhost:27017/parasite-db', { useUnifiedTopology: true }, function (err, client) {
  if (err) throw err;

  const db = client.db('parasite-db')

  /* POST register */
  router.post('/register', cors(corsOptions), (req, res) => {
    //Need to check for duplicates
    //Checks if the user exists in the database
    // console.log(req.body);
    // var testing = User.find();
    // console.log(testing)
    db.collection('users').find({ email: req.body.email }).toArray(function(err, result) {
      if (err) throw err;
      if (!result.length) {
        //Saved user!
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
        })
        user.save().then(result => {
          console.log("Account successfully registered! ", result);
        })
        .catch(err => {
          console.log(err);
          res.status(400).send({ msg: 'User already exists!'});
        });
        res.status(201).json({
          message: "Handling POST request to /register",
          createdUser: user
        });
      } else {
        res.status(400).send({ msg: 'User already exists!' });
      }
    });
  });

  /* POST login */
  router.post('/login', cors(corsOptions), function (req, res) {
    //Hash the password first before checking
    console.log("REEEE")
    db.collection('users').find({ $and: [{ username: req.body.username}, {password: req.body.password }] }).toArray(function (err, result) {
      if (err) throw err;
      if (result.length) {
        //Username and password match
        res.send(true);
      } else {
        res.status(400).send({ msg: "Bad credentials!" });
      }
    });
  });
});

module.exports = router;
