const express = require('express');
const DB = require('../db');

const router = express.Router();
const getCollection = () => DB.getCollection('materials');

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/', async function(req, res, next) {
    try {
        const collection = getCollection();

        const materials = await collection.find({ }).toArray();

        send(res, { data: materials, status: 'success' });

    } catch(err) {
        next(err);
    }
});

//CREATE
router.post('/', async function(req, res, next) {
    try {
        const collection = getCollection();
        const material = req.body.material;

        if (await collection.findOne({ name: material.name })) {
            send(res, { status: 'error', message: `Наименование = ${material.name} уже существует!` });
            return;
        }

        await collection.insertOne(material);
        const createdMaterial = await collection.findOne({ name: material.name });

        send(res, { message: `Наименование успешно создано!`, data: createdMaterial._id, status: 'success' });
    } catch(err) {
        next(err);
    }
});

//UPDATE
router.put('/:materialId', async function(req, res, next) {
    try {
        const collection = getCollection();
        const { material } = req.body;
        const materialId = req.params.materialId;

        const materialOld = await collection.findOne({ '_id': DB.getId(materialId) });

        if (!materialOld) {
            send(res, { status: 'error', message: `Наименование не найдено!` });
            return;
        }

        if (material.name !== materialOld.name && await collection.findOne({ 'name': material.name })) {
            send(res, { status: 'error', message: `Наименование = ${material.name} уже существует!` });
            return;
        }

        await collection.deleteOne({ '_id': DB.getId(materialId) });
        await collection.insertOne({ '_id': DB.getId(materialId), ...material });

        send(res, { message: `Наименование успешно обновлено!`, status: 'success' });
    } catch(err) {
        next(err);
    }
});

//DELETE
router.delete('/:materialId', async function(req, res, next) {
    try {
        const collection = getCollection();
        const materialId = req.params.materialId;

        const materialOld = await collection.findOne({ '_id': DB.getId(materialId) });

        if (!materialOld) {
            send(res, { status: 'error', message: `Наименование не найдено!` });
            return;
        }

        await collection.deleteOne({ '_id': DB.getId(materialId) });

        send(res, { message: `Наименование успешно удалено!`, status: 'success' });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
