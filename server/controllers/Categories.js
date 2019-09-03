const Category = require('../models/Category');
const Status = require('./Status');

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

    static async create(category) {
        if (await Category.findOne({ 'translateName': category['translateName'] })) {
            return Status.error(`Категория с именем на английском = ${category['translateName']} уже существует!`);
        }

        if (await Category.findOne({ 'name': category['name'] })) {
            return Status.error(`Категория с именем = ${category['name']} уже существует!`);
        }

        const newCategory = await Category.create(category);

        return Status.success(newCategory.get('_id'));
    };

    static async update(id, category) {
        const match = await Category.findOne({ '_id': id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующую категорию!`);
        }

        const translateNameChanged = match['translateName'] !== category['translateName'];
        const nameChanged = match['name'] !== category['name'];

        if (translateNameChanged && await Category.findOne({ 'translateName': category['translateName'] })) {
            return Status.error(`Категория с именем на английском = ${category['translateName']} уже существует!`);
        }

        if (nameChanged && await Category.findOne({ 'name': category['name'] })) {
            return Status.error(`Категория с именем = ${category['name']} уже существует!`);
        }

        await Category.updateOne({ '_id': id }, category, { runValidators: true });

        return Status.success();
    };

    static async delete(id) {
        if (!await Category.findOne({ '_id': id })) {
            return Status.error(`Категория не найдена!`);
        }

        await Category.deleteOne({ '_id': id });

        return Status.success();
    };
}

module.exports = Categories;
