const express = require('express');

const { createUser } = require('../controller/authController');
const { loginUser } = require('../controller/loginController');
const { tokenUser } = require('../controller/tokenController');

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/token', tokenUser);

module.exports = router;