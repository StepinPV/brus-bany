const express = require('express');
const Projects = require('../controllers/Projects');
const Safety = require('../controllers/Safety');

let apicache = require('apicache');
let cache = apicache.middleware;
const GROUP_KEY = 'projects';

const router = express.Router();

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/:categoryId', /*cache('1 day')*/null, async function(req, res, next) {
    try {
        req.apicacheGroup = GROUP_KEY;

        const searchByName = req.query && req.query.byName;
        const queryOptions = {
            withCategory: req.query && req.query.withCategory,
            withLayout: req.query && req.query.withLayout
        };

        const { status, data, message } = searchByName ?
            await Projects.getAllForCategoryByName(req.params.categoryId, queryOptions) :
            await Projects.getAllForCategory(req.params.categoryId, queryOptions);

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

//UPDATE PRICES
router.post('/update-prices', async function(req, res, next) {
    try {
        apicache.clear(GROUP_KEY);

        const { status, data, message } = await Projects.updatePrices();

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Цены успешно обновлены!` });
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

//CREATE
router.post('/:categoryId/:layoutId', async function(req, res, next) {
    try {
        apicache.clear(GROUP_KEY);

        const { categoryId, layoutId } = req.params;

        const { project } = req.body;

        const { status, data, message } = await Projects.create(categoryId, layoutId, project);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Проект успешно создан!` });
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

//READ
router.get('/:categoryId/:layoutId', /*cache('1 day')*/null, async function(req, res, next) {
    try {
        req.apicacheGroup = GROUP_KEY;

        const { categoryId, layoutId } = req.params;
        const searchByName = req.query && req.query.byName;
        const queryOptions = {
            withCategory: req.query && req.query.withCategory,
            withLayout: req.query && req.query.withLayout
        };

        const { status, data, message } = searchByName ?
            await Projects.getByName(categoryId, layoutId, queryOptions) :
            await Projects.get(categoryId, layoutId, queryOptions);

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

//UPDATE
router.put('/:categoryId/:layoutId', async function(req, res, next) {
    try {
        apicache.clear(GROUP_KEY);

        const { categoryId, layoutId } = req.params;
        const { project } = req.body;

        const { status, data, message } = await Projects.update(categoryId, layoutId, project);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Проект успешно обновлен!` });
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

//DELETE
router.delete('/:id', async function(req, res, next) {
    try {
        const { status, data, message } = await Safety.deleteProject(req.params.id);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Проект успешно удален!` });
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
