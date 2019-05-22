const DB = require('../db');
const Status = require('./Status');

const COLLECTION_NAME = 'materials';
const getCollection = () => DB.getCollection(COLLECTION_NAME);

class Materials {
    static async getAll() {
        const collection = getCollection();
        return Status.success(await collection.find({}).toArray());
    };

    static async get(id) {
        const collection = getCollection();
        return Status.success(await collection.findOne({ '_id': DB.getId(id) }));
    };

    static async create(material) {
        const collection = getCollection();

        if (await collection.findOne({ name: material.name })) {
            return Status.error(`Наименование = ${material.name} уже существует!`);
        }

        const res = await collection.insertOne(material);

        return Status.success(res.insertedId.toString());
    };

    // TODO Нужно обновлять цену в проектах! Нотификация!
    static async update(id, material) {
        const collection = getCollection();

        const materialOld = await collection.findOne({ '_id': DB.getId(id) });

        if (!materialOld) {
            return Status.error(`Наименование не найдено!`);
        }

        if (material.name !== materialOld.name && await collection.findOne({ 'name': material.name })) {
            return Status.error(`Наименование = ${material.name} уже существует!`);
        }

        await collection.updateOne({ '_id': DB.getId(id) }, { $set: material });

        return Status.success();
    };

    static async delete(id) {
        const collection = getCollection();

        if (!await collection.findOne({ '_id': DB.getId(id) })) {
            return Status.error(`Наименование не найдено!`);
        }

        await collection.deleteOne({ '_id': DB.getId(id) });

        return Status.success();
    };
}

module.exports = Materials;
