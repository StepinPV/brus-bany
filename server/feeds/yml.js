const fs = require('fs');
const logger = require('../logger');

const Categories = require('../controllers/Categories');

const Pages = require('../controllers/Pages');

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

    categories += `
        <category id="5860178762">Дома из бруса</category>
        <category id="5020819966">Бани из бруса</category>
        <category id="5020049966">Каркасные бани</category>
        <category id="5020999668">Готовые бани</category>
    `;

    const { data: pages } = await Pages.getAll();

    let offers = ``;

    // Готовые
    pages.filter(page => page.config.folder === '60957448b78ce30d280284a5').forEach(page => {
        const fields = page.get('config')['template-fields'];

        if (/^\/test/.test(page.get('url'))) return;

        offers += `
            <offer id="${convertIdToNumber(page.get('_id'))}">
                <name>Готовая баня 2.3x${fields[78523731]} «${fields[47907680]}»</name>
                <url>${DOMAIN}${page.get('url')}</url>
                <price>${fields[84963727]}</price>
                <currencyId>RUR</currencyId>
                <categoryId>5020999668</categoryId>
                <picture>https://brus-bany.ru${fields['__images__'][fields[72733367]]}</picture>
                <picture>https://brus-bany.ru${fields['__images__'][fields[79944259]]}</picture>
                <picture>https://brus-bany.ru${fields['__images__'][fields[14098748]]}</picture>
                <description>
                    <![CDATA[
                        <p>Построим баню за 14 дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</p>
                    ]]>
                </description>
            </offer>
        `;
    });

    // Бани из бруса
    pages.filter(page => page.config.folder === '60a25547e2ce70443ea25f61').forEach(page => {
        const fields = page.get('config')['template-fields'];

        if (/^\/test/.test(page.get('url'))) return;

        offers += `
            <offer id="${convertIdToNumber(page.get('_id'))}">
                <name>Баня из бруса ${fields[93433362]}x${fields[85257964]} «${fields[57276360]}»</name>
                <url>${DOMAIN}${page.get('url')}</url>
                <price>${fields[56818364]}</price>
                <currencyId>RUR</currencyId>
                <categoryId>5020819966</categoryId>
                <picture>https://brus-bany.ru${fields['__images__'][fields[65110217]]}</picture>
                <picture>https://brus-bany.ru${fields['__images__'][fields[29687109]]}</picture>
                <picture>https://brus-bany.ru${fields['__images__'][fields[15918864]]}</picture>
                <description>
                    <![CDATA[
                        <p>Построим баню за ${fields[46818917]} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</p>
                    ]]>
                </description>
            </offer>
        `;
    });

    // Каркасные бани
    pages.filter(page => page.config.folder === '60ae24ba3a5b276a9a905ab4').forEach(page => {
        const fields = page.get('config')['template-fields'];

        if (/^\/test/.test(page.get('url'))) return;

        offers += `
            <offer id="${convertIdToNumber(page.get('_id'))}">
                <name>Каркасная баня ${fields[70129279]}x${fields[37814436]} «${fields[45217104]}»</name>
                <url>${DOMAIN}${page.get('url')}</url>
                <price>${fields[49173770]}</price>
                <currencyId>RUR</currencyId>
                <categoryId>5020049966</categoryId>
                <picture>https://brus-bany.ru${fields['__images__'][fields[24879013]]}</picture>
                <picture>https://brus-bany.ru${fields['__images__'][fields[60361373]]}</picture>
                <picture>https://brus-bany.ru${fields['__images__'][fields[65982364]]}</picture>
                <description>
                    <![CDATA[
                        <p>Построим баню за ${fields[44889802]} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</p>
                    ]]>
                </description>
            </offer>
        `;
    });

    // Дома из бруса
    pages.filter(page => page.config.folder === '60b24246fba072768bebdbd9').forEach(page => {
        const fields = page.get('config')['template-fields'];

        if (/^\/test/.test(page.get('url'))) return;

        offers += `
            <offer id="${convertIdToNumber(page.get('_id'))}">
                <name>Дом из бруса ${fields[61555365]}x${fields[26719389]} «${fields[52747966]}»</name>
                <url>${DOMAIN}${page.get('url')}</url>
                <price>${fields[90281349]}</price>
                <currencyId>RUR</currencyId>
                <categoryId>5860178762</categoryId>
                <picture>https://brus-bany.ru${fields['__images__'][fields[97818608]]}</picture>
                <picture>https://brus-bany.ru${fields['__images__'][fields[91676979]]}</picture>
                <picture>https://brus-bany.ru${fields['__images__'][fields[77397334]]}</picture>
                <description>
                    <![CDATA[
                        <p>Построим баню за ${fields[56940202]} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость</p>
                    ]]>
                </description>
            </offer>
        `;
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
            logger.success('YML успешно обновлен');
        }
    });
};
