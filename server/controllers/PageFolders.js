const Status = require('./Status');
const PageFolder = require('../models/PageFolder');
const Pages = require('./Pages');
const prepareErrors = require('./prepareErrors');

class PageFolders {
    static async get(id) {
        return Status.success(await PageFolder.findOne({ '_id': id }));
    };

    static async getAll() {
        return Status.success(await PageFolder.find({}));
    };

    static async create(data) {
        try {
            data.updated = new Date();

            await PageFolder.create(data);
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(id, data) {
        const match = await PageFolder.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующую папку!`);
        }

        try {
            data.updated = new Date();

            await PageFolder.updateOne({ '_id': id }, data, { runValidators: true });
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };


    static async delete(id) {
        if (!await PageFolder.findOne({ '_id': id })) {
            return Status.error(`Папка не найдена!`);
        }

        const pages = await Pages.getAll();
        const folders = await PageFolders.getAll();

        for (const p of pages.data) {
            if (p.get('config').folder === id) {
                await Pages.delete(p['_id'].toString());
            }
        }

        for (const f of folders.data) {
            if (f.get('folder') === id) {
                await PageFolders.delete(f['_id'].toString());
            }
        }

        await PageFolder.deleteOne({ '_id': id });

        return Status.success();
    };
}

module.exports = PageFolders;
