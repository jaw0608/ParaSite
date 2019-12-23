//Imports
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const router = express.Router();

const corsOptions = {
  origin: "http://localhost:3000"
}

MongoClient.connect('mongodb://localhost:27017/parasite-db', { useUnifiedTopology: true }, function (err, client) {
  if (err) throw err;

  const db = client.db('parasite-db')
  
  router.post('/', cors(corsOptions), (req, res) => {
    // console.log(req, res);
    db.collection('users').insertOne(req.body, function (err, result) {
    if (err) throw err;
    
    console.log("User successfully inserted")
  })
    console.log(req.body);
  });
});

app.options('http://localhost:3000/users', cors());

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET users listing. */
router.get('/', cors(), function (req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
