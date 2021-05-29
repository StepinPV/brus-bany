const express = require('express');
const router = express.Router();

router.use('/layouts', require('./layouts'));
router.use('/categories', require('./categories'));
router.use('/projects', require('./projects'));
router.use('/upload-image', require('./image-uploader'));
router.use('/requests', require('./requests'));
router.use('/pages', require('./pages'));
router.use('/components', require('./components'));
router.use('/page-templates', require('./page-templates'));
router.use('/page-folders', require('./page-folders'));
router.use('/links', require('./links'));

module.exports = router;
