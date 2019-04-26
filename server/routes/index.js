const express = require('express');
const router = express.Router();

const layouts = require('./layouts');

router.use('/layouts', layouts);

module.exports = router;
