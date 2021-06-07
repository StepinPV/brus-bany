const fs = require('fs');
const logger = require('../logger');

const Pages = require('../controllers/Pages');
const PageTemplates = require('../controllers/PageTemplates');

exports.generate = async function (domain) {
    logger.info('\nГенерация sitemap.xml...');

    let pagesData = ``;

    const addPages = ({ url, date, changefreq, priority }) => {
        pagesData += `
            <url>
                <loc>${domain}${url}</loc>
                ${date ? `<lastmod>${date.toISOString().split('T')[0]}</lastmod>` : ''}
                <changefreq>${changefreq || 'daily'}</changefreq>
                <priority>${priority || '0.6'}</priority>
            </url>
        `
    };

    // pages
    const { data: pages } = await Pages.getAll();

    for (const page of pages) {
        const pageConfig = page.get('config');
        let priority = pageConfig.priority;

        if (!priority && pageConfig.template) {
            const template = (await PageTemplates.get(pageConfig.template)).data;
            if (template) {
                priority = template.get('priority');
            }
        }

        if (!page.get('test') && page.get('url')) {
            addPages({
                url: page.get('url'),
                date: page.get('updated'),
                changefreq: 'weekly',
                priority
            });
        }
    }

    const data =
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            ${pagesData}
        </urlset>`;

    fs.writeFile('./public/sitemap.xml', data,
        function (err) {
            if (err) {
                logger.error(`Ошибка генерации sitemap.xml: ${err}`, );
            } else {
                logger.success('sitemap.xml успешно обновлен');
            }
        });
};
