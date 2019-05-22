const express = require('express');
const Layouts = require('../models/Layouts');
const SafetyMethods = require('../models/SafetyMethods');

const router = express.Router();

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = await Layouts.getAll();

        switch(status) {
            case 'success':
                send(res, { data, status });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        const { status, data, message } = await Layouts.get(req.params.id);

        switch(status) {
            case 'success':
                send(res, { data, status });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

router.post('/add', async function(req, res, next) {
    try {
        const { status, data, message } = await Layouts.create(req.body.layout);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Планировка успешно создана!` });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        const { status, data, message } = await Layouts.update(req.params.id, req.body.layout);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Планировка успешно обновлена!` });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
        const { status, data, message } = await SafetyMethods.deleteLayout(req.params.id);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Планировка успешно удалена!` });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;
