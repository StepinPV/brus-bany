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

    static async getByName(name) {
        return Status.success(await Layout.findOne({ translateName: name }));
    };

    static async create(data) {
        if (await Layout.findOne({ 'translateName': data['translateName'] })) {
            return Status.error(`Планировка с именем на английском = ${data['translateName']} уже существует!`);
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

        const translateNameChanged = match['translateName'] !== layout['translateName'];
        const nameChanged = match['name'] !== layout['name'];

        if (translateNameChanged) {
            if (await Layout.findOne({ 'translateName': layout['translateName'] })) {
                return Status.error(`Планировка с именем на английском = ${layout['translateName']} уже существует!`);
            }
        }

        if (nameChanged) {
            if (await Layout.findOne({ 'name': layout['name'] })) {
                return Status.error(`Планировка с именем = ${layout['name']} уже существует!`);
            }
        }

        try {
            await Layout.updateOne({ '_id': id }, layout, { runValidators: true });
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
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
