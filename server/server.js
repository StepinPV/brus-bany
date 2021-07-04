const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const basicAuth = require('basic-auth');
const schedule = require('node-schedule');
const fs = require('fs');

const db = require('./db');
const logger = require('../utils/logger');
const routes = require('./routes');
const config = require('./config');
const renderRoute = require('./renderRoute');
const { get: getSettings, update: updateSettings } = require('./settings');

const Links = require('./controllers/Links');

const utm = require('./utm');

const sitemap = require('./feeds/sitemap');
const feeds = require('./feeds/feeds');
const robots = require('./feeds/robots');

const app = express();
const PORT = process.env.PORT || config.port;

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
const publicFolder = path.join(__dirname, `../sites/${process.env.NAME}`);

if (!fs.existsSync(publicFolder)){
    fs.mkdirSync(publicFolder);
}

if (process.env.NODE_ENV !== 'production') {
    app.use('/', express.static(publicFolder));
    app.use('/', express.static(path.join(__dirname, '../public')));
}

app.use('/admin', auth, function(req, res, next) {
    next();
});

app.use('/api', routes);

app.get('*', async (req, res, next) => {
    const settings = await getSettings();

    let redirectMatch;
    if (settings.redirects) {
        do {
            const match = settings.redirects.find(item => {
                if (new RegExp('^' + item.from).test(redirectMatch ? redirectMatch.to : req.originalUrl)) {
                    return true;
                }
            });

            if (match) {
                redirectMatch = match;
            } else {
                break;
            }
        } while(true);
    }

    if (redirectMatch) {
        res.redirect(301, redirectMatch.to);
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

let serverStarted = false;

const startApp = async () => {
    if (serverStarted) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        app.listen(PORT, () => {
            serverStarted = true;
            logger.success(`\nСервис запущен на ${PORT} порту`);
            resolve();
        }).on('error', (e) => {
            logger.error(`\nОшибка прослушивания порта ${PORT}: `, e.message);
            process.exit(1);
        });
    });
};

db.init(config.db_url, process.env.NAME || config.db_name, async () => {
    await startApp();
    await updateSettings();
    await generateFeeds();
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







