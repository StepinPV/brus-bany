const fs = require('fs');
const logger = require('../../utils/logger');

exports.generate = async function (domain) {
    logger.info(`\nГенерация robots.txt для сайта ${process.env.NAME}...`);

    let data = '';

    data += 'User-agent: *\n';
    data += 'Disallow: /admin*\n';
    data += 'Disallow: /api*\n';
    data += 'Disallow: /*?*\n';
    data += 'Disallow: /link_*\n';
    data += `Sitemap: ${domain}/sitemap.xml`;

    return new Promise((resolve, reject) => {
        fs.writeFile(`./sites/${process.env.NAME}/robots.txt`, data,
            function (err) {
                if (err) {
                    logger.error(`Ошибка генерации robots.txt для сайта ${process.env.NAME}: ${err}`);
                    reject();
                } else {
                    logger.success(`robots.txt успешно для сайта ${process.env.NAME} обновлен`);
                    resolve();
                }
            });
    });
};
