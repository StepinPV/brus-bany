const express = require('express');
const DB = require('../db');

const router = express.Router();
const getCollection = () => DB.getCollection('layouts');

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

// Все планировки
router.get('/', async function(req, res, next) {
    try {
        const collection = getCollection();

        const layouts = await collection.find({}).toArray();
        send(res, { data: layouts, status: 'success' });

    } catch(err) {
        next(err);
    }
});

// Получить планировку
router.get('/:id', async function(req, res, next) {
    try {
        const collection = getCollection();

        const layout = await collection.findOne({ '_id': req.params.id });

        if (layout) {
            send(res, { data: layout, status: 'success' });
        } else {
            send(res, { status: 'error', message: 'Планировка не найдена!' });
        }

    } catch(err) {
        next(err);
    }
});

// Cоздать планировку
router.post('/add', async function(req, res, next) {
    try {
        const collection = getCollection();

        if (await collection.findOne({ '_id': req.body.layout['_id'] })) {
            send(res, { status: 'error', message: `Планировка с id = ${req.body.layout['_id']} уже существует!` });
            return;
        }

        if (await collection.findOne({ 'name': req.body.layout['name'] })) {
            send(res, { status: 'error', message: `Планировка с именем = ${req.body.layout['name']} уже существует!` });
            return;
        }

        await collection.insertOne(req.body.layout);

        send(res, { message: `Планировка успешно создана!`, status: 'success' });
    } catch(err) {
        next(err);
    }
});

// Изменить планировку
router.put('/:id', async function(req, res, next) {
    try {
        const collection = getCollection();

        const match = await collection.findOne({ '_id': req.params.id });

        if (!match) {
            send(res, { status: 'error', message: `Вы пытаетесь изменить несуществующую планировку!` });
            return;
        }

        const idChanged = match['_id'] !== req.body.layout['_id'];

        if (idChanged) {
            if (await collection.findOne({ '_id': req.body.layout['_id'] })) {
                send(res, { status: 'error', message: `Планировка с id = ${req.body.layout['_id']} уже существует!` });
                return;
            }
        }

        if (match['name'] !== req.body.layout['name']) {
            if (await collection.findOne({ 'name': req.body.layout['name'] })) {
                send(res, { status: 'error', message: `Планировка с именем = ${req.body.layout['name']} уже существует!` });
                return;
            }
        }

        if (idChanged) {
            await collection.insertOne(req.body.layout);
            await collection.remove({ '_id': req.params.id });
        } else {
            await collection.updateOne({ '_id': req.params.id }, { $set: req.body.layout });
        }

        await collection.updateOne({ '_id': req.params.id }, { $set: req.body.layout });

        send(res, { message: `Планировка успешно обновлена!`, status: 'success' });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
