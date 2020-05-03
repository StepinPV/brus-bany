const Status = require('./Status');
const Page = require('../models/Page');
const prepareErrors = require('./prepareErrors');

class Pages {
    static async get(id) {
        return Status.success(await Page.findOne({ '_id': id }));
    };

    static async getAll() {
        return Status.success(await Page.find({}));
    };

    static async getByUrl(url) {
        return Status.success(await Page.findOne({ url }));
    };

    static async create(data) {
        if (await Page.findOne({ 'url': data['url'] })) {
            return Status.error(`Страница с url = ${data['url']} уже существует!`);
        }

        try {
            data.updated = new Date();

            await Page.create(data);
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(id, data) {
        const match = await Page.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующую страницу!`);
        }

        const urlChanged = match['url'] !== data['url'];

        if (urlChanged) {
            if (await Page.findOne({ 'url': data['url'] })) {
                return Status.error(`Страница с url = ${data['url']} уже существует!`);
            }
        }

        try {
            data.updated = new Date();

            await Page.updateOne({ '_id': id }, data, { runValidators: true });
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };


    static async delete(id) {
        if (!await Page.findOne({ '_id': id })) {
            return Status.error(`Страница не найдена!`);
        }

        await Page.deleteOne({ '_id': id });

        return Status.success();
    };
}

module.exports = Pages;
