const fs = require('fs');
const logger = require('../logger');
const Pages = require('../controllers/Pages');

const DOMAIN = 'https://brus-bany.ru';

exports.generate = async function () {
    let offers = ``;

    const { data: pages } = await Pages.getAll();

    // Готовые
    pages.filter(page => page.config.folder === '60957448b78ce30d280284a5').forEach(page => {
        const fields = page.get('config')['template-fields'];
        if (/^\/test/.test(page.get('url'))) return;

        offers += `
            <item>
                <g:id>${page.get('_id').toString()}</g:id>
                <g:title>Готовая баня ${fields[47907680]} 2.3x${fields[78523731]}</g:title>
                <g:description>Построим баню за 14 дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</g:description>
                <g:link>${DOMAIN}${page.get('url')}</g:link>
                <g:image_link>https://brus-bany.ru${fields['__images__'][fields[72733367]]}</g:image_link>
                <g:additional_image_link>https://brus-bany.ru${fields['__images__'][fields[79944259]]}</g:additional_image_link>
                <g:additional_image_link>https://brus-bany.ru${fields['__images__'][fields[14098748]]}</g:additional_image_link>
                <g:availability>in stock</g:availability>
                <g:price>${fields[84963727]} RUB</g:price>
                <g:condition>new</g:condition>
                <g:google_product_category>114</g:google_product_category>
                <g:product_type>Готовые бани</g:product_type>
                <g:identifier_exists>false</g:identifier_exists>
                <g:brand>Брус бани</g:brand>
            </item>
        `;
    });

    // Бани из бруса
    pages.filter(page => page.config.folder === '60a25547e2ce70443ea25f61').forEach(page => {
        const fields = page.get('config')['template-fields'];
        if (/^\/test/.test(page.get('url'))) return;

        offers += `
            <item>
                <g:id>${page.get('_id').toString()}</g:id>
                <g:title>Баня из бруса ${fields[57276360]} ${fields[93433362]}x${fields[85257964]}</g:title>
                <g:description>Построим баню за ${fields[46818917]} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</g:description>
                <g:link>${DOMAIN}${page.get('url')}</g:link>
                <g:image_link>https://brus-bany.ru${fields['__images__'][fields[65110217]]}</g:image_link>
                <g:additional_image_link>https://brus-bany.ru${fields['__images__'][fields[29687109]]}</g:additional_image_link>
                <g:additional_image_link>https://brus-bany.ru${fields['__images__'][fields[15918864]]}</g:additional_image_link>
                <g:availability>in stock</g:availability>
                <g:price>${fields[56818364]} RUB</g:price>
                <g:condition>new</g:condition>
                <g:google_product_category>114</g:google_product_category>
                <g:product_type>Бани из бруса</g:product_type>
                <g:identifier_exists>false</g:identifier_exists>
                <g:brand>Брус бани</g:brand>
            </item>
        `;
    });

    // Каркасные бани
    pages.filter(page => page.config.folder === '60ae24ba3a5b276a9a905ab4').forEach(page => {
        const fields = page.get('config')['template-fields'];
        if (/^\/test/.test(page.get('url'))) return;

        offers += `
            <item>
                <g:id>${page.get('_id').toString()}</g:id>
                <g:title>Каркасная баня ${fields[45217104]} ${fields[70129279]}x${fields[37814436]}</g:title>
                <g:description>Построим баню за ${fields[44889802]} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</g:description>
                <g:link>${DOMAIN}${page.get('url')}</g:link>
                <g:image_link>https://brus-bany.ru${fields['__images__'][fields[24879013]]}</g:image_link>
                <g:additional_image_link>https://brus-bany.ru${fields['__images__'][fields[60361373]]}</g:additional_image_link>
                <g:additional_image_link>https://brus-bany.ru${fields['__images__'][fields[65209859]]}</g:additional_image_link>
                <g:availability>in stock</g:availability>
                <g:price>${fields[49173770]} RUB</g:price>
                <g:condition>new</g:condition>
                <g:google_product_category>114</g:google_product_category>
                <g:product_type>Каркасные бани</g:product_type>
                <g:identifier_exists>false</g:identifier_exists>
                <g:brand>Брус бани</g:brand>
            </item>
        `;
    });

    // Дома из бруса
    pages.filter(page => page.config.folder === '60b24246fba072768bebdbd9').forEach(page => {
        const fields = page.get('config')['template-fields'];
        if (/^\/test/.test(page.get('url'))) return;

        offers += `
            <item>
                <g:id>${page.get('_id').toString()}</g:id>
                <g:title>Дом из бруса ${fields[52747966]} ${fields[61555365]}x${fields[26719389]}</g:title>
                <g:description>Построим баню за ${fields[56940202]} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</g:description>
                <g:link>${DOMAIN}${page.get('url')}</g:link>
                <g:image_link>https://brus-bany.ru${fields['__images__'][fields[97818608]]}</g:image_link>
                <g:additional_image_link>https://brus-bany.ru${fields['__images__'][fields[91676979]]}</g:additional_image_link>
                <g:additional_image_link>https://brus-bany.ru${fields['__images__'][fields[77397334]]}</g:additional_image_link>
                <g:availability>in stock</g:availability>
                <g:price>${fields[90281349]} RUB</g:price>
                <g:condition>new</g:condition>
                <g:google_product_category>114</g:google_product_category>
                <g:product_type>Дома из бруса</g:product_type>
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
