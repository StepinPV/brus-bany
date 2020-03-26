const express = require('express');
const Categories = require('../controllers/Categories');
const Safety = require('../controllers/Safety');
const cache = require('../cache');

const router = express.Router();

const send = (req, res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = cache.get(req) || cache.add(req, await Categories.getAll(), 'categories');

        switch(status) {
            case 'success':
                send(req, res, { data, status });
                break;
            case 'error':
                send(req, res, { message, status });
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
        const { status, data, message } = await Categories.create(req.body.category);

        cache.clear(['categories']);

        switch(status) {
            case 'success':
                send(req, res, { data, status, message: `Категория успешно создана!` });
                break;
            case 'error':
                send(req, res, { message, status, data });
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

        const { status, data, message } =
                cache.get(req) ||
                cache.add(req, searchByName ? await Categories.getByName(req.params.id) : await Categories.get(req.params.id), `categories_${req.params.id}`);

        switch(status) {
            case 'success':
                send(req, res, { data, status });
                break;
            case 'error':
                send(req, res, { message, status });
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

        cache.clear(['categories', 'projects', `categories_${req.body.category.translateName}`]);

        switch(status) {
            case 'success':
                send(req, res, { data, status, message: `Категория успешно обновлена!` });
                break;
            case 'error':
                send(req, res, { message, status, data });
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
        const { status, data, message } = await Safety.deleteCategory(req.params.id);

        cache.clear(['categories', 'projects', `categories_${req.body.category.translateName}`]);

        switch(status) {
            case 'success':
                send(req, res, { data, status, message: `Категория успешно удалена!` });
                break;
            case 'error':
                send(req, res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;
