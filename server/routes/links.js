const express = require('express');
const Links = require('../controllers/Links');

const router = express.Router();

const send = (res, { status, message, data }) => {
    res.json({ status, message, data });
    res.end();
};

router.post('/', async function(req, res, next) {
    try {
        const { status, data, message } = await Links.create(req.body.data);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Ссылка успешно создана!` });
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
