const express = require('express');
const path = require('path');
const app = express();

const db = require('./db');
const logger = require('./logger');
const routes = require('./routes');

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'brus-bany';
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', routes);

db.init(DB_URL, DB_NAME, () => {
    logger.success(`Success connection to ${DB_URL}!`);
    app.listen(PORT);
    logger.success(`Server is started in ${PORT} port!`);
}, (err) => {
    logger.error(`Error connection to ${DB_URL}:`, err);
});


