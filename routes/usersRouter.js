const express = require('express');

const { isAuthenticated } = require('../middleware');
const { getUserData, addNews } = require('../controller/userController');

const router = express.Router();

router.get('/:id', isAuthenticated, getUserData);
router.post('/add', isAuthenticated, addNews);

module.exports = router;
