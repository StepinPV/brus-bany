const DB = require('../db');
const Status = require('./Status');

const COLLECTION_NAME = 'layouts';
const getCollection = () => DB.getCollection(COLLECTION_NAME);

// TODO Сделать удаление!

class Layouts {
    static async getAll() {
        const collection = getCollection();
        return Status.success(await collection.find({}).toArray());
    };

    static async get(id) {
        const collection = getCollection();
        return Status.success(await collection.findOne({ '_id': id }));
    };

    static async create(layout) {
        const collection = getCollection();

        if (await collection.findOne({ '_id': layout['_id'] })) {
            return Status.error(`Планировка с id = ${layout['_id']} уже существует!`);
        }

        if (await collection.findOne({ 'name': layout['name'] })) {
            return Status.error(`Планировка с именем = ${layout['name']} уже существует!`);
        }

        await collection.insertOne(layout);

        return Status.success();
    };

    static async update(id, layout) {
        const collection = getCollection();

        const match = await collection.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующую планировку!`);
        }

        const idChanged = match['_id'] !== layout['_id'];
        const nameChanged = match['name'] !== layout['name'];

        if (idChanged) {
            if (await collection.findOne({ '_id': layout['_id'] })) {
                return Status.error(`Планировка с id = ${layout['_id']} уже существует!`);
            }
        }

        if (nameChanged) {
            if (await collection.findOne({ 'name': layout['name'] })) {
                return Status.error(`Планировка с именем = ${layout['name']} уже существует!`);
            }
        }

        if (idChanged) {
            await collection.insertOne(layout);
            await collection.remove({ '_id': id });
        } else {
            await collection.updateOne({ '_id': id }, { $set: layout });
        }

        return Status.success();
    };
}

module.exports = Layouts;
