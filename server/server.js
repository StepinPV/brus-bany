const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const basicAuth = require('basic-auth');

const db = require('./db');
const logger = require('./logger');
const routes = require('./routes');
const config = require('./config');

const nodemailer = require('./nodemailer');

const app = express();
const PORT = process.env.PORT || config.port;

app.set('port', PORT);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }

    const user = basicAuth(req);

    // Если пользователь не ввёл пароль или логин, снова показать форму.
    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    return user.name === 'admin' && user.pass === 'brus-bany' ? next() : unauthorized(res);
};

app.use('/admin', auth, function(req, res, next) {
    next();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', routes);

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}

db.init(config.db_url, config.db_name, () => {
    logger.success(`\nSuccess connection to ${config.db_url}/${config.db_name}!`);
    app.listen(PORT);
    logger.success(`Server is started in ${PORT} port!`);
}, (err) => {
    logger.error(`\nError connection to ${config.db_url}/${config.db_name}:`, err);
});

nodemailer.init('smtp.yandex.ru', 465, 'brus-bany.ru', 'Brus@123');





