/* Dependencies */
const express = require('express')
const jwt = require('jsonwebtoken')

/* Constants */
const router = express.Router()

//This function is used to protect routes, save this for menu etc
router.post('/verifyAuth', (req, res, next) => {
//   console.log(req.headers);
  const authHeader = req.body.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //Get the token 
  // console.log(req.body)
  if (token == null) return res.status(401).send('Error!');
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token is no longer valid!');
    req.user = user;
    next();
    res.status(200).send("Success verifying token!");
  });
})

module.exports = router;