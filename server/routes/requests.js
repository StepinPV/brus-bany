const express = require('express');
const Requests = require('../controllers/Requests');
const nodemailer = require('../nodemailer');
const watsup = require('../watsup');

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
                nodemailer.send(requestData);
                watsup.send(requestData, req.headers.referer);
                console.log(req);
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
