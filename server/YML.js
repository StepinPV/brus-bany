const fs = require('fs');
const json2xml = require('json2xml');
const logger = require('./logger');

const Categories = require('./controllers/Categories');
const Projects = require('./controllers/Projects');

const ATTRIBUTES_KEY = 'attr';
const DOMAIN = 'https://brus-bany.ru';
exports.generate = async function () {
    let categories = [];
    // categories
    const { data: cat } = await Categories.getAll();
    cat.forEach(category => {
        categories.push({
            [ATTRIBUTES_KEY]: {
                id: category.get('translateName')
            },
            category: category.get('name')
        });
    });

    let offers = [];
    // projects
    const { data: projects } = await Projects.getAll({withCategory: true, withLayout: true});

    projects.forEach(project => {
        const layout = project.get('layoutId');
        const category = project.get('categoryId');

        offers.push({
            [ATTRIBUTES_KEY]: {
                id: project.get('_id')
            },
            offer: {
                name: `${category.get('name5')} ${layout.get('name')} ${layout.get('width')}x${layout.get('length')}`,
                url: `${DOMAIN}/bani/${category.get('translateName')}/${layout.get('translateName')}_${layout.get('width')}x${layout.get('length')}`,
                price: project.get('price'),
                currencyId: 'RUR',
                categoryId: category.get('translateName'),
                category: category.get('name'),
                picture: project.get('images').main,
                description: `Построим баню за ${project.get('buildTime')} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость`
            }
        });
    });

    const data = {
        [ATTRIBUTES_KEY]: {
            'date': new Date()
        },
        'yml_catalog': [{
            'shop': {
                name: 'Brus bany',
                company: 'ООО "Русская баня"',
                url: DOMAIN,
                currencies: [{
                    currency: null,
                    [ATTRIBUTES_KEY]: {
                        id: 'RUR',
                        rate: '1'
                    }
                }],
                categories,
                offers
            }
        }]
    };

    fs.writeFile('./public/yml.xml', `<?xml version="1.0" encoding="UTF-8"?>${json2xml(data, {attributes_key: ATTRIBUTES_KEY})}`,
        function (err) {
        if (err) {
            logger.error(`Ошибка генерации YML: ${err}`, );
        } else {
            logger.success('YML успешно обновлен!');
        }
    });
};