const express = require('express');

const { selectAll, createUser} = require('../controller/authController');
const { loginUser } = require('../controller/loginController')

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);

module.exports = router;