const express = require('express');
const amo = require('../amo');
const utm = require('../utm');

const router = express.Router();

const send = (res) => {
    res.redirect(`/thanks`);
};

router.post('/', async function(req, res, next) {
    try {
        const requestData = {
            ...req.body,
            created: new Date()
        };

        const utmParams = utm.get(req);

        // TODO Лог о заявке
        const ip = req.headers['X-Forwarded-For'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        console.log(`request - ${new Date().toLocaleTimeString()} from ${ip}`);

        amo.send(requestData, req.headers.referer, utmParams);

        send(res, req, 'success');
    } catch(err) {
        next(err);
    }
});

module.exports = router;
