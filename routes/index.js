const express = require('express');

const { selectAll } = require('../controller/NewsController');

const router = express.Router();

/* GET home page. */
router.get('/', selectAll);

module.exports = router;
