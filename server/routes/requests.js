const express = require('express');
const Requests = require('../controllers/Requests');
const nodemailer = require('../nodemailer');

const router = express.Router();

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.post('/', async function(req, res, next) {
    try {
        const requestData = {
            ...req.body.request,
            created: new Date()
        };

        const { status, data, message } = await Requests.create(requestData);

        nodemailer.send(requestData);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Заявка успешно создана!` });
                break;
            case 'error':
                send(res, { message, status, data });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;
