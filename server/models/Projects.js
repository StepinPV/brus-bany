const DB = require('../db');
const Status = require('./Status');
const Materials = require('./Materials');

const COLLECTION_NAME = 'projects';
const getCollection = () => DB.getCollection(COLLECTION_NAME);

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

// TODO Сделать удаление!

class Projects {
    static async getAll(categoryId) {
        const collection = getCollection();
        return Status.success(await collection.find({ categoryId }).toArray());
    };

    static async get(categoryId, layoutId) {
        const collection = getCollection();

        const project = await collection.findOne({ '_id': `${categoryId}.${layoutId}` });

        if (!project) {
            return Status.error(`Проект не найден!`);
        }

        return Status.success(project);
    };

    static async create(categoryId, layoutId, project) {
        const collection = getCollection();

        if (await collection.findOne({ categoryId, layoutId })) {
            return Status.error(`Проект с планировкой = ${project.layoutId} уже существует!`);
        }

        await collection.insertOne({
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
        const collection = getCollection();

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

        if (!await collection.findOne({ '_id': projectId })) {
            return Status.error(`Проект не найден!`);
        }

        project.profitPercentage = getValidProfitPercentage(project.profitPercentage);
        project.price = calculatePrice(project);

        await collection.updateOne({ '_id': projectId }, {
            $set: {
                _id: project._id,
                categoryId: project.categoryId,
                layoutId: project.layoutId,
                images: project.images,
                materials: project.materials,
                profitPercentage: project.profitPercentage,
                price: project.price
            }
        });

        return Status.success();
    };

    static async updateImage(categoryId, layoutId, imageId, newImagePath) {
        const collection = getCollection();
        const { data: project } = await Projects.get(categoryId, layoutId);

        if (!project) {
            return Status.error(`Проект не найден!`);
        }

        await collection.updateOne({ '_id': project._id }, {
            $set: {
                // TODO Проверить, можно ли передать только измененное поле. В других местах тоже
                ...project,
                images: {
                    ...project.images,
                    [imageId]: newImagePath
                }
            }
        });

        return Status.success();
    }
}

module.exports = Projects;
