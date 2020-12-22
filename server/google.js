const fs = require('fs');
const json2xml = require('json2xml');
const logger = require('./logger');

const Categories = require('./controllers/Categories');
const Projects = require('./controllers/Projects');

const ATTRIBUTES_KEY = 'attr';
const DOMAIN = 'https://brus-bany.ru';
exports.generate = async function () {
    let offers = [];
    // projects
    const { data: projects } = await Projects.getAll({withCategory: true, withLayout: true});

    projects.forEach(project => {
        const layout = project.get('layoutId');
        const category = project.get('categoryId');

        const name = category.get('name');
        const name2 = category.get('name2');
        const price = project.prices && category.complectationBlocks && project.prices[category.complectationBlocks.defaultItemId] ? project.prices[category.complectationBlocks.defaultItemId] : 0;

        offers.push({
            item: {
                'g:id': project.get('_id').toString(),
                'g:title': `${name2[0].toUpperCase() + name2.slice(1)} ${layout.get('name')} ${layout.get('width')}x${layout.get('length')}`,
                'g:description': `Построим баню за ${project.get('buildTime')} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость`,
                'g:link': `${DOMAIN}${category.get('translateName') !== 'doma-iz-brusa' ? '/bani' : ''}/${category.get('translateName')}/${layout.get('translateName')}_${layout.get('width')}x${layout.get('length')}`,
                'g:image_link': `${DOMAIN}${project.get('images').main}`,
                'g:availability': 'in stock',
                'g:price': `${price} RUB`,
                'g:condition': 'new',
                'g:google_product_category': `114`,
                'g:product_type': `${name[0].toUpperCase() + name.slice(1)}`,
                'g:identifier_exists': `false`,
                'g:brand': 'Брус бани'
            }
        });
    });

    const data = {
        [ATTRIBUTES_KEY]: {
            'xmlns:g': 'http://base.google.com/ns/1.0',
            'version': '2.0'
        },
        'rss': [{
            'channel': [{
                title: 'Брус бани - строительство бань под ключ'
            }, {
                url: DOMAIN
            }, {
                description: 'Строим недорогие бани под ключ по всей России. Более 150 проектов бань с гарантией 3 года. Собственное производство и самые опытные строительные бригады.'
            }, ...offers]
        }]
    };

    fs.writeFile('./public/google.xml', `<?xml version="1.0"?>${json2xml(data, {attributes_key: ATTRIBUTES_KEY})}`,
        function (err) {
        if (err) {
            logger.error(`Ошибка генерации Google feed: ${err}`, );
        } else {
            logger.success('Google feed успешно обновлен');
        }
    });
};
