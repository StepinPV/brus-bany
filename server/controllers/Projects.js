const Project = require('../models/Project');
const Status = require('./Status');
const Materials = require('./Materials');
const Categories = require('./Categories');
const Layouts = require('./Layouts');
const fs = require('fs');
const shell = require('shelljs');
const rimraf = require('rimraf');
const prepareErrors = require('./prepareErrors');

const prepareImages = async (data) => {
    const { data: category } = await Categories.get(data.categoryId);
    const { data: layout } = await Layouts.get(data.layoutId);

    const regexp = /^\/buffer\//;
    const newFolderPath = `/uploads/projects/${category.translateName}/${layout.translateName}/`;

    const moveImage = (image) => {
        const newImagePath = image.replace(regexp, newFolderPath);
        const fullNewFolderPath = './public' + newFolderPath;

        shell.mkdir('-p', fullNewFolderPath);

        fs.renameSync('./public' + image, './public' + newImagePath);

        return newImagePath;
    };

    Object.keys(data.images).forEach(imageKey => {
        if (regexp.test(data.images[imageKey])) {
            data.images[imageKey] = moveImage(data.images[imageKey]);
        }
    });
};

const removeImages = async (data) => {
    const { data: category } = await Categories.get(data.categoryId);
    const { data: layout } = await Layouts.get(data.layoutId);

    rimraf.sync(`./public/uploads/projects/${category.translateName}/${layout.translateName}`);
};

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

    if (project.material) {
        for (let i = 0; i < project.material.length; i++) {
            const { data: material } = await Materials.get(project.material[i].id);

            if (material) {
                materialsPrice += material.price * project.material[i].count;
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

    static async getAllForCategory(categoryId, options) {
        const promise = Project.find({ categoryId });

        if (options) {
            const { withLayout, withCategory } = options;

            if (withLayout) {
                promise.populate('layoutId');
            }

            if (withCategory) {
                promise.populate('categoryId');
            }
        }

        const projects = await promise;

        return Status.success(projects);
    };

    static async getAllForCategoryByName(categoryName, options) {
        const { data: category } = await Categories.getByName(categoryName);
        return await Projects.getAllForCategory(category.get('_id'), options);
    };

    static async get(categoryId, layoutId, options) {
        const promise = Project.findOne({ categoryId, layoutId });

        if (options) {
            const { withLayout, withCategory } = options;

            if (withLayout) {
                promise.populate('layoutId');
            }

            if (withCategory) {
                promise.populate('categoryId');
            }
        }

        const project = await promise;

        if (!project) {
            return Status.error(`Проект не найден!`);
        }

        return Status.success(project);
    };

    static async getByName(categoryName, layoutName, options) {
        const { data: category } = await Categories.getByName(categoryName);
        const { data: layout } = await Layouts.getByName(layoutName);
        return await Projects.get(category.get('_id'), layout.get('_id'), options);
    };

    static async create(categoryId, layoutId, project) {
        if (await Project.findOne({ categoryId, layoutId })) {
            return Status.error(`Проект с выбранной планировкой уже существует!`);
        }

        try {
            const data = {
                images: {},
                ...project,
                categoryId,
                layoutId,
                price: DEFAULT_VALUES['price'],
                profitPercentage: DEFAULT_VALUES['profitPercentage']
            };

            const projectInst = new Project(data);
            console.log('1');

            await projectInst.validate();
            console.log('2');

            await prepareImages(data);
            console.log('3');

            await Project.create(data);
            console.log('4');

            return Status.success();
        } catch (err) {
            console.log(err);
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(categoryId, layoutId, project) {
        if (project.categoryId !== categoryId) {
            return Status.error(`Категорию менять запрещено!`);
        }

        if (project.layoutId !== layoutId) {
            return Status.error(`Планировку менять запрещено!`);
        }

        if (!await Project.findOne({ categoryId, layoutId })) {
            return Status.error(`Проект не найден!`);
        }

        project.profitPercentage = getValidProfitPercentage(project.profitPercentage);
        project.price = await calculatePrice(project);

        try {
            const data = {
                images: {},
                ...project
            };

            const projectInst = new Project(data);

            await projectInst.validate();

            await prepareImages(data);

            await Project.updateOne({ categoryId, layoutId }, data, { runValidators: true });

            return Status.success();
        } catch (err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async delete(id) {
        const data = await Project.findOne({ _id: id });

        if (!data) {
            return Status.error(`Проект не найден!`);
        }

        try {
            await removeImages(data);
            await Project.deleteOne({ _id: id });
            return Status.success();
        } catch(err) {
            return Status.error(err);
        }
    };
}

module.exports = Projects;
