const SMSru = require('sms_ru');
const logger = require('./logger');

let instance;

module.exports.init = (id) => {
    instance = new SMSru(id);
};

function ucFirst(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}

module.exports.send = ({ name, phone, source, data }) => {
    instance.sms_send({
        to: phone,
        text: `${ucFirst(name)}, спасибо, что оставили заявку на сайте https://brus-bany.ru.\n\nНаш менеджер свяжется с вами в течении 5 минут и будет рад ответить на все ваши вопросы\n\nКомпания Брус бани ♥`,
        from: 'Брус бани',
        time: new Date()/1000+60,
        translit: false,
        test: false
    }, function(e){
        logger.success(e.description);
    });
};
