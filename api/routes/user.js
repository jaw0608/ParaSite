/* Routes related to authenticating the user */

require('dotenv').config();
let refreshTokens = [];

//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const UserController = require('../controllers/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

/* Router */
const app = express();
const router = express.Router();

/* Crypto */
const algorithm = "md5";

/* CORS */
const corsOptions = {
  origin: "http://localhost:3000"
}

/* Node Mailer */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'parasitenoreply@gmail.com',
    pass: 'yT01*Bt%Vhe#'
  }
});

const mailOptions = {
  from: 'parasitenoreply@gmail.com',
  to: '',
  subject: '',
  text: ''
};

/* Set router header */
router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
  console.log('Request type: ', req.method);
});

/* Middleware */
//This function is used to protect routes, save this for menu etc
function authenticateToken(req, res, next) {
  console.log(req.body);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //Get the token 
  if (token == null) return res.status(401).send('Error!');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token is no longer valid!');
    req.user = user;
    next();
  });
}

/* Routes */
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
  let user = await UserController.checkLogin(req, res, next);
  if (user != null) {
    //If the user is registered in the database
    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshTokens });
  } else {
    //User not found
    res.status(404).send("User not found!");
  }
});

/* POST forgot */
router.post('/forgot', cors(corsOptions), async (req, res, next) => {
  //Send the email
  let user = await UserController.getUser(req, res, next);
  if (user != {}) {
    console.log("req:", req.headers);
    console.log("userid:", user._id);
    mailOptions.to = user.email;
    mailOptions.subject = "Forgot Password";
    mailOptions.text = "Here is a link to reset your account: " + req.headers['origin'] + "/resetpassword?id=" + user._id;
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log("Error sending mail");
        res.status(400).send("Internal server error");
      } else {
        console.log("Email sent:", info.response);
        res.status(200).send("Email sent!")
      }
    });
  } else {
    res.status(404).send("User not found!");
  }
});

/* POST getID*/
router.post('/getID', cors(corsOptions), async (req, res, next) => {
  //Get the ID
  let user = await UserController.getUser(req, res, next);
  if (user != {}) {
    res.status(200).send(user._id);
  } else {
    res.status(404).send("User not found!");
  }
});

/* */
router.post('/resetpassword', cors(corsOptions), async (req, res, next) => {
  //Change the password
  let user = await UserController.getUserByID(req, res, next);
  if (user != {}) {
    user.password = await bcrypt.hash(req.body.password, 10);
    user.save();
    res.status(200).send(user);
  } else {
    res.status(400).send("User not found!");
  }
});
module.exports = router;
