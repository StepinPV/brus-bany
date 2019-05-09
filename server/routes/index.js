const express = require('express');
const router = express.Router();

const layouts = require('./layouts');
const materials = require('./materials');
const categories = require('./categories');
const projects = require('./projects');

router.use('/layouts', layouts);
router.use('/materials', materials);
router.use('/categories', categories);
router.use('/projects', projects);

module.exports = router;
