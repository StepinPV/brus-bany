const express = require('express');
const path = require('path');
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

const Links = require('./controllers/Links');

const telegramBot = require('./telegram-bot');

const utm = require('./utm');

const sitemap = require('./sitemap');

const yml = require('./feeds/yml');
const google = require('./feeds/google');
const rss = require('./feeds/rss');

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
}));

// Статика
if (process.env.NODE_ENV !== 'production') {
    app.use('/', express.static(path.join(__dirname, '../public')));
}

app.use('/admin', auth, function(req, res, next) {
    next();
});

app.use('/api', routes);

app.get('*', async (req, res, next) => {
    const index = redirects.FROM.indexOf(req.originalUrl);

    if (index !== -1) {
        res.redirect(301, redirects.TO[index]);
    } else if(/^\/link_/.test(req.url)) {
        const { status, data } = await Links.get({ from: req.url });

        if (status === 'success') {
            res.redirect(301, data.get('to'));
        } else {
            next();
        }
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
    logger.success(`\nПодключение к базе данных ${config.db_url}/${config.db_name} установлено`);
    app.listen(PORT);
    logger.success(`Сервис запущен на ${PORT} порту`);
}, (err) => {
    logger.error(`Ошибка подключение к базе данных ${config.db_url}/${config.db_name}:`, err);
});

function generateFeeds() {
    logger.success(`\nГенерация фидов:`);
    sitemap.generate();
    yml.generate();
    google.generate();
    rss.generate();
}

schedule.scheduleJob('0 0 * * *', function(){
    generateFeeds();
});

setTimeout(() => {
    telegramBot.init();
    generateFeeds();
}, 2000);







