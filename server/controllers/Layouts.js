const Status = require('./Status');
const Layout = require('../models/Layout');
const prepareErrors = require('./prepareErrors');

class Layouts {
    static async getAll() {
        return Status.success(await Layout.find({}));
    };

    static async get(id) {
        return Status.success(await Layout.findOne({ '_id': id }));
    };

    static async create(data) {
        if (await Layout.findOne({ '_id': data['_id'] })) {
            return Status.error(`Планировка с id = ${data['_id']} уже существует!`);
        }

        if (await Layout.findOne({ 'name': data['name'] })) {
            return Status.error(`Планировка с именем = ${data['name']} уже существует!`);
        }

        try {
            await Layout.create(data);
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(id, layout) {
        const match = await Layout.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующую планировку!`);
        }

        const idChanged = match['_id'] !== layout['_id'];
        const nameChanged = match['name'] !== layout['name'];

        if (idChanged) {
            if (await Layout.findOne({ '_id': layout['_id'] })) {
                return Status.error(`Планировка с id = ${layout['_id']} уже существует!`);
            }
        }

         if (nameChanged) {
            if (await Layout.findOne({ 'name': layout['name'] })) {
                return Status.error(`Планировка с именем = ${layout['name']} уже существует!`);
            }
        }

        if (idChanged) {
            await Layout.create(layout);
            await Layout.deleteOne({ '_id': id });
        } else {
            await Layout.updateOne({ '_id': id }, layout);
        }

        return Status.success();
    };


    static async delete(id) {
        if (!await Layout.findOne({ '_id': id })) {
            return Status.error(`Планировка не найдена!`);
        }

        await Layout.deleteOne({ '_id': id });

        return Status.success();
    };
}

module.exports = Layouts;
