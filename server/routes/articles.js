const express = require('express');
const Articles = require('../controllers/Articles');

const router = express.Router();

const cache = require('../cache');

const send = (res, { status, message, data }) => {
    res.json({ status, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = cache.get(req) || cache.add(req, await Articles.getAll(), 'articles');

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

        cache.clear(['articles']);

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

router.get('/:id', async function(req, res, next) {
    try {
        const searchByName = req.query && req.query.byName;
        const { status, data, message } = cache.get(req) || cache.add(req, searchByName ? await Articles.getByName(req.params.id) : await Articles.get(req.params.id), `articles_${req.params.id}`);

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

        cache.clear(['articles', `articles_${req.body.article.translateName}`]);

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

        cache.clear(['articles', `articles_${req.body.article.translateName}`]);

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
