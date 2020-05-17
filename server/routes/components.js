const express = require('express');
const Components = require('../controllers/Components');
const cache = require('../cache');

const router = express.Router();

const send = (res, { status, message, data }) => {
    res.json({ status, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = cache.get(req) || cache.add(req, await Components.getAll(), 'components');

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
        const { status, data, message } = await Components.create(req.body.component);

        cache.clear(['components']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Компонент успешно создан!` });
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
        const { status, data, message } = cache.get(req) || cache.add(req, await Components.get(req.params.id), `components`);

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
        const { status, data, message } = await Components.update(req.params.id, req.body.component);

        cache.clear(['components']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Компонент успешно обновлен!` });
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
        const { status, data, message } = await Components.delete(req.params.id);

        cache.clear(['components']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Компонент успешно удален!` });
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
