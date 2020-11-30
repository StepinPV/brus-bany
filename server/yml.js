const fs = require('fs');
const logger = require('./logger');

const Categories = require('./controllers/Categories');
const Projects = require('./controllers/Projects');

const DOMAIN = 'https://brus-bany.ru';

function convertIdToNumber(val) {
    return val.toString().match(/(\d+)/g).join('').slice(0,10);
}

exports.generate = async function () {
    let categories = ``;
    // categories
    const { data: _categories } = await Categories.getAll();
    _categories.forEach(category => {
        categories += `
            <category id="${convertIdToNumber(category.get('_id'))}">${category.get('name')}</category>
        `;
    });

    let offers = ``;
    // projects
    const { data: projects } = await Projects.getAll({withCategory: true, withLayout: true});

    projects.forEach(project => {
        const layout = project.get('layoutId');
        const category = project.get('categoryId');

        let images = ``;

        ['main', 'top', 'top2', '1', '2', '3', 'layout'].forEach(key => {
            if (project.images[key]) {
                images += `
                    <picture>${project.images[key]}</picture>
                `;
            }
        });

        function renderInfoTitle() {
            const { terrace, attic, porch } = layout;

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

        const name = `${category.name2} ${layout.width}x${layout.length} ${renderInfoTitle()} «${project.layoutId.name}»`;
        const price = project.prices && category.complectationBlocks && project.prices[category.complectationBlocks.defaultItemId] ? project.prices[category.complectationBlocks.defaultItemId] : 0;

        if (price) {
            offers += `
                <offer id="${convertIdToNumber(project.get('_id'))}">
                    <name>${name}</name>
                    <url>${DOMAIN}${category.get('translateName') !== 'doma-iz-brusa' ? '/bani' : ''}/${category.get('translateName')}/${layout.get('translateName')}_${layout.get('width')}x${layout.get('length')}</url>
                    <price>${price}</price>
                    <currencyId>RUR</currencyId>
                    <categoryId>${convertIdToNumber(category.get('_id'))}</categoryId>
                    ${images}
                    <description>
                        <![CDATA[
                            <p>Построим баню за ${project.get('buildTime')} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</p>
                        ]]>
                    </description>
                    <param name="Общая площадь">${layout.area} м2</param>
                    <param name="Площадь сруба">${layout.frameArea} м2</param>
                    ${layout.terrace && layout.terrace.area ? `<param name="Площадь терассы">${layout.terrace.area} м2</param>` : ''}
                    ${layout.porch && layout.porch.area ? `<param name="Площадь крыльца">${layout.porch.area} м2</param>` : ''}
                    ${layout.attic && layout.attic.area ? `<param name="Площадь мансарды">${layout.attic.area} м2</param>` : ''}
                </offer>
            `;
        }
    });

    const date = new Date();
    function getNumberWith0(number) {
        return number <= 9 ? `0${number}` : number
    }

    const data =
        `<?xml version="1.0" encoding="UTF-8"?>
        <yml_catalog date="${date.getFullYear()}-${getNumberWith0(date.getMonth())}-${getNumberWith0(date.getDate())} ${getNumberWith0(date.getHours())}:${getNumberWith0(date.getMinutes())}">
            <shop>
                <name>Брус бани</name>
                <company>ООО "Русская баня"</company>
                <url>${DOMAIN}</url>
                <currencies>
                    <currency id="RUR" rate="1"/>
                </currencies>
                <categories>
                    ${categories}
                </categories>
                <offers>
                    ${offers}
                </offers>
            </shop>
        </yml_catalog>`;

    fs.writeFile('./public/yml.xml', data,
        function (err) {
        if (err) {
            logger.error(`Ошибка генерации YML: ${err}`, );
        } else {
            logger.success('YML успешно обновлен!');
        }
    });
};
