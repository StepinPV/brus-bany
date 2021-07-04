const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const basicAuth = require('basic-auth');
const { fork, exec } = require('child_process');

// const db = require('../utils/db');
const logger = require('../utils/logger');
// const routes = require('./routes');
const config = require('./config');
// const render = require('./render');

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

// app.use('/api', routes);

// app.get('*', render);

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
            logger.success(`\nСервис администрирования запущен на ${PORT} порту`);
            resolve();
        }).on('error', (e) => {
            logger.error(`\nОшибка прослушивания порта ${PORT}: `, e.message);
            process.exit(1);
        });
    });
};

const startSite = (config) => {
    let site;

    const restartSite = () => {
        if (site) {
            site.kill();
        }

        site = fork('./server/server', {
            env: {
                ...process.env,
                ...config
            }
        });

        console.info(`Процесс с сайтом ${config.NAME} запущен.`)

        let cpuCount = 0;

        site.on('close', (code) =>
            console.info(`Процесс с сайтом ${config.NAME} завершен. Код: ${code}`)
        );

        const intervalId = setInterval(() => {
            exec(`ps -o %cpu,%mem -p ${site.pid}`, (error, stdout, stderr) => {
                if (error || stderr) {
                    logger.error(`Ошибка проверки статуса процесса ${config.NAME}: ${error}`);
                    clearInterval(intervalId);
                    restartSite();
                    return;
                }

                const res = stdout.split('\n')[1].trim().split('  ');

                const cpu = parseFloat(res[0]);

                if (cpu > 25) {
                    cpuCount++;
                } else{
                    cpuCount = 0;
                }

                if (cpuCount >= 4) {
                    logger.error(`Процесса ${config.NAME} завис, перезапускаем...: ${error}`);
                    clearInterval(intervalId);
                    restartSite();
                }
            });
        }, 5000);
    }

    restartSite();
}

/* db.init(`${config.db_url}/${config.db_name}`, 'Админка', async () => {
    await startApp();
    restartSite();
}); */

(async () => {
    const sites = [{
        NAME: 'brus-bany',
        DB_URL: `${config.db_url}/brus-bany`,
        PORT: 3000
    }, {
        NAME: 'stanki-stark',
        DB_URL: `${config.db_url}/stanki-stark`,
        PORT: 3001,
        NODE_ENV: 'development'
    }];

    // await startApp();
    for (const site of sites) {
        startSite(site);
    }
})();







