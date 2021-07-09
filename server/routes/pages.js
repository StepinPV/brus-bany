const express = require('express');
const Pages = require('../controllers/Pages');
const cache = require('../cache');
const generatePages = require('../generatePages');

const router = express.Router();

const send = (res, { status, message, data }) => {
    res.json({ status, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = cache.get(req) || cache.add(req, await Pages.getAll(), 'pages');

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
        const { status, data, message } = await Pages.create(req.body.page);

        cache.clear(['pages']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Страница успешно создана!` });
                generatePages();
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
        const searchByUrl = req.query && req.query.byUrl;
        const { status, data, message } = searchByUrl ? await Pages.getByUrl(decodeURIComponent(req.params.id)) : await Pages.get(req.params.id);

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
        const { status, data, message } = await Pages.update(req.params.id, req.body.page);

        cache.clear(['pages']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Страница успешно обновлена!` });
                generatePages();
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
        const { status, data, message } = await Pages.delete(req.params.id);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Страница успешно удалена!` });
                generatePages();
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
