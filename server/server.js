const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const basicAuth = require('basic-auth');
const schedule = require('node-schedule');

const db = require('./db');
const logger = require('./logger');
const routes = require('./routes');
const config = require('./config');
const renderRoute = require('./renderRoute');
const redirects = require('./redirects');

const nodemailer = require('./nodemailer');
const sms = require('./sms');

const utm = require('./utm');

const sitemap = require('./sitemap');
const yml = require('./yml');
const google = require('./google');
const rss = require('./rss');
const rssCategories = require('./rss-categories');

const app = express();
const PORT = config.port;

app.set('port', PORT);
app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

const auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }

    const user = basicAuth(req);

    // Если пользователь не ввёл пароль или логин, снова показать форму.
    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    return user.name === 'admin' && user.pass === 'brus-bany' ? next() : unauthorized(res);
};

app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

// Статика
if (process.env.NODE_ENV !== 'production') {
    app.use('/', express.static(path.join(__dirname, '../public')));
}

app.use('/admin', auth, function(req, res, next) {
    next();
});

app.use('/api', routes);

app.get('*', (req, res, next) => {
    const index = redirects.FROM.indexOf(req.originalUrl);

    if (index !== -1) {
        res.redirect(301, redirects.TO[index]);
    } else {
        next();
    }
});

app.get('*', utm.middleware);
app.get('*', renderRoute);

if (process.env.NODE_ENV !== 'production') {
    app.use(errorhandler());
}

db.init(config.db_url, config.db_name, () => {
    logger.success(`\nПодключение к базе данных ${config.db_url}/${config.db_name} установлено!`);
    app.listen(PORT);
    logger.success(`Сервис запущен на ${PORT} порту!`);
}, (err) => {
    logger.error(`\nОшибка подключение к базе данных ${config.db_url}/${config.db_name}:`, err);
});

nodemailer.init('smtp.yandex.ru', 465, 'brus-bany.ru', 'Brus@123');
sms.init('5327A0B1-137D-19A9-B7B9-3FE8D2F1CD21');


function generateFeeds() {
    sitemap.generate();
    yml.generate();
    google.generate();
    rss.generate();
    rssCategories.generate();
}

generateFeeds();
schedule.scheduleJob('0 0 * * *', function(){
    generateFeeds();
});







