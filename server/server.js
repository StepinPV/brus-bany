const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const basicAuth = require('basic-auth');
const schedule = require('node-schedule');

const db = require('./db');
const sitemap = require('./sitemap');
const logger = require('./logger');
const routes = require('./routes');
const config = require('./config');
const renderRoute = require('./renderRoute');

const nodemailer = require('./nodemailer');

const app = express();
const PORT = config.port;

app.set('port', PORT);
app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

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

app.use(morgan('dev'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Статика
if (process.env.NODE_ENV !== 'production') {
    app.use('/', express.static(path.join(__dirname, '../public')));
}

app.use('/admin', auth, function(req, res, next) {
    next();
});

app.use('/api', routes);

app.get('*', renderRoute);

if (process.env.NODE_ENV !== 'production') {
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

sitemap.generate();
schedule.scheduleJob('0 0 * * *', function(){
    sitemap.generate();
});







