const fs = require('fs');
const json2xml = require('json2xml');
const logger = require('./logger');

const Articles = require('./controllers/Articles');

const ATTRIBUTES_KEY = 'attr';
const DOMAIN = 'https://brus-bany.ru';

exports.generate = async function () {
    const breadcrumbs = [{
        [ATTRIBUTES_KEY]: {
            'url': `${DOMAIN}`,
            'text': 'Главная'
        },
        'breadcrumb': null
    }, {
        [ATTRIBUTES_KEY]: {
            'url': `${DOMAIN}/blog`,
            'text': 'Блог о строительстве бань'
        },
        'breadcrumb': null
    }];

    const renderText = (text) => {
        return text ? '<p>${text}</p>' : ''
    };

    const renderImage = (value) => {
        const { image, description } = value || {};

        return image ? `
            <figure>
                <img src="${image}"/>
                ${description ? `<figcaption>${description}</figcaption>` : ''}
            </figure>
        ` : '';
    };

    const renderMarkerList = (values) => {
        return `
            <ul>
                ${values.map(value => `
                    <li>
                        <p><b>${value.caption}</b></p>
                        <p>${value.text}</p>
                        ${value.image ? renderImage({
                            image: value.image,
                            description: value.imageDescription
                        }) : ''}
                    </li>
                `)}
            </ul>
        `;
    };

    const renderNumericList = (values) => {
        return `
            <ol>
                ${values.map(value => `
                    <li>
                        <p><b>${value.caption}</b></p>
                        <p>${value.text}</p>
                        ${value.image ? renderImage({
                            image: value.image,
                            description: value.imageDescription
                        }) : ''}
                    </li>
                `)}
            </ol>
        `;
    };

    const renderItem = (item) => {
        const { typeId, value } = item || {};

        switch (typeId) {
            case 'text': return renderText(value);
            case 'image': return renderImage(value);
            case 'marker-list': return renderMarkerList(value);
            case 'numeric-list': return renderNumericList(value);
            default: return '';
        }
    };

    const renderBlock = (block) => {
        const { caption, content } = block;

        return `
            <div>
                ${caption ? `<h2>${caption}</h2>` : ''}
                ${content ? content.map((data) => renderItem(data.item)).join('') : ''}
            </div>
        `;
    };

    function renderDate(date) {
        return `${date.getDate()}.${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${date.getFullYear()}`;
    }

    // articles
    let articlesArr = [];
    const {data: articles} = await Articles.getAll();
    articles.forEach(article => {
        const date = article.get('updated');
        const articleUrl = `${DOMAIN}/blog/${article.get('translateName')}`;
        const articleTitle = `${article.article.name}`;

        const articleData = article.get('article');

        articlesArr.push({
            [ATTRIBUTES_KEY]: {
                'turbo': true
            },
            item: [{
                'link': articleUrl
            }, {
                'turbo:source': articleUrl
            }, {
                'turbo:topic': articleTitle
            }, {
                'pubDate': new Date(date).toUTCString()
            }, {
                'metrics': [{
                    [ATTRIBUTES_KEY]: {
                        'schema_identifier': 'Идентификатор'
                    },
                    'yandex': [{
                        'breadcrumblist': [...breadcrumbs, {
                            [ATTRIBUTES_KEY]: {
                                'url': articleUrl,
                                'text': articleTitle
                            },
                            'breadcrumb': null
                        }]
                    }]
                }]
            }/*, {
                'turbo:content': `
                    <![CDATA[
                        <header>
                            <h1>${articleData.name}</h1>
                            ${articleData.description ? `<div>${articleData.description}</div>` : ''}
                            ${articleData.firstImage ? `
                                <figure>
                                    <img src="${articleData.firstImage}"/>
                                </figure>
                            ` : ''}
                            <div data-block="breadcrumblist">
                                <a href="${DOMAIN}">Главная</a>
                                <a href="${DOMAIN}/blog">Блог</a>
                                <a href="${articleUrl}">${articleTitle}</a>
                            </div>
                        </header>
                        ${articleData.content ? `${articleData.content.map((item) => renderBlock(item)).join('')}` : ''}
                        ${date ? `
                            <div>
                                Дата публикации:
                                <time>${renderDate(date)}</time>
                            </div>
                        ` : ''}
                    ]]>
                `
            }*/]
        });
    });

    const data = {
        [ATTRIBUTES_KEY]: {
            'xmlns:yandex': 'http://news.yandex.ru',
            'xmlns:media': 'http://search.yahoo.com/mrss/',
            'xmlns:turbo': 'http://turbo.yandex.ru',
            'version': '2.0'
        },
        'rss': [{
            'channel': [{
                title: 'Блог о строительстве бань'
            }, {
                link: `${DOMAIN}/blog`
            }, {
                description: 'За все время работы мы узнали так много о строительстве бань, что будет не честно, если мы не поделимся этими знаниями с вами'
            }, {
                language: 'ru'
            }, ...articlesArr]
        }]
    };

    fs.writeFile('./public/rss.xml', `<?xml version="1.0" encoding="UTF-8"?>${json2xml(data, {attributes_key: ATTRIBUTES_KEY})}`,
        function (err) {
        if (err) {
            logger.error(`Ошибка генерации RSS: ${err}`, );
        } else {
            logger.success('RSS успешно обновлен!');
        }
    });
};
