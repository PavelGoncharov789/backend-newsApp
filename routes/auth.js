const express = require('express');

const { signUp, signIn, whoAmI } = require('../controller/authController');
const { isAuthenticated } = require('../middleware');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);
router.post('/token', isAuthenticated, whoAmI);

module.exports = router;
