const express = require('express');
const DB = require('../db');

const router = express.Router();
const getCollection = () => DB.getCollection('categories');

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

//TODO Удаление категории

router.get('/', async function(req, res, next) {
    try {
        const collection = getCollection();

        const categories = await collection.find({}).toArray();
        send(res, { data: categories, status: 'success' });

    } catch(err) {
        next(err);
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        const collection = getCollection();

        const category = await collection.findOne({ '_id': req.params.id });

        if (category) {
            send(res, { data: category, status: 'success' });
        } else {
            send(res, { status: 'error', message: 'Категория не найдена!' });
        }

    } catch(err) {
        next(err);
    }
});

router.post('/add', async function(req, res, next) {
    try {
        const collection = getCollection();
        const category = req.body.category;

        if (await collection.findOne({ '_id': category['_id'] })) {
            send(res, { status: 'error', message: `Категория с id = ${category['_id']} уже существует!` });
            return;
        }

        if (await collection.findOne({ 'name': category['name'] })) {
            send(res, { status: 'error', message: `Категория с именем = ${category['name']} уже существует!` });
            return;
        }

        await collection.insertOne(category);

        send(res, { message: `Категория успешно создана!`, status: 'success', data: { id: category._id } });
    } catch(err) {
        next(err);
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        const collection = getCollection();
        const { category } = req.body;

        const match = await collection.findOne({ '_id': req.params.id });

        if (!match) {
            send(res, { status: 'error', message: `Вы пытаетесь изменить несуществующую категорию!` });
            return;
        }

        const idChanged = match['_id'] !== category['_id'];

        if (idChanged) {
            if (await collection.findOne({ '_id': category['_id'] })) {
                send(res, { status: 'error', message: `Категория с id = ${category['_id']} уже существует!` });
                return;
            }
        }

        if (match['name'] !== category['name']) {
            if (await collection.findOne({ 'name': category['name'] })) {
                send(res, { status: 'error', message: `Категория с именем = ${category['name']} уже существует!` });
                return;
            }
        }

        if (idChanged) {
            await collection.insertOne(category);
            await collection.remove({ '_id': req.params.id });
        } else {
            await collection.updateOne({ '_id': req.params.id }, { $set: category });
        }

        send(res, { message: `Категория успешно обновлена!`, status: 'success' });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
