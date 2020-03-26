const express = require('express');
const Categories = require('../controllers/Categories');
const Safety = require('../controllers/Safety');

let apicache = require('apicache');
let cache = apicache.middleware;
const GROUP_KEY = 'categories';
const GROUP_PROJECTS_KEY = 'projects';

const router = express.Router();

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/', cache('1 day'), async function(req, res, next) {
    try {
        req.apicacheGroup = GROUP_KEY;

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

router.post('/', async function(req, res, next) {
    try {
        apicache.clear(GROUP_KEY);
        apicache.clear(GROUP_PROJECTS_KEY);

        const { status, data, message } = await Categories.create(req.body.category);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Категория успешно создана!` });
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
        req.apicacheGroup = `${GROUP_KEY}_${req.params.id}`;

        const searchByName = req.query && req.query.byName;

        const { status, data, message } = searchByName ? await Categories.getByName(req.params.id) : await Categories.get(req.params.id);

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

router.put('/:id', async function(req, res, next) {
    try {
        apicache.clear(`${GROUP_KEY}_${req.body.category.translateName}`);
        apicache.clear(GROUP_KEY);
        apicache.clear(GROUP_PROJECTS_KEY);

        const { status, data, message } = await Categories.update(req.params.id, req.body.category);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Категория успешно обновлена!` });
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
        apicache.clear(`${GROUP_KEY}_${req.body.category.translateName}`);
        apicache.clear(GROUP_KEY);
        apicache.clear(GROUP_PROJECTS_KEY);

        const { status, data, message } = await Safety.deleteCategory(req.params.id);

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
