const express = require('express');
const Articles = require('../controllers/Articles');

const router = express.Router();

let apicache = require('apicache');
let cache = apicache.middleware;
const GROUP_KEY = 'articles';

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/', cache('1 day'), async function(req, res, next) {
    try {
        const { status, data, message } = await Articles.getAll();

        req.apicacheGroup = GROUP_KEY;

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
        const { status, data, message } = await Articles.create(req.body.article);

        apicache.clear(GROUP_KEY);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Статья успешно создана!` });
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

router.get('/:id', cache('1 day'), async function(req, res, next) {
    try {
        const searchByName = req.query && req.query.byName;
        const { status, data, message } = searchByName ? await Articles.getByName(req.params.id) : await Articles.get(req.params.id);

        req.apicacheGroup = `${GROUP_KEY}_${req.params.id}`;

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
        const { status, data, message } = await Articles.update(req.params.id, req.body.article);

        apicache.clear(GROUP_KEY);
        apicache.clear(`${GROUP_KEY}_${req.params.id}`);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Статья успешно обновлена!` });
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
        const { status, data, message } = await Articles.delete(req.params.id);

        apicache.clear(GROUP_KEY);
        apicache.clear(`${GROUP_KEY}_${req.params.id}`);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Статья успешно удалена!` });
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
