const express = require('express');
const Categories = require('../models/Categories');
const SafetyMethods = require('../models/SafetyMethods');

const router = express.Router();

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = await Categories.getAll();

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
        const { status, data, message } = await Categories.get(req.params.id);

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
        const { status, data, message } = await Categories.create(req.body.category);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Категория успешно создана!` });
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
        const { status, data, message } = await Categories.update(req.params.id, req.body.category);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Категория успешно обновлена!` });
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
        const { status, data, message } = await Categories.update(req.params.id, req.body.category);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Категория успешно обновлена!` });
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
        const { status, data, message } = await SafetyMethods.deleteCategory(req.params.id);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Категория успешно удалена!` });
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
