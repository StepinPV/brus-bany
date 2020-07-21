const express = require('express');
const telegramBot = require('../telegram-bot');

const router = express.Router();

router.post('/', async function(req, res, next) {
    try {
        if (req.body.data) {
            switch(req.body.data.event) {
                case 'document_view': {
                    let message = '---+---+---+---\n\n';
                    message += `Событие просмотра документа: ${req.body.data.documentName}\n`;
                    message += `Проект: ${req.body.data.projectName}\n`;
                    message += `Менеджер: ${req.body.data.manager}\n\n`;
                    if (req.body.data.documentNumber) {
                        message += `Номер договора: ${req.body.data.client.documentNumber}\n`;
                    }

                    if (req.body.data.client) {
                        message += `Имя клиента: ${req.body.data.client.name}\n`;
                        message += `Телефон клиента: ${req.body.data.client.phone}\n\n`;
                    }

                    message += `Ссылка на документ: ${req.body.data.link}\n`;

                    message += '---+---+---+---';

                    telegramBot.send(27702291, message);
                    telegramBot.send(179886316, message);
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
