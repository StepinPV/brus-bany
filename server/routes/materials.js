const express = require('express');
const Materials = require('../methods/Materials');
const Safety = require('../methods/Safety');

const router = express.Router();

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const { status, data, message } = await Materials.getAll();

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
router.post('/', async function(req, res, next) {
    try {
        const { status, data, message } = await Materials.create(req.body.material);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Наименование успешно создано!` });
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
router.put('/:id', async function(req, res, next) {
    try {
        const { status, data, message } = await Materials.update(req.params.id, req.body.material);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Наименование успешно обновлено!` });
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
        const { status, data, message } = await Safety.deleteMaterial(req.params.id);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Наименование успешно удалено!` });
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
