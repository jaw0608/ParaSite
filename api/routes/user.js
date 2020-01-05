//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const crypto = require('crypto');
// const MongoClient = require('mongodb').MongoClient;
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

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
  console.log('Request type: ', req.method);
});

/* POST register */
router.post('/register', cors(corsOptions), async (req, res, next) => {
  //Need to check for duplicates
  //Checks if the user exists in the database
  let exists = await UserController.checkRegistration({ email: req.body.email }, res, next);
  if (!exists) {
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
  }

  /* POST login */
  router.post('/login', cors(corsOptions), async (req, res, next) => {
    //Hash the password first before checking
    // console.log(req.body); 
    console.log("REE");
    let exists = await UserController.checkLogin({$and: [{username: req.body.username}, {password: req.body.password}]}, res, next);
    console.log(exists);
    if (exists) {
      //If the user is registered in the database
      res.status(200).send("Successfully logged in!");
    } else {
      //User not found
      res.status(404).send("User not found!");
    }
    // db.collection('users').find({ $and: [{ username: req.body.username }, { password: req.body.password }] }).toArray(function (err, result) {
    //   if (err) {
    //     console.log(err);
    //   };
    //   if (result.length) {
    //     //UserModelname and password match
    //     res.send(true);
    //   } else {
    //     res.status(400).send({ msg: "Bad credentials!" });
    //   }
    // });
  });
});

module.exports = router;
