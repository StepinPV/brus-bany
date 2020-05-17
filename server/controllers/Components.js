const Status = require('./Status');
const Component = require('../models/Component');
const prepareErrors = require('./prepareErrors');

class Components {
    static async get(id) {
        return Status.success(await Component.findOne({ '_id': id }));
    };

    static async getAll() {
        return Status.success(await Component.find({}));
    };

    static async create(data) {
        try {
            data.updated = new Date();

            await Component.create(data);
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(id, data) {
        const match = await Component.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующий компонент!`);
        }

        try {
            data.updated = new Date();

            await Component.updateOne({ '_id': id }, data, { runValidators: true });
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };


    static async delete(id) {
        if (!await Component.findOne({ '_id': id })) {
            return Status.error(`Компонент не найден!`);
        }

        await Component.deleteOne({ '_id': id });

        return Status.success();
    };
}

module.exports = Components;
