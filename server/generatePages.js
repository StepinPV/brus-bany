const fs = require('fs');
const logger = require('../utils/logger');
const getPageHtml = require('./getPageHtml');

const Pages = require('./controllers/Pages');

let interval;

module.exports = async function () {
    if (interval) {
        clearInterval(interval);
    }

    logger.info(`\nГенерация pages для сайта ${process.env.NAME}...`);

    fs.rmdir(`./sites/${process.env.NAME}/pages/`, { recursive: true }, async () => {
        // pages
        const { data: pages } = await Pages.getAll();
        let pageIndex = 0;

        if (pages.length) {
            interval = setInterval(async () => {
                const page = pages[pageIndex];
                const url = page.get('url');

                if (url) {
                    const { html } = await getPageHtml({ path: url, url });

                    const name = url.split('/').pop() || 'index';
                    const path = url.split('/').splice(0, url.split('/').length - 1).join('/');

                    const folder = `./sites/${process.env.NAME}/pages/${path}`;

                    if (!fs.existsSync(folder)){
                        fs.mkdirSync(folder, { recursive: true });
                    }

                    fs.writeFile(`${folder}/${name}.html`, html,
                        function (err) {
                            if (err) {
                                logger.error(`Ошибка генерации страницы ${url} для сайта ${process.env.NAME}: ${err}`, );
                                return;
                            }

                            logger.success(`${Math.trunc(pageIndex/pages.length * 100)}% Страница ${url} для сайта ${process.env.NAME} сгенерирована`);
                        });
                }

                pageIndex++;

                if (pageIndex >= pages.length) {
                    clearInterval(interval);
                }
            }, 500);
        }
    });
};
