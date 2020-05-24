const express = require('express');
const PageTemplates = require('../controllers/PageTemplates');
const cache = require('../cache');

const router = express.Router();

const send = (res, { status, message, data }) => {
    res.json({ status, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = cache.get(req) || cache.add(req, await PageTemplates.getAll(), 'page-templates');

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

router.post('/', async function(req, res, next) {
    try {
        const { status, data, message } = await PageTemplates.create(req.body.data);

        cache.clear(['page-templates']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Шаблон успешно создан!` });
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

router.get('/:id', async function(req, res, next) {
    try {
        const { status, data, message } = cache.get(req) || cache.add(req, await PageTemplates.get(req.params.id), 'page-templates');

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

router.put('/:id', async function(req, res, next) {
    try {
        const { status, data, message } = await PageTemplates.update(req.params.id, req.body.data);

        cache.clear(['page-templates']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Шаблон успешно обновлен!` });
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

router.delete('/:id', async function(req, res, next) {
    try {
        const { status, data, message } = await PageTemplates.delete(req.params.id);

        cache.clear(['page-templates']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Шаблон успешно удален!` });
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
