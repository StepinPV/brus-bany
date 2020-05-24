const fs = require('fs');
const json2xml = require('json2xml');
const logger = require('./logger');

const Articles = require('./controllers/Articles');
const Categories = require('./controllers/Categories');
const Photos = require('./controllers/Photos');
const Projects = require('./controllers/Projects');
const Pages = require('./controllers/Pages');

const ATTRIBUTES_KEY = 'attr';
const DOMAIN = 'https://brus-bany.ru';

function getURLObject({ url, date, dateIsString, changefreq, priority }) {
    return {
        'url': [{
            'loc': `${DOMAIN}${url}`,
            ...(date ? {
                'lastmod': dateIsString ? date : date.toISOString().split('T')[0]
            } : {}),
            ...(changefreq ? {
                'changefreq': changefreq
            } : {}),
            ...(priority ? {
                'priority': priority
            } : {})
        }]
    }
}

function getLastDate(dates) {
    return dates.reduce((maxDate, current) => {
        return new Date(current) > new Date(maxDate) ? current : maxDate
    }, dates[0])
}

exports.generate = async function () {
    const data = {
        [ATTRIBUTES_KEY]: {
            'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
        },
        'urlset': []
    };

    // articles
    let lastArticle;
    const {data: articles} = await Articles.getAll();
    articles.forEach(article => {
        const date = article.get('updated');

        if (!lastArticle || lastArticle < date) {
            lastArticle = date;
        }

        data.urlset.push(getURLObject({ url: `/blog/${article.get('translateName')}`, date, changefreq: 'monthly', priority: '0.7' }));
    });

    // categories
    const {data: categories} = await Categories.getAll();
    categories.forEach(category => {
        data.urlset.push(getURLObject({ url: `/bani/${category.get('translateName')}`, date: category.get('updated'), changefreq: 'daily', priority: '0.9' }));

        let addFilterPages = (filterGroups, href) => {
            if (filterGroups && filterGroups.length) {
                filterGroups.forEach(filterGroup => {
                    if (filterGroup.filters && filterGroup.filters.length) {
                        filterGroup.filters.forEach(filter => {
                            data.urlset.push(getURLObject({ url: `${href}/${filter.id}`, date: category.get('updated'), changefreq: 'daily', priority: '0.9' }));
                            addFilterPages(filter.filters, `${href}/${filter.id}`);
                        });
                    }
                });
            }
        };

        addFilterPages(category.get('filters'), `/bani/${category.get('translateName')}`);
    });

    // photos
    let lastPhoto;
    for (let i = 0; i < categories.length; i++) {
        const {data: photos} = await Photos.getAllForCategory(categories[i].get('_id').toString());

        if (photos && photos.length) {
            const dates = photos.map(photo => photo.get('updated'));
            dates.push(categories[i].get('updated'));

            data.urlset.push(getURLObject({ url: `/photos/${categories[i].get('translateName')}`, date: getLastDate(dates), changefreq: 'daily', priority: '0.9' }));
        }
    }

    const {data: photosAll} = await Photos.getAll({withCategory: true, withProject: true, withLayout: true});
    photosAll.forEach(photo => {
        const project = photo.get('projectId');
        const layout = project.get('layoutId');
        const category = project.get('categoryId');

        const last = getLastDate([category.get('updated'), layout.get('updated'), photo.get('updated')]);

        if (!lastPhoto || lastPhoto < last) {
            lastPhoto = last;
        }

        data.urlset.push(getURLObject({
            url: `/photos/${category.get('translateName')}/${layout.get('translateName')}_${layout.get('width')}x${layout.get('length')}_${photo.get('_id')}`,
            date: last,
            changefreq: 'monthly',
            priority: '0.7'
        }));
    });

    // projects
    const {data: projects} = await Projects.getAll({withCategory: true, withLayout: true});

    projects.forEach(project => {
        const layout = project.get('layoutId');
        const category = project.get('categoryId');

        data.urlset.push(getURLObject({
            url: `/bani/${category.get('translateName')}/${layout.get('translateName')}_${layout.get('width')}x${layout.get('length')}`,
            date: getLastDate([category.get('updated'), layout.get('updated'), project.get('updated')]),
            changefreq: 'weekly',
            priority: '0.8'
        }));
    });

    // pages
    const { data: pages } = await Pages.getAll();

    pages.forEach(page => {
        data.urlset.push(getURLObject({
            url: page.get('url'),
            date: page.get('updated'),
            changefreq: 'monthly',
            priority: '0.6'
        }));
    });

    // main
    data.urlset.push(getURLObject({ url: '/', date: getLastDate([lastArticle, lastPhoto]), changefreq: 'daily', priority: '1.0' }));
    //photos
    data.urlset.push(getURLObject({ url: '/photos', date: lastPhoto, changefreq: 'daily', priority: '0.9' }));
    //articles
    data.urlset.push(getURLObject({ url: '/blog', date: lastArticle, changefreq: 'daily', priority: '0.9' }));

    fs.writeFile('./public/sitemap.xml', json2xml(data, {attributes_key: ATTRIBUTES_KEY}), function (err) {
        if (err) {
            logger.error(`Ошибка генерации sitemap: ${err}`, );
        } else {
            logger.success('Sitemap успешно обновлен!');
        }
    });
};
