const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');

const db = require('./db');
const logger = require('./logger');
const routes = require('./routes');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || config.port;

app.set('port', PORT);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', routes);

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}

db.init(config.db_url, config.db_name, () => {
    logger.success(`Success connection to ${config.db_url}!`);
    app.listen(PORT);
    logger.success(`Server is started in ${PORT} port!`);
}, (err) => {
    logger.error(`Error connection to ${config.db_url}:`, err);
});


