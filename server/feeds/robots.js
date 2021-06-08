const fs = require('fs');
const logger = require('../logger');

exports.generate = async function (domain) {
    logger.info('\nГенерация robots.txt...');

    let data = '';

    data += 'User-agent: *\n';
    data += 'Disallow: /admin*\n';
    data += 'Disallow: /test*\n';
    data += 'Disallow: /api*\n';
    data += 'Disallow: /link_*\n';
    data += 'Disallow: /thanks\n';
    data += 'Disallow: /*?*\n';
    data += `Sitemap: ${domain}/sitemap.xml`;

    return new Promise((resolve, reject) => {
        fs.writeFile('./public/robots.txt', data,
            function (err) {
                if (err) {
                    logger.error(`Ошибка генерации robots.txt: ${err}`);
                    reject();
                } else {
                    logger.success('robots.txt успешно обновлен');
                    resolve();
                }
            });
    });
};
