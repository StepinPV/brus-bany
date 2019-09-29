const Status = require('./Status');
const Article = require('../models/Article');
const prepareErrors = require('./prepareErrors');
const fs = require('fs');
const shell = require('shelljs');
const rimraf = require('rimraf');

const prepareImages = (data) => {
    const regexp = /^\/buffer\//;
    const newFolderPath = `/uploads/articles/${data.translateName}/`;

    const moveImage = (image) => {
        const newImagePath = image.replace(regexp, newFolderPath);
        const fullNewFolderPath = './public' + newFolderPath;

        if (!fs.existsSync(fullNewFolderPath)){
            shell.mkdir('-p', fullNewFolderPath);
        }

        fs.renameSync('./public' + image, './public' + newImagePath);

        return newImagePath;
    };

    if (regexp.test(data.image)) {
        data.image = moveImage(data.image);
    }

    if (data.content) {
        data.content.forEach(block => {
            if (block.content) {
                block.content.forEach(({ item }) => {
                    if (item.typeId === 'image' && item.value && item.value.image) {
                        if (regexp.test(item.value.image)) {
                            item.value.image = moveImage(item.value.image);
                        }
                    }
                });
            }
        });
    }
};

const removeImages = (data) => {
    rimraf.sync(`./public/uploads/articles/${data.translateName}`);
};

class Articles {
    static async getAll() {
        return Status.success(await Article.find({}));
    };

    static async get(id) {
        return Status.success(await Article.findOne({ '_id': id }));
    };

    static async getByName(name) {
        return Status.success(await Article.findOne({ translateName: name }));
    };

    static async create(data) {
        if (await Article.findOne({ 'translateName': data['translateName'] })) {
            return Status.error(`Статья с именем на английском = ${data['translateName']} уже существует!`);
        }

        if (await Article.findOne({ 'name': data['name'] })) {
            return Status.error(`Статья с именем = ${data['name']} уже существует!`);
        }

        try {
            const article = new Article(data);

            await article.validate();

            prepareImages(data);

            await Article.create(data);

            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(id, data) {
        const match = await Article.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующую статью!`);
        }

        const translateNameChanged = match['translateName'] !== data['translateName'];
        const nameChanged = match['name'] !== data['name'];

        if (translateNameChanged) {
            if (await Article.findOne({ 'translateName': data['translateName'] })) {
                return Status.error(`Статья с именем на английском = ${data['translateName']} уже существует!`);
            }
        }

        if (nameChanged) {
            if (await Article.findOne({ 'name': data['name'] })) {
                return Status.error(`Статья с именем = ${data['name']} уже существует!`);
            }
        }

        try {
            const article = new Article(data);
            await article.validate();

            prepareImages(data);

            await Article.updateOne({ '_id': id }, data);

            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };


    static async delete(id) {
        const data = await Article.findOne({ _id: id });

        if (!data) {
            return Status.error(`Статья не найдена!`);
        }

        try {
            removeImages(data);
            await Article.deleteOne({ _id: id });
            return Status.success();
        } catch(err) {
            return Status.error(err);
        }
    };
}

module.exports = Articles;
