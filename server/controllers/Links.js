const Links = require('../models/Links');
const Status = require('./Status');

class Categories {
    static async get(from) {
        const link = await Links.findOne({ 'from': from });

        if (!link) {
            return Status.error('Ссылка не найдена!');
        }

        return Status.success(link);
    };

    static async create(link) {
        await Links.create(link);
        return Status.success();
    };
}

module.exports = Categories;
