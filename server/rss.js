const fs = require('fs');
const logger = require('./logger');

const Articles = require('./controllers/Articles');

const DOMAIN = 'https://brus-bany.ru';
const YMetricId = '49126414';

function renderDate(date) {
    const monthA = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${date.getDate()} ${monthA[date.getMonth()]} ${date.getFullYear()}`;
}

exports.generate = async function () {
    const renderText = (text) => {
        return text ? `<p>${text}</p>` : ''
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
                        ${value.caption ? `<p><b>${value.caption}</b></p>` : ''}
                        ${value.text ? `<p>${value.text}</p>` : ''}
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
                        ${value.caption ? `<p><b>${value.caption}</b></p>` : ''}
                        ${value.text ? `<p>${value.text}</p>` : ''}
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
            ${caption ? `<h2>${caption}</h2>` : ''}
            ${content ? content.map((data) => renderItem(data.item)).join('') : ''}
        `;
    };

    const renderCard = ({ article, created, translateName }) => {
        return `
            <div data-block="card">
                <img src="${article.image}">
                <span>${renderDate(created)}</span>
                <h2>${article.name}</h2>
                <p>${article.imageDescription}</p>
                <footer>
                    <a href="/blog/${translateName}">Читать полностью</a>
                </footer>
            </div>
            <div data-block="card">
                <figure data-turbo-ad-id="first_ad_block"></figure>
            </div>
        `;
    };

    const { data: articles } = await Articles.getAll();

    // articles
    let items = '';
    let lastArticle;

    articles.forEach(article => {
        const date = article.get('updated');
        const articleUrl = `${DOMAIN}/blog/${article.get('translateName')}`;
        const articleTitle = `${article.article.name}`;

        const articleData = article.get('article');

        if (!lastArticle || lastArticle < date) {
            lastArticle = date;
        }

        items += `
            <item turbo="true">
                <link>${articleUrl}</link>
                <turbo:source>${articleUrl}</turbo:source>
                <turbo:topic>${articleTitle}</turbo:topic>
                <pubDate>${new Date(date).toUTCString()}</pubDate>
                <metrics>
                    <yandex schema_identifier="49126414">
                        <breadcrumblist>
                            <breadcrumb url="${DOMAIN}" text="Главная"/>
                            <breadcrumb url="${DOMAIN}/blog" text="Блог о строительстве бань"/>
                            <breadcrumb url="${articleUrl}" text="${articleTitle}"/>
                        </breadcrumblist>
                    </yandex>
                </metrics>
                <turbo:content>
                    <![CDATA[
                        <header>
                            <h1>${articleData.name}</h1>
                            ${articleData.description ? `<p>${articleData.description}</p>` : ''}
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
                        <div data-block="share" data-network="facebook, odnoklassniki, vkontakte"></div>
                    ]]>
                </turbo:content>
            </item>
        `;
    });

    const mainPage = `
        <item turbo="true">
            <link>${DOMAIN}/blog</link>
            <turbo:source>${DOMAIN}/blog</turbo:source>
            <turbo:topic>Блог о строительстве бань</turbo:topic>
            <pubDate>${new Date(lastArticle).toUTCString()}</pubDate>
            <metrics>
                <yandex schema_identifier="49126414">
                    <breadcrumblist>
                        <breadcrumb url="${DOMAIN}" text="Главная"/>
                        <breadcrumb url="${DOMAIN}/blog" text="Блог о строительстве бань"/>
                    </breadcrumblist>
                </yandex>
            </metrics>
            <turbo:content>
                <![CDATA[
                    <header>
                        <h1>Блог о строительстве бань</h1>
                        <p>За все время работы мы узнали так много о технологиях строительства бань, что будет просто не честно, если этими знаниями мы не поделимся с вами</p>
                        <div data-block="breadcrumblist">
                            <a href="${DOMAIN}">Главная</a>
                        </div>
                    </header>
                    ${articles ? `<div data-block="cards">${articles.map((article) => renderCard(article)).join('')}</div>` : ''}
                ]]>
            </turbo:content>
        </item>
    `;

    const data =
        `<?xml version="1.0" encoding="UTF-8"?>
            <rss xmlns:yandex="http://news.yandex.ru" xmlns:media="http://search.yahoo.com/mrss/" xmlns:turbo="http://turbo.yandex.ru" version="2.0">
            <channel>
                <title>Блог о строительстве бань</title>
                <link>${DOMAIN}/blog</link>
                <description>
                    За все время работы мы узнали так много о строительстве бань, что будет не честно, если мы не поделимся этими знаниями с вами
                </description>
                <language>ru</language>
                <turbo:analytics type="Yandex" id="${YMetricId}"/>
                ${mainPage}
                ${items}
            </channel>
        </rss>`
    ;

    fs.writeFile('./public/rss.xml', data,
        function (err) {
            if (err) {
                logger.error(`Ошибка генерации RSS: ${err}`, );
            } else {
                logger.success('RSS успешно обновлен!');
            }
        });
};
