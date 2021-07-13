const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const basicAuth = require('basic-auth');
const schedule = require('node-schedule');
const fs = require('fs');

const db = require('../utils/db');
const logger = require('../utils/logger');
const routes = require('./routes');
const { get: getSettings, update: updateSettings } = require('./settings');

const utmMiddleware = require('./middlewares/utm');
const redirectsMiddleware = require('./middlewares/redirects');
const renderMiddleware = require('./middlewares/render');

const sitemap = require('./feeds/sitemap');
const feeds = require('./feeds/feeds');
const robots = require('./feeds/robots');

const removeUnusedImages = require('./removeUnusedImages');
const generatePages = require('./generatePages');

const app = express();
const PORT = process.env.PORT;

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

    if (user.name === 'admin' && user.pass === 'brus-bany') {
        res.cookie('auth', true);
        return next()
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
const publicFolder = path.join(__dirname, `../sites/${process.env.NAME}`);

if (!fs.existsSync(publicFolder)){
    fs.mkdirSync(publicFolder);
}

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(publicFolder, {
        redirect: false,
        index: false
    }));
    app.use(express.static(path.join(__dirname, '../public')));
}

app.use('/admin', auth, function(req, res, next) {
    next();
});

app.use('/api', routes);

app.get('*', redirectsMiddleware);
app.get('*', utmMiddleware.middleware);
app.get('*', renderMiddleware);

if (process.env.NODE_ENV !== 'production') {
    app.use(errorhandler());
}

let serverStarted = false;

const startApp = async () => {
    if (serverStarted) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        app.listen(PORT, () => {
            serverStarted = true;
            logger.success(`\nСайт ${process.env.NAME} запущен на ${PORT} порту`);
            resolve();
        }).on('error', (e) => {
            logger.error(`\nОшибка прослушивания порта ${PORT}: `, e.message);
            process.exit(1);
        });
    });
};

db.init(process.env.DB_URL, process.env.NAME, async () => {
    await startApp();
    await updateSettings();
    await generateFeeds();
    await generatePages();
});

async function generateFeeds() {
    const settings = await getSettings();
    await robots.generate(settings.domain);
    await sitemap.generate(settings.domain);
    await feeds.generate();
}

schedule.scheduleJob('0 0 * * *', async function(){
    await generateFeeds();
});

schedule.scheduleJob('0 1 * * *', async function(){
    await removeUnusedImages();
});

setInterval(() => {
    console.log(`Данные для ${process.env.NAME} от ${new Date().toLocaleString()}:`)
    const used = process.memoryUsage();
    let res = '';
    for (let key in used) {
        res += `${res ? ', ' : ''}${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`;
    }
    console.log(res);
}, 60000)



