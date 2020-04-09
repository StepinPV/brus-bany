const express = require('express');
const Photos = require('../controllers/Photos');

const router = express.Router();

const cache = require('../cache');

const send = (res, { status, message, data }) => {
    res.json({ status, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const queryOptions = {
            withCategory: req.query && req.query.withCategory,
            withLayout: req.query && req.query.withLayout,
            withProject: req.query && req.query.withProject
        };

        const { status, data, message } = cache.get(req) || cache.add(req, await Photos.getAll(queryOptions), 'photos');

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

//CREATE
router.post('/:projectId', async function(req, res, next) {
    try {
        cache.clear(['photos']);

        const { projectId } = req.params;

        const { report } = req.body;

        const { status, data, message } = await Photos.create(projectId, report);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Фотоотчет успешно создан!` });
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

//READ
router.get('/:id', async function(req, res, next) {
    try {
        let result = cache.get(req);

        const forCategory = req.query && req.query.forCategory;
        const forProject = req.query && req.query.forProject;

        const queryOptions = {
            withCategory: req.query && req.query.withCategory,
            withLayout: req.query && req.query.withLayout,
            withProject: req.query && req.query.withProject
        };

        if (!result) {
            if (forCategory) {
                const searchByName = req.query && req.query.byName;

                result = searchByName ?
                    await Photos.getAllForCategoryByName(req.params.id, queryOptions) :
                    await Photos.getAllForCategory(req.params.id, queryOptions);
            } else if (forProject) {
                result = await Photos.getAllForProjectId(req.params.id, queryOptions);
            } else {
                result = await Photos.get(req.params.id, queryOptions);
            }

            cache.add(req, result, `photos`)
        }

        switch(result.status) {
            case 'success':
                send(res, { data: result.data, status: result.status });
                break;
            case 'error':
                send(res, { message: result.message, status: result.status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

//UPDATE
router.put('/:id', async function(req, res, next) {
    try {
        const { report } = req.body;

        const { status, data, message } = await Photos.update(req.params.id, report);

        cache.clear(['photos']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Фотоотчет успешно обновлен!` });
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

//DELETE
router.delete('/:id', async function(req, res, next) {
    try {
        const { status, data, message } = await Photos.delete(req.params.id);

        cache.clear(['photos']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Фотоотчет успешно удален!` });
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
