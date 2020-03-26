const express = require('express');
const Layouts = require('../controllers/Layouts');
const Safety = require('../controllers/Safety');
const cache = require('../cache');

const router = express.Router();

const send = (res, { status, message, data }) => {
    res.json({ status, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = cache.get(req) || cache.add(req, await Layouts.getAll(), 'layouts');

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
        const { status, data, message } = await Layouts.create(req.body.layout);

        cache.clear(['layouts']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Планировка успешно создана!` });
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
        const searchByName = req.query && req.query.byName;
        const { status, data, message } = cache.get(req) || cache.add(req, searchByName ? await Layouts.getByName(req.params.id) : await Layouts.get(req.params.id), `layouts`);

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
        const { status, data, message } = await Layouts.update(req.params.id, req.body.layout);

        cache.clear(['layouts', 'projects']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Планировка успешно обновлена!` });
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
        const { status, data, message } = await Safety.deleteLayout(req.params.id);

        cache.clear(['layouts', 'projects']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Планировка успешно удалена!` });
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
