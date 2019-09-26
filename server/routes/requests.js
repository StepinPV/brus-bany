const express = require('express');
const Requests = require('../controllers/Requests');
const nodemailer = require('../nodemailer');

const router = express.Router();

const send = (res, req, status) => {
    res.redirect(`${req.headers.referer}?requestStatus=${status}#requestForm`);
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
