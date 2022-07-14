const express = require('express');

const { isAuthenticated } = require('../middleware');
const { getUserData, addAvatar } = require('../controller/userController');

const router = express.Router();

router.get('/:id', isAuthenticated, getUserData);
router.post('/changeavatar', isAuthenticated, addAvatar);

module.exports = router;
