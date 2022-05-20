const express = require('express');
const user = require('../models/user');
const router = express.Router();


router.post('/user', async(req, res,) => {
  try {
    const {
      id, 
      firstname, 
      lastName, 
      login, 
      password, 
      email, 
      avatar} = req.body;
    const post = await user.create({
      id,
       firstname, 
       lastName, 
       login, 
       password, 
       email, 
       avatar})
  } catch (e) {
    res.status(500).json(e);
  }
})

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
