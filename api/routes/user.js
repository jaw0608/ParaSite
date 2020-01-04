//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;
const UserModel = require('../models/user');
const UserController = require('../controllers/user');

/* Router */
const app = express();
const router = express.Router();

/* Crypto */
const algorithm = "md5";

/* CORS */
const corsOptions = {
  origin: "http://localhost:3000"
}

/* Mongoose */
const uri = "mongodb+srv://admin:yv7mvTX5THj6X2S@parasite-ccdoj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
  console.log('Request type: ', req.method);
});

app.options('http://localhost:3000/users', cors());

client.connect(function (err) {
  if (err) throw err;

  const db = client.db('parasite-db')

  /* POST register */
  router.post('/register', cors(corsOptions), async (req, res, next) => {
    //Need to check for duplicates
    //Checks if the user exists in the database
    console.log(req.body)
    let exists = await UserController.checkRegistration({ email: req.body.email }, res, next);
    console.log("exists:",exists);
    exists.then(user => {
      res.send("USER")
      console.log(user);
    }).catch(err => {
      res.send(err);
    });

    console.log("exists:",exists);
    if (exists) {
      res.status(400).send("User already registered in the database!");
    } else {
      let promise = UserModel.create({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });
      promise.then(user => {
        res.send("Successfully saved user!");
      })
      .catch(err => {
        console.log("Catch")
        res.send("Error");
      });
      console.log("REEEEEEEEEEEEEEEE");
    }
  });

  /* POST login */
  router.post('/login', cors(corsOptions), function (req, res) {
    //Hash the password first before checking
    console.log("REEEE")
    db.collection('users').find({ $and: [{ username: req.body.username }, { password: req.body.password }] }).toArray(function (err, result) {
      if (err) {
        console.log(err);
      };
      if (result.length) {
        //UserModelname and password match
        res.send(true);
      } else {
        res.status(400).send({ msg: "Bad credentials!" });
      }
    });
  });
});

module.exports = router;
