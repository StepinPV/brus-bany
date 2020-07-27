const express = require('express');
const telegramBot = require('../telegram-bot');
const Links = require('../controllers/Links');

const router = express.Router();

router.post('/', async function(req, res, next) {
    try {
        if (req.body.data) {
            switch(req.body.data.event) {
                case 'document_view': {
                    const { status: linkStatus, data: link } = await Links.get({ to: req.body.data.pathname });

                    let message = `Событие просмотра документа: ${req.body.data.documentName}\n`;
                    message += `Проект: ${req.body.data.projectName}\n`;
                    message += `Менеджер: ${req.body.data.manager}\n\n`;
                    if (req.body.data.documentNumber) {
                        message += `Номер договора: ${req.body.data.documentNumber}\n`;
                    }

                    if (req.body.data.client) {
                        if (req.body.data.client.name) {
                            message += `Имя клиента: ${req.body.data.client.name}\n`;
                        }
                        if (req.body.data.client.phone) {
                            message += `Телефон клиента: ${req.body.data.client.phone}\n\n`;
                        }
                    }

                    message += `Ссылка на документ: ${req.body.data.host}${linkStatus === 'success' && link ? (link.get('from')) : req.body.data.pathname}\n\n`;

                    message += '---+---+---+---';

                    telegramBot.send('Павел', message);
                    telegramBot.send('Игорь', message);

                    telegramBot.send(req.body.data.manager, message);
                }
            }
        }

        res.json({ status: 'success' });
        res.end();
    } catch(err) {
        next(err);
    }
});

module.exports = router;
