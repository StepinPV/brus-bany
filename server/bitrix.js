const Bitrix = require('@2bad/bitrix').default;
const bitrix = Bitrix('https://b24-9b1t1w.bitrix24.ru/rest/1/vc07gzhnro4tm4jy');

module.exports.send = ({ name, phone, source, data }, host, utmParams) => {
    let message = '';

    function addTitle(title) {
        message += `${title}:<br><br>`;
    }

    function addField(name, value) {
        message += `${name}: ${value}<br>`;
    }

    function addFields(fields) {
        fields.forEach(({ name, value }) => addField(name, value));
        message += '<br>';
    }

    if (data) {
        data = JSON.parse(data);
        data.forEach(elem => {
            switch(elem.type) {
                case 'fields':
                    addTitle(elem.title);
                    addFields(elem.fields);
                    message += `---<br><br>`;
                    break;
                default:
                    break;
            }
        });
    }

    let UTMParams = {};
    if (utmParams) {
        utmParams.forEach(({ name, value }) => {
            UTMParams[name.toUpperCase()] = value;
        });
    }

    bitrix.leads.create({
        TITLE: 'Заявка с сайта',
        NAME: name,
        SOURCE_DESCRIPTION: host,
        COMMENTS: message,
        PHONE: [ { "VALUE": phone, "VALUE_TYPE": "WORK" } ],
        ...UTMParams
    }, {
        REGISTER_SONET_EVENT: 'Y'
    });
};
