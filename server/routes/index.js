const express = require('express');
const router = express.Router();

router.use('/layouts', require('./layouts'));
router.use('/categories', require('./categories'));
router.use('/projects', require('./projects'));
router.use('/articles', require('./articles'));
router.use('/photos', require('./photos'));
router.use('/upload-image', require('./image-uploader'));
router.use('/requests', require('./requests'));

module.exports = router;
