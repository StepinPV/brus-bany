const fs = require('fs');
const logger = require('./logger');
const renderArticleContent = require('./turbo/renderArticleContent');

const Categories = require('./controllers/Categories');
const Projects = require('./controllers/Projects');
const Photos = require('./controllers/Photos');

const DOMAIN = 'https://brus-bany.ru';
const YMetricId = '49126414';

function sortProjects(projects){
    return projects.sort((a, b) => {
        const aW = a.layoutId.width;
        const aL = a.layoutId.length;

        const bW = b.layoutId.width;
        const bL = b.layoutId.length;

        if (aW > bW) return 1;
        if (aW === bW) {
            if (aL > bL) return 1;
            if (aL === bL) return 0;
            if (aL < bL) return -1;
        }
        if (aW < bW) return -1;
    });
}

function filterProjects(filter, projects){
    return projects.filter(project => {
        // eslint-disable-next-line
        const params = project.layoutId;
        // eslint-disable-next-line
        return eval(filter.condition);
    });
}

function wordByNumber(number, word1, word2, word3) {
    const tens = number % 100;
    const ones = tens % 10;
    if (ones === 0 || ones >= 5 || tens > 10 && tens < 20) {
        return word3 || word2 || word1;
    }
    if (ones > 1 && ones < 5) {
        return word2 || word1;
    }

    return word1;
}

function renderInfoTitle(project){
    const { layoutId } = project;
    const { terrace, attic, porch } = layoutId;

    if (terrace && attic && porch) {
        return ' c террасой, мансардой и крыльцом';
    } else if (terrace && attic) {
        return ' c террасой и мансардой';
    } else if (terrace && porch) {
        return ' c террасой и крыльцом';
    } else if (terrace) {
        return ' c террасой';
    } else if (attic && porch) {
        return ' c мансардой и крыльцом';
    } else if (attic) {
        return ' c мансардой';
    } else if (porch) {
        return ' c крыльцом';
    }

    return '';
}

function numberWithSpaces(x, space=' ') {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, space);
    return parts.join(".");
}

function getTitle(category, filter) {
    let title = category.name;

    if (filter) {
        title += ` ${filter.name.toLowerCase()}`;
    }

    return title;
}

function sortByDate(items, field='created') {
    return items.sort((a, b) => {
        const aDate = new Date(a[field]);
        const bDate = new Date(b[field]);

        if (aDate > bDate) return -1;
        if (aDate === bDate) return 0;
        if (aDate < bDate) return 1;
    });
}

exports.generate = async function () {
    const renderCard = (category, project) => {
        const { layoutId, images, prices } = project;
        const { complectationBlocks } = category;

        return `
            <div data-block="card">
                ${images && images['card'] ? `<img src="${images['card']}" />` : ''}
                <span>${category.name2} ${layoutId.width}x${layoutId.length}${renderInfoTitle(project)} ${layoutId.name.replace(/ /g, '&nbsp')}</span>
                <p>Площадь: ${layoutId.area}м<sup>2</sup></p>
                <p><b>От ${prices && complectationBlocks && prices[complectationBlocks.defaultItemId] ? numberWithSpaces(prices[complectationBlocks.defaultItemId]) : 0} руб</b></p>
                <footer>
                    <a href="/bani/${category.translateName}/${layoutId['translateName']}_${layoutId.width}x${layoutId.length}">Перейти к проекту</a>
                </footer>
            </div>
            <div data-block="card">
                <figure data-turbo-ad-id="first_ad_block"></figure>
            </div>
        `;
    };

    const renderCards = (category, projects) => {
        return `
            <div data-block="cards">${projects.map((project) => renderCard(category, project)).join('')}</div>
        `;
    };

    const renderPhoto = (category, photo) => {
        const { mainPhoto, _id, projectId } = photo;
        const { layoutId } = projectId;

        return `
            <div data-block="snippet"
                 data-title="${category.name2} ${layoutId.name} ${layoutId.width}x${layoutId.length}"
                 data-img="${mainPhoto}"
                 data-url="${`/photos/${category.translateName}/${layoutId.translateName}_${layoutId.width}x${layoutId.length}_${_id}`}">
            </div>
        `;
    };

    const renderPhotos = (category, header, photos) => {
        return `
            <div data-block="cards">
                <div data-block="carousel">
                    <header>${header}</header>
                    ${photos.map((photo) => renderPhoto(category, photo)).join('')}
                </div>
            </div>
        `;
    };

    const renderArticle = (article) => {
        return `
            <h2>${article.name}</h2>
            ${article.description ? `<p>${article.description}</p>` : ''}
            ${article.firstImage ? `
                <figure>
                    <img src="${article.firstImage}"/>
                </figure>
            ` : ''}
            ${renderArticleContent(article.content, 'h3')}
        `;
    };

    const renderCategory = ({ category, link, title, date, name, translateName, filter, projects, photos }) => {
        return `
            <item turbo="true">
                <link>${link}</link>
                <turbo:source>${link}</turbo:source>
                <turbo:topic>${title}</turbo:topic>
                <pubDate>${new Date(date).toUTCString()}</pubDate>
                <metrics>
                    <yandex schema_identifier="49126414">
                        <breadcrumblist>
                            <breadcrumb url="${DOMAIN}" text="Главная"/>
                            <breadcrumb url="${DOMAIN}/bani" text="Категории бань"/>
                            <breadcrumb url="${DOMAIN}/bani/${translateName}" text="${name}"/>
                            ${filter ? `<breadcrumb url="${filter.translateName}" text="${filter.name}" />` : ''}
                        </breadcrumblist>
                    </yandex>
                </metrics>
                <turbo:content>
                    <![CDATA[
                        <h1>${title}</h1>
                        <p>${projects.length} ${wordByNumber(projects.length, 'проект', 'проекта', 'проектов')} бань на любой вкус.<br/>Без затяжного строительства и каждому по карману</p>
                        <div data-block="breadcrumblist">
                            <a href="${DOMAIN}">Главная</a>
                            <a href="${DOMAIN}/bani">Категории бань</a>
                            <a href="${DOMAIN}/bani/${translateName}">${name}</a>
                            ${filter ? `<a href="${filter.translateName}">${filter.name}</a>` : ''}
                        </div>
                        ${projects && projects.length ? renderCards(category, projects) : ''}
                        ${photos && photos.length ? renderPhotos(category, `Фотоотчеты построенных ${category.name3}`, photos) : ''}
                        ${category.article && category.article.content ? renderArticle(category.article) : ''}
                        <form
                            data-type="callback"
                            data-send-to="info@brus-bany.ru"
                            data-agreement-company="ООО Русская баня"
                            data-agreement-link="https://brus-bany.ru/politika-konfidencialnosti">
                        </form>
                    ]]>
                </turbo:content>
            </item>
        `;
    }

    const { data: categories } = await Categories.getAll();

    // articles
    let items = '';

    await (async function addCategories(categories) {
        for (const category of categories) {
            const { data: projects } = await Projects.getAllForCategory(category.get('_id').toString(), { withLayout: true });
            const { data: photos } = await Photos.getAllForCategory(category.get('_id').toString(), { withProject: true, withLayout: true });

            const sortedPhotos = photos ? sortByDate(photos).slice(0, 6) : null;
            const sortedProjects = projects ? sortProjects(projects) : null;

            items += renderCategory({
                category,
                link: `https://brus-bany.ru/bani/${category.get('translateName')}`,
                title: `${getTitle(category)} | проекты и цены`,
                date: category.get('updated'),
                name: category.get('name'),
                translateName: category.get('translateName'),
                projects: sortedProjects,
                photos: sortedPhotos
            });

            const filters = category.get('filters');

            if (filters && filters.length) {
                for (const filter of filters) {
                    items += renderCategory({
                        category,
                        link: `https://brus-bany.ru/bani/${category.get('translateName')}/${filter.get('id')}`,
                        title: `${getTitle(category, filter)} | проекты и цены`,
                        date: category.get('updated'),
                        name: category.get('name'),
                        translateName: category.get('translateName'),
                        projects: filterProjects(filter, sortedProjects),
                        photos: sortedPhotos,
                        filter: {
                            translateName: filter.get('id'),
                            name: filter.get('name')
                        }
                    });
                }
            }
        }
    })(categories);

    const data =
        `<?xml version="1.0" encoding="UTF-8"?>
            <rss xmlns:yandex="http://news.yandex.ru" xmlns:media="http://search.yahoo.com/mrss/" xmlns:turbo="http://turbo.yandex.ru" version="2.0">
            <channel>
                <title>Купить недорогие бани под ключ от производителя | Брус бани</title>
                <link>${DOMAIN}</link>
                <description>
                    Строим недорогие бани под ключ по всей России. Более 150 проектов бань с гарантией 3 года. Собственное производство. 8(800)201-07-29
                </description>
                <language>ru</language>
                <turbo:analytics type="Yandex" id="${YMetricId}"/>
                ${items}
            </channel>
        </rss>`
    ;

    fs.writeFile('./public/rss-categories.xml', data,
        function (err) {
            if (err) {
                logger.error(`Ошибка генерации RSS-Categories: ${err}`, );
            } else {
                logger.success('RSS-Categories успешно обновлен!');
            }
        });
};
