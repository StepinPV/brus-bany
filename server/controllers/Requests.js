const Request = require('../models/Request');
const Status = require('./Status');

class Categories {
    static async getAll() {
        return Status.success(await Request.find({}));
    };

    static async get(id) {
        const category = await Request.findOne({ '_id': id });

        if (!category) {
            return Status.error('Заявка не найдена!');
        }

        return Status.success(category);
    };

    static async create(request) {
        const res = await Request.create(request);

        console.log(res);

        return Status.success();
    };
}

module.exports = Categories;
