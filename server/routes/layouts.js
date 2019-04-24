const express = require('express');
const DB = require('../db');
const logger = require('../logger');

const router = express.Router();
const getCollection = () => DB.getCollection('layouts');

// Все планировки
router.get('/', function(req, res) {
    getCollection().find({}).toArray((err, layouts) => {
        if (err) {
            logger.error(err);
        }

        res.json(layouts);
        res.end();
    });
});

// Получить планировку
router.get('/:name', function(req, res) {
    res.send('Планировка ', req.params.key);
});

module.exports = router;
