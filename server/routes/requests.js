const express = require('express');
const Requests = require('../controllers/Requests');
const nodemailer = require('../nodemailer');
const watsup = require('../watsup');
const sms = require('../sms');
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

        const { status } = await Requests.create(requestData);

        switch(status) {
            case 'success':
                const utmParams = utm.get(req);

                // nodemailer.send(requestData);
                // watsup.send(requestData, host, utmParams);
                bitrix.send(requestData, req.headers.referer, utmParams);
                // sms.send(requestData);
                send(res, req, status);
                break;
            case 'error':
                send(res, req, status);
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;
