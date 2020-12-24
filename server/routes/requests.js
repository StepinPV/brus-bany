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
        console.log(`request - ${new Date().toLocaleTimeString()} from ${req.headers['x-forwarded-for']}`);

        amo.send(requestData, req.headers.referer, utmParams);

        send(res, req, 'success');
    } catch(err) {
        next(err);
    }
});

module.exports = router;
