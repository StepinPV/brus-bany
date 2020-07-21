const Links = require('../models/Links');
const Status = require('./Status');

class Categories {
    static async get(params) {
        const link = await Links.findOne(params);

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
