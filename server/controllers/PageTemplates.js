const Status = require('./Status');
const PageTemplate = require('../models/PageTemplate');
const prepareErrors = require('./prepareErrors');

class Components {
    static async get(id) {
        return Status.success(await PageTemplate.findOne({ '_id': id }));
    };

    static async getAll() {
        return Status.success(await PageTemplate.find({}));
    };

    static async create(data) {
        try {
            data.updated = new Date();

            await PageTemplate.create(data);
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(id, data) {
        const match = await PageTemplate.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующий шаблон!`);
        }

        try {
            data.updated = new Date();

            await PageTemplate.updateOne({ '_id': id }, data, { runValidators: true });
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };


    static async delete(id) {
        if (!await PageTemplate.findOne({ '_id': id })) {
            return Status.error(`Шаблон не найден!`);
        }

        await PageTemplate.deleteOne({ '_id': id });

        return Status.success();
    };
}

module.exports = Components;
