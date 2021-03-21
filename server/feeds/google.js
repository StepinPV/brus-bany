const fs = require('fs');
const logger = require('../logger');
const Projects = require('../controllers/Projects');

const DOMAIN = 'https://brus-bany.ru';

exports.generate = async function () {
    let offers = ``;
    const { data: projects } = await Projects.getAll({withCategory: true, withLayout: true});

    projects.forEach(project => {
        const layout = project.get('layoutId');
        const category = project.get('categoryId');

        const name = category.get('name');
        const name2 = category.get('name2');
        const price = project.prices && category.complectationBlocks && project.prices[category.complectationBlocks.defaultItemId] ? project.prices[category.complectationBlocks.defaultItemId] : 0;

        offers += `
            <item>
                <g:id>${project.get('_id').toString()}</g:id>
                <g:title>${name2[0].toUpperCase() + name2.slice(1)} ${layout.get('name')} ${layout.get('width')}x${layout.get('length')}</g:title>
                <g:description>Построим баню за ${project.get('buildTime')} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</g:description>
                <g:link>${DOMAIN}${category.get('translateName') !== 'doma-iz-brusa' ? '/bani' : ''}/${category.get('translateName')}/${layout.get('translateName')}_${layout.get('width')}x${layout.get('length')}</g:link>
                <g:image_link>${DOMAIN}${project.get('images').main}</g:image_link>
                <g:additional_image_link>${DOMAIN}${project.get('images').top}</g:additional_image_link>
                <g:additional_image_link>${DOMAIN}${project.get('images')['1']}</g:additional_image_link>
                <g:availability>in stock</g:availability>
                <g:price>${price} RUB</g:price>
                <g:condition>new</g:condition>
                <g:google_product_category>114</g:google_product_category>
                <g:product_type>${name[0].toUpperCase() + name.slice(1)}</g:product_type>
                <g:identifier_exists>false</g:identifier_exists>
                <g:brand>Брус бани</g:brand>
            </item>
        `;
    });

    const data =
        `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
         <channel>
            <title>Брус бани - строительство бань под ключ</title>
            <url>${DOMAIN}</url>
            <description>Строим недорогие бани под ключ по всей России. Более 150 проектов бань с гарантией 3 года. Собственное производство и самые опытные строительные бригады.</description>
            ${offers}
         </channel>
        </rss>`;

    fs.writeFile('./public/google.xml', data,
        function (err) {
            if (err) {
                logger.error(`Ошибка генерации Google feed: ${err}`, );
            } else {
                logger.success('Google feed успешно обновлен');
            }
        });
};
