const express = require('express');

const { isAuthenticated } = require('../middleware');
const { selectAll, addNews } = require('../controller/NewsController');

const router = express.Router();

router.get('/', selectAll);
router.post('/', isAuthenticated, addNews);

module.exports = router;
