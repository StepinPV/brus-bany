const fs = require('fs');
const logger = require('../logger');

const Categories = require('../controllers/Categories');
const Projects = require('../controllers/Projects');
const Pages = require('../controllers/Pages');
const PageTemplates = require('../controllers/PageTemplates');

const DOMAIN = 'https://brus-bany.ru';

function getLastDate(dates) {
    return dates.reduce((maxDate, current) => {
        return new Date(current) > new Date(maxDate) ? current : maxDate
    }, dates[0])
}

exports.generate = async function () {
    let pagesData = ``;

    const addPages = ({ url, date, changefreq, priority }) => {
        pagesData += `
            <url>
                <loc>${DOMAIN}${url}</loc>
                ${date ? `<lastmod>${date.toISOString().split('T')[0]}</lastmod>` : ''}
                <changefreq>${changefreq || 'daily'}</changefreq>
                <priority>${priority || '0.6'}</priority>
            </url>
        `
    };

    // categories
    const {data: categories} = await Categories.getAll();
    categories.forEach(category => {
        addPages({ url: `${category.get('translateName') !== 'doma-iz-brusa' ? '/bani' : ''}/${category.get('translateName')}`, date: category.get('updated'), changefreq: 'daily', priority: '0.9' });

        let addFilterPages = (filterGroups, href) => {
            if (filterGroups && filterGroups.length) {
                filterGroups.forEach(filterGroup => {
                    if (filterGroup.filters && filterGroup.filters.length) {
                        filterGroup.filters.forEach(filter => {
                            addPages({ url: `${href}/${filter.id}`, date: category.get('updated'), changefreq: 'daily', priority: '0.9' });
                            addFilterPages(filter.filters, `${href}/${filter.id}`);
                        });
                    }
                });
            }
        };

        addFilterPages(category.get('filters'), `${category.get('translateName') !== 'doma-iz-brusa' ? '/bani' : ''}/${category.get('translateName')}`);
    });

    // projects
    const {data: projects} = await Projects.getAll({withCategory: true, withLayout: true});

    projects.forEach(project => {
        const layout = project.get('layoutId');
        const category = project.get('categoryId');

        addPages({
            url: `${category.get('translateName') !== 'doma-iz-brusa' ? '/bani' : ''}/${category.get('translateName')}/${layout.get('translateName')}_${layout.get('width')}x${layout.get('length')}`,
            date: getLastDate([category.get('updated'), layout.get('updated'), project.get('updated')]),
            changefreq: 'weekly',
            priority: '0.8'
        });
    });

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

        addPages({
            url: page.get('url'),
            date: page.get('updated'),
            changefreq: 'monthly',
            priority: priority || '0.6'
        });
    }

    const data =
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            ${pagesData}
        </urlset>`;

    fs.writeFile('./public/sitemap.xml', data,
        function (err) {
            if (err) {
                logger.error(`Ошибка генерации sitemap: ${err}`, );
            } else {
                logger.success('Sitemap успешно обновлен');
            }
        });
};
