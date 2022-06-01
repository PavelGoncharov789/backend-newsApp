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
  } catch (error) {
    res.status(500).send('Ошибка!');
  }
});

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
