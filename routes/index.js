const express = require('express');

const selectAll = require('../controller/NewsController').selectAll;

const router = express.Router();

/* GET home page. */
router.get('/', selectAll);

module.exports = router;
