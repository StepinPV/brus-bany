const fs = require('fs');
const json2xml = require('json2xml');
const logger = require('./logger');

const Articles = require('./controllers/Articles');
const Categories = require('./controllers/Categories');
const Photos = require('./controllers/Photos');
const Projects = require('./controllers/Projects');

const ATTRIBUTES_KEY = 'attr';
const DOMAIN = 'https://brus-bany.ru';

function getURLObject(url, date, dateIsString) {
    return {
        'url': [{
            'loc': `${DOMAIN}${url}`,
            ...(date ? {
                'lastmod': dateIsString ? date : date.toISOString().split('T')[0]
            } : {})
        }]
    }
}

function getLastDate(dates) {
    return dates.reduce((maxDate, current) => {
        return new Date(current) > new Date(maxDate) ? current : maxDate
    }, dates[0])
}

const data = {
    [ATTRIBUTES_KEY]: {
        'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
    },
    'urlset': [
        getURLObject('/', '2019-12-08', true),
        getURLObject('/bani/individualnyy-proekt', '2019-12-08', true),
        getURLObject('/rekvizity', '2019-12-08', true),
        getURLObject('/usloviya-oplaty', '2019-12-08', true),
        getURLObject('/vakansii', '2019-12-08', true),
        getURLObject('/politika-konfidencialnosti', '2019-12-08', true),
        getURLObject('/dostavka', '2019-12-08', true),
        getURLObject('/kontakty', '2019-12-08', true),
        getURLObject('/akcii', '2019-12-08', true),
        getURLObject('/akcii/quiz', '2019-12-08', true),
        getURLObject('/akcii', '2019-12-08', true),
        getURLObject('/o-companii', '2019-12-08', true),
        getURLObject('/voprosy-i-otvety', '2019-12-08', true),
        getURLObject('/gosty-i-snipy', '2019-12-08', true),
        getURLObject('/blog', '2019-12-08', true),
        getURLObject('/photos', '2019-12-08', true)]
};

exports.generate = async function () {
    // articles
    const {data: articles} = await Articles.getAll();
    articles.forEach(article => {
        data.urlset.push(getURLObject(`/blog/${article.get('translateName')}`, article.get('updated')));
    });

    // categories
    const {data: categories} = await Categories.getAll();
    categories.forEach(category => {
        data.urlset.push(getURLObject(`/bani/${category.get('translateName')}`, category.get('updated')));
    });

    // photos
    for (let i = 0; i < categories.length; i++) {
        const {data: photos} = await Photos.getAllForCategory(categories[i].get('_id').toString());

        if (photos && photos.length) {
            const dates = photos.map(photo => photo.get('updated'));
            dates.push(categories[i].get('updated'));

            data.urlset.push(getURLObject(`/photos/${categories[i].get('translateName')}`, getLastDate(dates)));
        }
        const {data: photosAll} = await Photos.getAll({withCategory: true, withProject: true, withLayout: true});

        photosAll.forEach(photo => {
            const project = photo.get('projectId');
            const layout = project.get('layoutId');
            const category = project.get('categoryId');
            data.urlset.push(getURLObject(
                `/photos/${category.get('translateName')}/${layout.get('translateName')}_${layout.get('width')}x${layout.get('length')}_${photo.get('_id')}`,
                getLastDate([category.get('updated'), layout.get('updated'), photo.get('updated')])
            ));
        });
    }

    // projects
    const {data: projects} = await Projects.getAll({withCategory: true, withLayout: true});

    projects.forEach(project => {
        const layout = project.get('layoutId');
        const category = project.get('categoryId');

        data.urlset.push(getURLObject(
            `/bani/${category.get('translateName')}/${layout.get('translateName')}_${layout.get('width')}x${layout.get('length')}`,
            getLastDate([category.get('updated'), layout.get('updated'), project.get('updated')])
        ));
    });

    fs.writeFile('./public/sitemap.xml', json2xml(data, {attributes_key: ATTRIBUTES_KEY}), function (err) {
        if (err) {
            logger.error('Ошибка генерации sitemap', err);
        } else {
            logger.success('Sitemap успешно обновлен!');
        }
    });
};
