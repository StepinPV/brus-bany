const express = require('express');
const router = express.Router();

const layouts = require('./layouts');
const layoutFormat = require('./layoutFormat');

router.use('/layouts', layouts);
router.use('/layout-format', layoutFormat);

module.exports = router;
