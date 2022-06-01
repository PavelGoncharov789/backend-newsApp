const express = require('express');

const { isAuthenticated } = require('../middleware');
const { getUserData } = require('../controller/userController');

const router = express.Router();

router.get('/:id', isAuthenticated, getUserData );

module.exports = router;