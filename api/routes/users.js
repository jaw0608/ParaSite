//Imports
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const router = express.Router();

const corsOptions = {
  origin: "http://localhost:3000"
}

app.options('http://localhost:3000/users', cors());

MongoClient.connect('mongodb://localhost:27017/parasite-db', { useUnifiedTopology: true }, function (err, client) {
  if (err) throw err;

  const db = client.db('parasite-db')

  /* POST users listing */
  router.post('/', cors(corsOptions), (req, res) => {
    //Need to check for duplicates

    //Checks if the user exists in the database
    db.collection('users').find({ email: req.body.email }).toArray(function (err, result) {
      if (err) throw err;
      if (!result.length) {
        db.collection('users').insertOne(req.body, function (err, result) {
          if (err) throw err;
          console.log("Account successfully registered!")
        })
      } else {
        res.status(400).send({msg: 'User already exists!'});
      }
    })

  });

  /* GET users listing. */
  router.get('/', cors(), function (req, res, next) {
    res.send('respond with a resource');

    db.collection('users').find({username: req.body.username, password: req.body.password}).toArray(function (err, result) {
      if (err) throw err;
      if (result.length) {
        //Username and password match
        
      } else {
        res.status(400).send({msg: "Bad credentials!"});
      }
    });
  });
});


router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});





module.exports = router;
