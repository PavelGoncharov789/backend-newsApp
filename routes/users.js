const express = require('express');
const router = express.Router();

const { User } = require('../models');

router.post('/user', async (req, res) => {
  try {
    const {
      id,
      firstname,
      lastName,
      login,
      password,
      email,
      avatar,
    } = req.body;
    const user = await User.create({
      id,
      firstname,
      lastName,
      login,
      password,
      email,
      avatar,
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
