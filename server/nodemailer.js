const nodemailer = require('nodemailer');
const logger = require('./logger');

let transporter = null;

module.exports.init = (host, port, login, password) => {
    transporter = nodemailer.createTransport({
        host,
        port,
        secure: true,
        auth: {
            user: login,  // to be replaced by actual username and password
            pass: password
        }
    });

    transporter.verify(function(error) {
        if (error) {
            logger.error(error);
        } else {
            logger.success('Mailer is ready to take our messages');
        }
    });
};

module.exports.send = ({ name, phone, source, data }) => {
    let html = '';

    function addTitle(title) {
        html += `<div>${title}:</div></br>`;
    }

    function addField(name, value) {
        html += `
            <div>
                <strong>${name}:</strong>
                <span>${value}</span>
            </div>`;
    }

    function addFields(fields) {
        fields.forEach(({ name, value }) => addField(name, value));
        html += '<br>';
    }

    addTitle('Данные заявки');
    addFields([{
        name: 'Имя',
        value: name
    }, {
        name: 'Номер телефона',
        value: phone
    }, {
        name: 'Источник',
        value: source
    }]);

    if (data) {
        data.forEach(elem => {
            switch(elem.type) {
                case 'fields':
                    addTitle(elem.title);
                    addFields(elem.fields);
                    break;
                default:
                    break;
            }
        });
    }

    transporter.sendMail({
        from: 'brus-bany.ru@yandex.ru',
        to: 'info@brus-bany.ru',
        subject: 'Заявка с нового сайта',
        html
    });
};
