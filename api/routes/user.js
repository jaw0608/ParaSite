//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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


/* Set router header */
router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST');
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
      password: await bcrypt.hash(req.body.password, 10),
    });
    promise.then(user => {
      res.send("Successfully saved user!");
    })
      .catch(err => {
        console.log("Catch")
        res.send("Error");
      });
  }
});

/* POST login */
router.post('/login', cors(corsOptions), async (req, res, next) => {
  //Hash the password first before checking
  let exists = await UserController.checkLogin(req, res, next);
  if (exists) {
    //If the user is registered in the database
    res.status(200).send("Successfully logged in!");
  } else {
    //User not found
    res.status(404).send("User not found!");
  }
});

module.exports = router;
