const fs = require('fs');
const logger = require('../utils/logger');
const getPageHtml = require('./getPageHtml');

const Pages = require('./controllers/Pages');

let globalUpdatingIndex = 0;

module.exports = async function () {
    globalUpdatingIndex = globalUpdatingIndex + 1;

    logger.info(`\nГенерация pages для сайта ${process.env.NAME}...`);

    // pages
    const { data: pages } = await Pages.getAll();

    const generatePage = async (index, updatingIndex) => {
        const page = pages[index];
        const url = page.get('url');

        if (url) {
            const { html } = await getPageHtml({ path: url, url });

            const name = url.split('/').pop() || 'index';
            const path = url.split('/').splice(0, url.split('/').length - 1).join('/');

            const folder = `./sites/${process.env.NAME}/pages/${path}`;

            if (!fs.existsSync(folder)){
                fs.mkdirSync(folder, { recursive: true });
            }

            fs.writeFile(`${folder}/${name}.html`, html, function (err) {
                if (err) {
                    logger.error(`Ошибка генерации страницы ${url} для сайта ${process.env.NAME}: ${err}`, );
                    return;
                }

                logger.success(`Страница ${index}/${pages.length} ${url} для сайта ${process.env.NAME} сгенерирована`);
            });
        }

        if (index + 1 !== pages.length && updatingIndex === globalUpdatingIndex) {
            setTimeout(() => {
                generatePage(index + 1, updatingIndex);
            }, 2000);
        }
    };

    fs.rmdir(`./sites/${process.env.NAME}/pages/`, { recursive: true }, async () => {
        if (pages.length) {
            await generatePage(0, globalUpdatingIndex)
        }
    });
};
