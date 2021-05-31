const express = require('express');
const Settings = require('../controllers/Settings');
const { update: updateSettings } = require('../settings');

const router = express.Router();

const send = (res, { status, message, data }) => {
    res.json({ status, message, data });
    res.end();
};

router.get('/:name', async function(req, res, next) {
    try {
        const { status, data, message } = await Settings.get(req.params.name);

        switch(status) {
            case 'success':
                send(res, { data, status });
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

router.put('/:name', async function(req, res, next) {
    try {
        const { status, data, message } = await Settings.update(req.params.name, req.body.data);

        if (req.params.name === 'main') {
            await updateSettings();
        }

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Настройки успешно обновлены!` });
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
