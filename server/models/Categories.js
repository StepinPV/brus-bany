const DB = require('../db');
const Status = require('./Status');

const COLLECTION_NAME = 'categories';
const getCollection = () => DB.getCollection(COLLECTION_NAME);

// TODO Сделать удаление!

class Categories {
    static async getAll() {
        const collection = getCollection();
        return Status.success(await collection.find({}).toArray());
    };

    static async get(id) {
        const collection = getCollection();

        const category = await collection.findOne({ '_id': id });

        if (!category) {
            return Status.error('Категория не найдена!');
        }

        return Status.success(category);
    };

    static async create(category) {
        const collection = getCollection();

        if (await collection.findOne({ '_id': category['_id'] })) {
            return Status.error(`Категория с id = ${category['_id']} уже существует!`);
        }

        if (await collection.findOne({ 'name': category['name'] })) {
            return Status.error(`Категория с именем = ${category['name']} уже существует!`);
        }

        await collection.insertOne(category);

        return Status.success(category._id);
    };

    static async update(id, category) {
        const collection = getCollection();

        const match = await collection.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующую категорию!`);
        }

        const idChanged = match['_id'] !== category['_id'];
        const nameChanged = match['name'] !== category['name'];

        if (idChanged && await collection.findOne({ '_id': category['_id'] })) {
            return Status.error(`Категория с id = ${category['_id']} уже существует!`);
        }

        if (nameChanged && await collection.findOne({ 'name': category['name'] })) {
            return Status.error(`Категория с именем = ${category['name']} уже существует!`);
        }

        if (idChanged) {
            await collection.insertOne(category);
            await collection.remove({ '_id': id });
        } else {
            await collection.updateOne({ '_id': id }, { $set: category });
        }

        return Status.success();
    };
}

module.exports = Categories;
