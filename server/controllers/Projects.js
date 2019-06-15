const Project = require('../models/Project');
const Status = require('./Status');
const Materials = require('./Materials');

const DEFAULT_VALUES = {
    // Итоговая цена
    price: 0,
    // Процент прибыли
    profitPercentage: 20,
    // Процент зарплаты рабочим
    salaryPercentage: 20,
    // Цена за такси
    taxiPrice: 12000,
};

// Посчитать цену проекта
const calculatePrice = async (project) => {
    let price = 0;
    let materialsPrice = 0;

    if (project.materials) {
        for (let id in project.materials) {
            const { data: material } = await Materials.get(id);

            if (material) {
                materialsPrice += material.price * project.materials[id];
            }
        }
    }

    if (materialsPrice) {
        price += materialsPrice / (1 - DEFAULT_VALUES['salaryPercentage'] / 100 - project.profitPercentage / 100);
    }

    price += DEFAULT_VALUES['taxiPrice'];

    // Округляем цену до сотен, возможно стоит делать это на клиенте
    price = Math.round(price / 100) * 100;

    return price;
};

// Проверить и вернуть валидный profitPercentage
const getValidProfitPercentage = profitPercentage => {
    if (isNaN(parseFloat(profitPercentage)) || profitPercentage < 0 || profitPercentage >= 100 - DEFAULT_VALUES['salaryPercentage']) {
        return DEFAULT_VALUES['profitPercentage'];
    }

    return profitPercentage;
};

class Projects {
    static async getAll() {
        return Status.success(await Project.find({}));
    };

    static async getAllForCategory(categoryId) {
        return Status.success(await Project.find({ categoryId }));
    };

    static async get(categoryId, layoutId) {
        const project = await Project.findOne({ '_id': `${categoryId}.${layoutId}` });

        if (!project) {
            return Status.error(`Проект не найден!`);
        }

        return Status.success(project);
    };

    static async create(categoryId, layoutId, project) {
        if (await Project.findOne({ categoryId, layoutId })) {
            return Status.error(`Проект с планировкой = ${project.layoutId} уже существует!`);
        }

        await Project.insertOne({
            ...project,
            '_id': `${categoryId}.${layoutId}`,
            categoryId,
            layoutId,
            price: DEFAULT_VALUES['price'],
            profitPercentage: DEFAULT_VALUES['profitPercentage']
        });

        return Status.success();
    };

    static async update(categoryId, layoutId, project) {
        const projectId = `${categoryId}.${layoutId}`;

        if (project.categoryId !== categoryId) {
            return Status.error(`Поле categoryId менять запрещено!`);
        }

        if (project.layoutId !== layoutId) {
            return Status.error(`Поле layoutId менять запрещено!`);
        }

        if (project._id !== projectId) {
            // TODO А лучше просто проигнорировать
            return Status.error( `Поле _id менять запрещено!`);
        }

        if (!await Project.findOne({ '_id': projectId })) {
            return Status.error(`Проект не найден!`);
        }

        project.profitPercentage = getValidProfitPercentage(project.profitPercentage);
        project.price = await calculatePrice(project);

        await Project.updateOne({ '_id': projectId }, {
            _id: project._id,
            categoryId: project.categoryId,
            layoutId: project.layoutId,
            images: project.images,
            materials: project.materials,
            profitPercentage: project.profitPercentage,
            price: project.price
        });

        return Status.success();
    };

    static async delete(categoryId, layoutId) {
        if (!await Project.findOne({ '_id': `${categoryId}.${layoutId}` })) {
            return Status.error(`Проект не найден!`);
        }

        await Project.deleteOne({ '_id': `${categoryId}.${layoutId}` });

        return Status.success();
    };

    static async updateImage(categoryId, layoutId, imageId, newImagePath) {
        const { data: project } = await Projects.get(categoryId, layoutId);

        if (!project) {
            return Status.error(`Проект не найден!`);
        }

        await Project.updateOne({ '_id': project._id }, {
            // TODO Проверить, можно ли передать только измененное поле. В других местах тоже
            ...project,
            images: {
                ...project.images,
                [imageId]: newImagePath
            }
        });

        return Status.success();
    }
}

module.exports = Projects;
