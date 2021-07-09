const express = require('express');
const PageFolders = require('../controllers/PageFolders');
const cache = require('../cache');
const generatePages = require('../generatePages');

const router = express.Router();

const send = (res, { status, message, data }) => {
    res.json({ status, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = cache.get(req) || cache.add(req, await PageFolders.getAll(), 'page-folders');

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
        const { status, data, message } = await PageFolders.create(req.body.data);

        cache.clear(['page-folders']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Папка успешно создана!` });
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
        const { status, data, message } = await PageFolders.get(req.params.id);

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
        const { status, data, message } = await PageFolders.update(req.params.id, req.body.data);

        cache.clear(['page-folders']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Папка успешно обновлена!` });
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
        const { status, data, message } = await PageFolders.delete(req.params.id);

        cache.clear(['page-folders']);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Папка успешно удалена!` });
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
