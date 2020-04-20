const request = require('request'); //bash: npm install request
// URL for request POST /message
const url = 'https://eu95.chat-api.com/instance109742/sendMessage?token=fm0kivqf2bmgwwup';
const chatId = '79998639369-1584998464@g.us';

module.exports.send = ({ name, phone, source, data }, host, utmParams) => {
    let message = '';

    function addTitle(title) {
        message += `${title}:\n\n`;
    }

    function addField(name, value) {
        message += `${name}: ${value}\n`;
    }

    function addFields(fields) {
        fields.forEach(({ name, value }) => addField(name, value));
        message += '\n';
    }

    addTitle('Данные заявки');
    addFields([{
        name: 'Имя',
        value: name
    }, {
        name: 'Номер телефона',
        value: phone
    }, {
        name: 'Ссылка на страницу',
        value: host
    }]);

    message += `---\n\n`;

    if (data) {
        data = JSON.parse(data);
        data.forEach(elem => {
            switch(elem.type) {
                case 'fields':
                    addTitle(elem.title);
                    addFields(elem.fields);
                    message += `---\n\n`;
                    break;
                default:
                    break;
            }
        });
    }

    if (utmParams) {
        addTitle('UTM Параметры');
        addFields(utmParams);
    }

    request({
        url: url,
        method: "GET",
        json: {
            chatId: chatId, // Receivers phone
            body: message, // Message
        }
    });
};
