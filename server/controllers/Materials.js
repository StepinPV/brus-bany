const Status = require('./Status');
const Material = require('../models/Material');

class Materials {
    static async getAll() {
        return Status.success(await Material.find({}));
    };

    static async get(id) {
        return Status.success(await Material.findById(id));
    };

    static async create(material) {
        if (await Material.findOne({ name: material.name })) {
            return Status.error(`Наименование = ${material.name} уже существует!`);
        }

        const res = await Material.create(material);

        return Status.success(res.get('_id').toString());
    };

    // TODO Нужно обновлять цену в проектах! Нотификация!
    static async update(id, material) {
        const materialOld = await Material.findById(id);

        if (!materialOld) {
            return Status.error(`Наименование не найдено!`);
        }

        if (material.name !== materialOld.name && await Material.findOne({ 'name': material.name })) {
            return Status.error(`Наименование = ${material.name} уже существует!`);
        }

        await Material.findByIdAndUpdate(id, material);

        return Status.success();
    };

    static async delete(id) {
        if (!await Material.findById(id)) {
            return Status.error(`Наименование не найдено!`);
        }

        await Material.findByIdAndDelete(id);

        return Status.success();
    };
}

module.exports = Materials;
