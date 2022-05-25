const express = require('express');

const { selectAll } = require('../controller/NewsController');

const router = express.Router();

router.get('/', selectAll);

module.exports = router;
