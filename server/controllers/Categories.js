const Category = require('../models/Category');
const Status = require('./Status');
const prepareErrors = require('./prepareErrors');
const shell = require('shelljs');
const rimraf = require('rimraf');
const fs = require('fs');

const prepareImages = (data) => {
    const regexp = /^\/buffer\//;
    const newFolderPath = `/uploads/categories/${data.translateName}/`;

    const moveImage = (image) => {
        const newImagePath = image.replace(regexp, newFolderPath);
        const fullNewFolderPath = './public' + newFolderPath;

        shell.mkdir('-p', fullNewFolderPath);

        fs.renameSync('./public' + image, './public' + newImagePath);

        return newImagePath;
    };

    if (data.projectBlocks && data.projectBlocks.length) {
        data.projectBlocks.forEach(block => {
            if (block.items && block.items.length) {
                block.items.forEach(item => {
                    if (item.image && regexp.test(item.image)) {
                        item.image = moveImage(item.image);
                    }
                });
            }
        });
    }

    if (data.complectationBlocks && data.complectationBlocks.items && data.complectationBlocks.items.length) {
        data.complectationBlocks.items.forEach(item => {
            if (item.image && regexp.test(item.image)) {
                try {
                    item.image = moveImage(item.image);
                } catch(err) {
                    item.image = '';
                }
            }
        });
    }
};

const removeImages = (data) => {
    rimraf.sync(`./public/uploads/categories/${data.translateName}`);
};

class Categories {
    static async getAll() {
        return Status.success(await Category.find({}));
    };

    static async get(id) {
        const category = await Category.findOne({ '_id': id });

        if (!category) {
            return Status.error('Категория не найдена!');
        }

        return Status.success(category);
    };

    static async getByName(name) {
        const category = await Category.findOne({ translateName: name });

        if (!category) {
            return Status.error('Категория не найдена!');
        }

        return Status.success(category);
    };

    static async create(data) {
        if (await Category.findOne({ 'translateName': data['translateName'] })) {
            return Status.error(`Категория с именем на английском = ${data['translateName']} уже существует!`);
        }

        if (await Category.findOne({ 'name': data['name'] })) {
            return Status.error(`Категория с именем = ${data['name']} уже существует!`);
        }

        try {
            const category = new Category(data);
            await category.validate();

            prepareImages(data);

            const newCategory = await Category.create(data);

            return Status.success(newCategory.get('_id'));
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(id, data) {
        const match = await Category.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующую категорию!`);
        }

        const translateNameChanged = match['translateName'] !== data['translateName'];
        const nameChanged = match['name'] !== data['name'];

        if (translateNameChanged && await Category.findOne({ 'translateName': data['translateName'] })) {
            return Status.error(`Категория с именем на английском = ${data['translateName']} уже существует!`);
        }

        if (nameChanged && await Category.findOne({ 'name': data['name'] })) {
            return Status.error(`Категория с именем = ${data['name']} уже существует!`);
        }

        try {
            const category = new Category(data);
            await category.validate();

            prepareImages(data);

            await Category.updateOne({ '_id': id }, data);

            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async delete(id) {
        const data = await Category.findOne({ '_id': id });
        if (!data) {
            return Status.error(`Категория не найдена!`);
        }

        removeImages(data);
        await Category.deleteOne({ '_id': id });

        return Status.success();
    };
}

module.exports = Categories;
