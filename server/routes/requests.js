const express = require('express');
// const sms = require('../sms');
const bitrix = require('../bitrix');
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

        bitrix.send(requestData, req.headers.referer, utmParams);
        // sms.send(requestData);
        send(res, req, 'success');
    } catch(err) {
        next(err);
    }
});

module.exports = router;
