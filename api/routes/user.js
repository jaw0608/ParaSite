/* Routes related to authenticating the user */

require('dotenv').config();

//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const TokenModel = require('../models/token');
const UserController = require('../controllers/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

/* Router */
const app = express();
const router = express.Router();

/* Cookies */
app.use(cookieParser());

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
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
  console.log('Request type: ', req.method);
});

/* Middleware */
//This function is used to protect routes, save this for menu etc
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //Get the token 
  if (token == null) return res.status(401).send('Error!');
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token is no longer valid!');
    req.user = user;
    next();
    res.status(200).send("Success verifying token!");
  });
}

//Generates an access token
function generateAccessToken(user) {
  // console.log(process.env);
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
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
      profilePicture: null
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
    const accessToken = generateAccessToken(user.toJSON());
    const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET);
    
    //Create refreshToken and append to Mongo
    TokenModel.create({
      _id: new mongoose.Types.ObjectId(),
      refreshToken: refreshToken,
      user: user
    });
    
    //Set the cookies before the response 
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken, user: user });
  } else {
    //User not found
    console.log('user not found')
    res.status(404).send("User not found!");
  }
});

/* DELETE logout */
router.delete('/logout', async (req, res, next) => {
  UserController.logout(req, res, next);
  res.sendStatus(204);
});

/* POST forgot */
router.post('/forgot', cors(corsOptions), async (req, res, next) => {
  //Send the email
  let user = await UserController.getUserByEmail(req, res, next);
  if (user != {}) {
    mailOptions.to = user.email;
    mailOptions.subject = "Forgot Password";
    console.log(req.headers)
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

/* POST getID */
router.post('/getID', cors(corsOptions), async (req, res, next) => {
  //Get the ID
  let user = await UserController.getUserByEmail(req, res, next);
  if (user != {}) {
    res.status(200).send(user._id);
  } else {
    res.status(404).send("User not found!");
  }
});

/* POST resetpassword */
router.post('/resetpassword', cors(corsOptions), async (req, res, next) => {
  //Change the password
  let user = await UserController.getUserByID(req, res, next);
  if (user != null) {
    user.password = await bcrypt.hash(req.body.password, 10);
    user.save();
    res.status(200).send(user);
  } else {
    res.status(400).send("User not found!");
  }
});

/* POST token */
//This route is used for generating a new access token given the refresh token
router.post('/token', cors(corsOptions), async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);
  if (UserController.checkToken(req, res, next) === {}) return res.sendStatus(403); 

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({name: user.name})
    res.json({ accessToken: accessToken});
  })
});

/* POST posts*/
router.post('/posts', cors(corsOptions), authenticateToken, async (req, res, next) => {
  let val = await UserController.checkToken(req, res, next)
  try {
    res.json(val);
    return;
  } catch (err) {
    console.log('err');
  } 
});

/* GET verifyID */
router.get('/verifyID/:id', cors(corsOptions), async (req, res, next) => {
  //Verify the ID
  let user = await UserController.getUserByID(req, res, next);
  if (user != undefined) {
    res.status(200).send(true);
  } else {
    res.status(400).send(false);
  }
});

/* GET userInfo */
router.get('/getUserByUsername', cors(corsOptions), async (req, res, next) => {
  let user = await UserController.getUserByUsername(req, res, next);
  if (user != undefined) {
    res.json(user);
  } else {
    res.status(400).send(user);
  }
})

module.exports = router;
