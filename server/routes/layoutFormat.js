const express = require('express');
const DB = require('../db');
const logger = require('../logger');

const router = express.Router();
const getCollection = () => DB.getCollection('layoutFormat');

router.get('/', function(req, res) {
    getCollection().find({}).toArray((err, layouts) => {
        if (err) {
            logger.error(err);
        }

        res.json(layouts);
        res.end();
    });
});

module.exports = router;
